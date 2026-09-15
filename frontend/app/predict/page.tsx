"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormValues = {
  Age: number; CreditScore: number; Tenure: number; Balance: number; EstimatedSalary: number;
  SatisfactionScore: number; PointEarned: number; NumOfProducts: number;
  Geography: "France" | "Germany" | "Spain";
  CardType: "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  Gender: "Female" | "Male"; HasCrCard: "No" | "Yes"; IsActiveMember: "No" | "Yes"; Complain: "No" | "Yes";
};

const initialValues: FormValues = {
  Age: 42, CreditScore: 650, Tenure: 5, Balance: 75000, EstimatedSalary: 65000,
  SatisfactionScore: 3, PointEarned: 450, NumOfProducts: 2,
  Geography: "France", CardType: "GOLD", Gender: "Female", HasCrCard: "Yes", IsActiveMember: "Yes", Complain: "No"
};

const numberFields: Array<{ key: keyof FormValues; label: string; hint: string; min: number; max?: number; step?: number }> = [
  { key: "Age", label: "Age", hint: "18 – 100 years", min: 18, max: 100 },
  { key: "CreditScore", label: "Credit score", hint: "300 – 900", min: 300, max: 900 },
  { key: "Tenure", label: "Tenure", hint: "Years with bank", min: 0, max: 10 },
  { key: "Balance", label: "Current balance", hint: "In your local currency", min: 0, step: 0.01 },
  { key: "EstimatedSalary", label: "Estimated salary", hint: "Annual income", min: 0, step: 0.01 },
  { key: "SatisfactionScore", label: "Satisfaction score", hint: "1 = low · 5 = high", min: 1, max: 5 },
  { key: "PointEarned", label: "Points earned", hint: "0 – 1,000 points", min: 0, max: 1000 },
  { key: "NumOfProducts", label: "Products held", hint: "Number of products", min: 1, max: 4 }
];

const selectFields: Array<{ key: keyof FormValues; label: string; options: string[] }> = [
  { key: "Geography", label: "Region", options: ["France", "Germany", "Spain"] },
  { key: "CardType", label: "Card type", options: ["SILVER", "GOLD", "PLATINUM", "DIAMOND"] },
  { key: "Gender", label: "Gender", options: ["Female", "Male"] },
  { key: "HasCrCard", label: "Credit card", options: ["Yes", "No"] },
  { key: "IsActiveMember", label: "Active member", options: ["Yes", "No"] },
  { key: "Complain", label: "Has complained", options: ["No", "Yes"] }
];

function RiskResult({ churn }: { churn: number }) {
  const atRisk = churn === 1;
  return (
    <aside className={`result-card ${atRisk ? "at-risk" : "healthy"}`} aria-live="polite">
      <div className="result-badge">{atRisk ? "Retention opportunity" : "Relationship looks stable"}</div>
      <div className="result-orb"><span>{atRisk ? "!" : "✓"}</span></div>
      <h2>{atRisk ? "At risk of churn" : "Likely to stay"}</h2>
      <p>{atRisk ? "This customer shows a pattern that may need a timely, personal touch." : "This customer’s profile does not currently show a strong churn signal."}</p>
      <div className="result-advice"><span>Suggested next step</span><strong>{atRisk ? "Start a retention conversation" : "Keep reinforcing the relationship"}</strong></div>
    </aside>
  );
}

export default function PredictPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [result, setResult] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  function updateValue(key: keyof FormValues, value: string) {
    const numericKeys = numberFields.map((field) => field.key);
    setValues((current) => ({ ...current, [key]: numericKeys.includes(key) ? Number(value) : value } as FormValues));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading"); setError(""); setResult(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"}/predict`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "The assessment could not be completed.");
      setResult(data.ChurnValue);
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Could not connect to the prediction service.");
      return;
    }
    setStatus("idle");
  }

  return (
    <main className="assessment-shell">
      <nav className="nav assessment-nav" aria-label="Main navigation">
        <Link className="brand" href="/"><span className="brand-mark">C</span><span>ChurnVision</span></Link>
        <Link className="back-link" href="/"><span>←</span> Back to home</Link>
      </nav>
      <section className="assessment-heading">
        <p className="eyebrow"><span className="pulse-dot" /> Customer assessment</p>
        <h1>Find the signal<br />in the <em>story.</em></h1>
        <p>Enter a customer profile to understand their predicted retention risk.</p>
      </section>
      <div className="assessment-layout">
        <form className="prediction-form" onSubmit={submit}>
          <div className="form-heading"><div><h2>Customer profile</h2><p>All fields are used in the assessment.</p></div><span className="required-note">* Required</span></div>
          <div className="form-section"><p className="section-label">Customer essentials</p><div className="form-grid">
            {numberFields.slice(0, 3).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><input required type="number" value={values[field.key] as number} min={field.min} max={field.max} step={field.step ?? 1} onChange={(e) => updateValue(field.key, e.target.value)} /><small>{field.hint}</small></label>)}
            {selectFields.slice(0, 2).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><select value={values[field.key] as string} onChange={(e) => updateValue(field.key, e.target.value)}>{field.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
            {selectFields.slice(2, 3).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><select value={values[field.key] as string} onChange={(e) => updateValue(field.key, e.target.value)}>{field.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
          </div></div>
          <div className="form-section"><p className="section-label">Financial relationship</p><div className="form-grid">
            {numberFields.slice(3, 5).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><input required type="number" value={values[field.key] as number} min={field.min} step={field.step ?? 1} onChange={(e) => updateValue(field.key, e.target.value)} /><small>{field.hint}</small></label>)}
            {selectFields.slice(3).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><select value={values[field.key] as string} onChange={(e) => updateValue(field.key, e.target.value)}>{field.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
          </div></div>
          <div className="form-section"><p className="section-label">Engagement & products</p><div className="form-grid">
            {numberFields.slice(5).map((field) => <label key={field.key} className="field"><span>{field.label}<b>*</b></span><input required type="number" value={values[field.key] as number} min={field.min} max={field.max} step={field.step ?? 1} onChange={(e) => updateValue(field.key, e.target.value)} /><small>{field.hint}</small></label>)}
          </div></div>
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary form-submit" disabled={status === "loading"} type="submit">{status === "loading" ? "Assessing profile…" : "Assess churn risk"}<span>→</span></button>
        </form>
        <div className="result-panel">
          {result === null ? <div className="result-empty"><div className="empty-orb">↗</div><h2>Your result will appear here.</h2><p>Complete the profile and run an assessment to reveal the customer’s predicted risk.</p><div className="empty-lines"><span /><span /><span /></div></div> : <RiskResult churn={result} />}
          <p className="model-note">Prediction powered by your logistic regression model. Use it to support—not replace—human judgement.</p>
        </div>
      </div>
    </main>
  );
}
