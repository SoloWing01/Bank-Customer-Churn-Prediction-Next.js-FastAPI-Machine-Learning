# 🏦 Bank Customer Churn Prediction

A full-stack machine learning application that predicts whether a bank customer is likely to churn. The project combines **Scikit-learn machine learning models**, a **FastAPI REST API**, and a **Next.js frontend** to provide an interactive real-time churn prediction system.

---

## 📌 Project Overview

Customer churn is an important problem for banks because losing existing customers can significantly affect revenue and long-term customer relationships.

This project uses customer demographic, financial, account, and satisfaction-related information to predict whether a customer will leave the bank.

The project covers the complete machine learning workflow:

* Data preprocessing
* Exploratory analysis
* Feature transformation
* Multiple classification algorithms
* Hyperparameter tuning
* Model evaluation
* Model serialization
* REST API development
* Next.js frontend development
* Real-time prediction through a web interface

---

## 🎯 Objectives

The main objectives of this project are:

1. Analyze bank customer data.
2. Prepare numerical and categorical features for machine learning.
3. Build and compare multiple classification models.
4. Apply appropriate preprocessing using `ColumnTransformer` and `Pipeline`.
5. Tune the Decision Tree model using `RandomizedSearchCV`.
6. Evaluate models using classification metrics.
7. Save the trained machine learning model using Joblib.
8. Develop a FastAPI backend for model inference.
9. Build a Next.js frontend for user interaction.
10. Connect the frontend with the machine learning API.

---

## 🧠 Machine Learning Workflow

```text
Bank Customer Dataset
        │
        ▼
Data Cleaning
        │
        ▼
Feature Selection
        │
        ▼
Feature Preprocessing
        │
        ├── Numerical Features
        │       └── Scaling / Transformation
        │
        ├── Categorical Features
        │       └── One-Hot Encoding
        │
        ├── Binary Features
        │       └── Passthrough
        │
        └── Ordinal Features
                └── Ordinal Encoding
        │
        ▼
Train / Test Split
        │
        ▼
Machine Learning Models
        │
        ├── Logistic Regression
        ├── KNN
        ├── Bernoulli Naive Bayes
        └── Decision Tree
        │
        ▼
Hyperparameter Tuning
        │
        ▼
Model Evaluation
        │
        ▼
Model Serialization
        │
        ▼
FastAPI Backend
        │
        ▼
Next.js Frontend
        │
        ▼
Real-Time Churn Prediction
```

---

## 📊 Dataset

The project uses a **Bank Customer Churn** dataset.

The target variable is:

```text
Exited
```

Where:

```text
0 → Customer did not leave
1 → Customer left
```

### Features Used

The model uses customer information including:

* `Age`
* `CreditScore`
* `Tenure`
* `Balance`
* `EstimatedSalary`
* `SatisfactionScore`
* `PointEarned`
* `NumOfProducts`
* `Geography`
* `CardType`
* `Gender`
* `HasCrCard`
* `IsActiveMember`

Identifier-type columns such as customer IDs and surnames are not used as predictive features.

---

## ⚙️ Feature Preprocessing

The project uses Scikit-learn's `ColumnTransformer` to apply different preprocessing techniques to different feature groups.

### Numerical Features

Numerical features are processed according to their characteristics.

The project separates the `Age` feature from the other numerical features because of its distribution.

### Categorical Features

Categorical variables such as:

* `Geography`
* `NumOfProducts`

are transformed using one-hot encoding.

### Binary Features

Binary features such as:

* `Gender`
* `HasCrCard`
* `IsActiveMember`

are represented numerically.

### Ordinal Feature

`CardType` has an inherent order:

```text
SILVER
GOLD
PLATINUM
DIAMOND
```

Therefore, ordinal encoding is used so that the ordering is preserved.

---

## 🤖 Machine Learning Models

The project experiments with multiple classification algorithms.

### 1. Logistic Regression

Used as a linear classification model and baseline for the churn prediction problem.

### 2. K-Nearest Neighbors

KNN predicts the class of a customer based on neighboring observations.

Feature scaling is particularly important for KNN because it is distance-based.

### 3. Bernoulli Naive Bayes

Bernoulli Naive Bayes is included as another classification approach for comparison.

### 4. Decision Tree

Decision Tree is used to model nonlinear relationships between customer features and churn.

The Decision Tree model is further optimized using `RandomizedSearchCV`.

---

## 🔧 Hyperparameter Tuning

`RandomizedSearchCV` is used to search for better Decision Tree hyperparameters.

Parameters explored include:

* `max_depth`
* `min_samples_leaf`
* `min_samples_split`
* `splitter`

The search uses:

```text
5-fold cross-validation
```

and evaluates candidate models using:

```text
Accuracy
```

---

## 📈 Model Evaluation

The models are evaluated using classification metrics including:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion Matrix
* ROC-AUC

For churn prediction, accuracy alone may not be sufficient because correctly identifying customers who are likely to leave is particularly important.

Therefore, precision, recall, F1-score, and ROC-AUC should also be considered when comparing models.

---

## ⚠️ Important Data Leakage Consideration

The dataset contains a `Complain` feature that has a very strong relationship with the target variable `Exited`.

Including such a feature can result in unrealistically high model performance because it may effectively reveal the target.

Therefore, `Complain` should be excluded when building a realistic predictive churn model unless the feature is genuinely available at the time a prediction needs to be made.

This is an important consideration when interpreting extremely high model accuracy.

---

# 🚀 Full-Stack Application

The machine learning model is integrated into a web application using:

```text
Next.js → FastAPI → Machine Learning Model
```

### Architecture

```text
┌──────────────────────┐
│     Next.js UI       │
│      Frontend        │
└──────────┬───────────┘
           │
           │ HTTP POST
           ▼
┌──────────────────────┐
│      FastAPI         │
│       Backend        │
└──────────┬───────────┘
           │
           │ Prediction
           ▼
┌──────────────────────┐
│ Scikit-learn Model   │
│     BankChurn.pkl    │
└──────────┬───────────┘
           │
           ▼
      Churn Prediction
```

---

# 🌐 Frontend — Next.js

The frontend is developed using **Next.js**.

It provides a user interface where users can enter customer information such as:

* Age
* Credit Score
* Geography
* Gender
* Balance
* Tenure
* Number of Products
* Card Type
* Credit Card status
* Active Member status
* Satisfaction Score
* Points Earned
* Estimated Salary

The frontend sends these values to the FastAPI backend.

---

# ⚡ Backend — FastAPI

The backend provides a REST API for machine learning inference.

The FastAPI application:

1. Receives customer information.
2. Validates the request.
3. Converts the input into the format expected by the model.
4. Passes the data to the trained pipeline.
5. Generates a churn prediction.
6. Returns the prediction to the frontend.

### API Endpoints

#### `GET /`

Used to check whether the API is running.

#### `POST /predict`

Used to generate a customer churn prediction.

Example response:

```json
{
  "ChurnValue": 1
}
```

Where:

```text
0 → Customer is predicted not to churn
1 → Customer is predicted to churn
```

---

# 📁 Project Structure

```text
bank-customer-churn-prediction/
│
│── main.py
│── BankChurn.pkl
│── ml_decision_trees13.ipynb
│── requirements.txt
│
├── frontend/

├── .gitignore
└── README.md
```

---

# 🛠️ Technologies Used

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* Next.js
* React
* JavaScript / TypeScript
* HTML
* CSS

### Development

* Jupyter Notebook
* Git
* GitHub
* Railway

---

# 💻 Local Setup

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd bank-customer-churn-prediction
```

---

## 2. Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation will be available at:

```text
http://127.0.0.1:8000/docs
```

---

# 🖥️ Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install the Node.js dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

---

# 🔗 Frontend → Backend Connection

The Next.js frontend communicates with the FastAPI backend using HTTP requests.

The general flow is:

```text
User enters customer information
              ↓
        Next.js form
              ↓
        POST /predict
              ↓
        FastAPI backend
              ↓
      BankChurn.pkl model
              ↓
        Prediction result
              ↓
        FastAPI response
              ↓
        Next.js frontend
              ↓
       Display prediction
```

Make sure the FastAPI backend is running before making predictions from the frontend.

---

# 📦 Model Serialization

The trained machine learning pipeline is saved using Joblib.

Example:

```python
import joblib

joblib.dump(model, "BankChurn.pkl")
```

The FastAPI backend loads the serialized model:

```python
model = joblib.load("BankChurn.pkl")
```

Because preprocessing is included in the trained pipeline, the API can send raw feature values through the same preprocessing steps used during model training.

---

# 🚀 Deployment

The application can be deployed as two separate services:

```text
Next.js Frontend
       │
       ▼
Frontend Hosting

FastAPI Backend
       │
       ▼
Backend Hosting
```

After deployment, configure the Next.js frontend to use the public URL of the FastAPI backend.

For a production FastAPI deployment, a typical command is:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

# 🔮 Future Improvements

Possible future improvements include:

* Add probability-based churn predictions.
* Display churn probability on the frontend.
* Add interactive charts and customer insights.
* Improve class-imbalance handling.
* Compare additional machine learning models.
* Add model explainability using SHAP.
* Add authentication.
* Add prediction history.
* Store prediction results in a database.
* Add automated model retraining.
* Improve UI/UX and responsive design.
* Add monitoring for API and model performance.

---

# 📚 Key Concepts Demonstrated

This project demonstrates practical understanding of:

* Supervised Machine Learning
* Binary Classification
* Feature Engineering
* Feature Scaling
* One-Hot Encoding
* Ordinal Encoding
* ColumnTransformer
* Pipeline
* Cross-Validation
* RandomizedSearchCV
* Model Evaluation
* Data Leakage
* Model Serialization
* REST APIs
* FastAPI
* Next.js
* Frontend–Backend Integration
* Machine Learning Deployment

---

# 👨‍💻 Project Status

**Status: Completed / Deployment Ready**

The project includes the machine learning workflow, trained model, FastAPI backend, and Next.js frontend required for an end-to-end bank customer churn prediction application.

---


