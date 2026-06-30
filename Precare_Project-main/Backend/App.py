from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from pymongo import MongoClient
from datetime import datetime, timezone   # ✅ FIXED HERE
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# ========== MongoDB Setup ==========
client = MongoClient("mongodb://localhost:27017/")
db = client["precaredb"]

predictions_collection = db["predictions"]
users_collection = db["users"]

# ========== Load Model ==========
model = joblib.load("model.pkl")
feature_columns = joblib.load("feature_columns.pkl")

# ========== Home ==========
@app.route("/")
def home():
    return "✅ PreCare Backend Running!"

# ========== REGISTER ==========
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if users_collection.find_one({"email": email}):
            return jsonify({"message": "User already exists"}), 400

        hashed_password = generate_password_hash(password)

        users_collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password
        })

        return jsonify({
            "user": {
                "username": username,
                "email": email
            }
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# ========== LOGIN ==========
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        identifier = data.get("identifier")
        password = data.get("password")

        user = users_collection.find_one({
            "$or": [{"email": identifier}, {"username": identifier}]
        })

        if not user:
            return jsonify({"message": "User not found"}), 400

        if not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid password"}), 400

        return jsonify({
            "user": {
                "username": user["username"],
                "email": user["email"]
            }
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# ========== GOOGLE LOGIN ==========
@app.route("/oauth/google", methods=["POST"])
def google_login():
    try:
        data = request.get_json()
        token = data.get("token")

        user = {
            "username": "GoogleUser",
            "email": "googleuser@gmail.com"
        }

        return jsonify({"user": user})

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# ========== PREDICT ==========
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        age = int(data.get("age"))

        gender = data.get("gender").strip().capitalize()
        cancer_type = data.get("cancer_type").strip().capitalize()
        cancer_stage = data.get("cancer_stage")

        stage_map = {
            "Stage I": 1,
            "Stage II": 2,
            "Stage III": 3,
            "Stage IV": 4
        }

        stage_num = stage_map.get(cancer_stage, 1)

        df = pd.DataFrame(0, index=[0], columns=feature_columns)

        if "age" in df.columns:
            df["age"] = age

        if "cancer_stage" in df.columns:
            df["cancer_stage"] = stage_num

        gender_col = f"gender_{gender}"
        cancer_col = f"cancer_type_{cancer_type}"

        if gender_col in df.columns:
            df[gender_col] = 1

        if cancer_col in df.columns:
            df[cancer_col] = 1

        prediction = model.predict(df)[0]
        estimated_cost = round(float(prediction), 2)

        predictions_collection.insert_one({
            "age": age,
            "gender": gender,
            "cancer_type": cancer_type,
            "cancer_stage": cancer_stage,
            "predicted_cost": estimated_cost,
            "timestamp": datetime.now(timezone.utc)   # ✅ FIXED HERE
        })

        return jsonify({
            "estimated_cost": estimated_cost
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/history", methods=["GET"])
def history():
    try:
        records = list(predictions_collection.find({}, {"_id": 0}))
        return jsonify({"history": records})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)  