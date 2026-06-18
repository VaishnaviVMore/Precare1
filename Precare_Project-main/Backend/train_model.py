import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# =========================
# Load dataset
# =========================
data = pd.read_csv("cancer_cost_dataset_10000.csv")

# =========================
# Clean string columns only
# =========================
# Convert to string first, then clean
data["gender"] = data["gender"].astype(str).str.strip().str.capitalize()
data["cancer_type"] = data["cancer_type"].astype(str).str.strip().str.capitalize()

# =========================
# Handle cancer_stage safely
# =========================
# Do NOT use .str.strip() here
# Convert to numeric (works for both string or int formats)
data["cancer_stage"] = pd.to_numeric(data["cancer_stage"], errors="coerce")

# Fill missing values if any
data["cancer_stage"] = data["cancer_stage"].fillna(1)

# =========================
# One-hot encoding
# =========================
data = pd.get_dummies(data, columns=["gender", "cancer_type"])

# =========================
# Features & target
# =========================
X = data.drop("cost", axis=1)
y = data["cost"]

# Save feature column order
joblib.dump(X.columns.tolist(), "feature_columns.pkl")

# =========================
# Train model
# =========================
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X, y)

# =========================
# Save model
# =========================
joblib.dump(model, "model.pkl")

print("✅ Model trained successfully with cancer_stage included")