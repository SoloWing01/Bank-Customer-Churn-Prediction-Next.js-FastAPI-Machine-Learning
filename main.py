import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal

model = joblib.load("BankChurn.pkl")

class BankInfo(BaseModel):
    Age: int = Field(..., ge=18, le=100)
    CreditScore: int = Field(..., ge=300, le=900)
    Tenure: int = Field(..., ge=0, le=10)
    Balance: float = Field(..., ge=0)
    EstimatedSalary: float = Field(..., ge=0)
    SatisfactionScore: int = Field(..., ge=1, le=5)
    PointEarned: int = Field(..., ge=0, le=1000)
    NumOfProducts: int = Field(..., ge=1, le=4)
    Geography: Literal["France", "Germany", "Spain"]
    CardType: Literal["SILVER", "GOLD", "PLATINUM", "DIAMOND"]
    Gender: Literal["Female", "Male"]
    HasCrCard: Literal["No", "Yes"]
    IsActiveMember: Literal["No", "Yes"]
    Complain: Literal["No", "Yes"]


class PredictionResponse(BaseModel):
    ChurnValue: int

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def greet():
    return {
        "message": "Welcome to the Bank Customer Churn Prediction API",
        "model": "Logistic Regression",
        "target": "Exited"
    }

@app.post("/predict", response_model=PredictionResponse)
def predict(data: BankInfo):

    gender = {"Female": 0,"Male": 1}[data.Gender]

    has_cr_card = {"No": 0,"Yes": 1}[data.HasCrCard]

    active_member = {"No": 0,"Yes": 1}[data.IsActiveMember]

    complain = {"No": 0,"Yes": 1}[data.Complain]

    input_row = pd.DataFrame([{
        "Age": data.Age,
        "CreditScore": data.CreditScore,
        "Tenure": data.Tenure,
        "Balance": data.Balance,
        "EstimatedSalary": data.EstimatedSalary,
        "SatisfactionScore": data.SatisfactionScore,
        "PointEarned": data.PointEarned,
        "NumOfProducts": data.NumOfProducts,
        "Geography": data.Geography,
        "CardType": data.CardType,
        "Gender": gender,
        "HasCrCard": has_cr_card,
        "IsActiveMember": active_member,
        "Complain": complain
    }])
    try:
        prediction = model.predict(input_row)[0]
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Model prediction failed: {str(e)}")

    return PredictionResponse(ChurnValue=int(prediction))
