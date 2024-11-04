from flask import Flask, jsonify
import yfinance as yf
import joblib
import pandas as pd
import ta  # Make sure the 'ta' library is installed

app = Flask(__name__)

# Load pre-trained models and scalers
classifier_model = joblib.load('rf_classifier.pkl')  # Classification model
scaler_class = joblib.load('scaler_class.pkl')        # Scaler for classification
regressor_model = joblib.load('rf_regressor.pkl')     # Regression model
scaler_reg = joblib.load('scaler_reg.pkl')            # Scaler for regression

# Function to add features and ensure correct data format
def add_features(data):
    # Moving averages
    data['MA10'] = data['Close'].rolling(window=10).mean()
    data['MA50'] = data['Close'].rolling(window=50).mean()
    
    # Lag features
    data['Lag1'] = data['Close'].shift(1)
    data['Lag2'] = data['Close'].shift(2)
    
    # RSI and MACD
    data['RSI'] = ta.momentum.rsi(data['Close'], window=14)
    data['MACD'] = ta.trend.macd_diff(data['Close'])
    
    # Remove rows with NaN values
    data.dropna(inplace=True)
    return data

# Prediction API
@app.route('/api/predict/<string:ticker>', methods=['GET'])
def predict(ticker):
    try:
        # Fetch stock data for the past year
        data = yf.download(ticker, period="1y", interval="1d")
        
        # If no data is returned, handle the error
        if data.empty:
            return jsonify({'error': f"No data found for ticker '{ticker}'"}), 404
        
        # Add features to the data
        data = add_features(data)
        
        # Ensure we have at least one complete row with features
        if data.empty:
            return jsonify({'error': "Not enough data for feature calculation"}), 400

        # Prepare the latest data for both classification and regression
        features = data[['MA10', 'MA50', 'Lag1', 'Lag2', 'RSI', 'MACD']].iloc[-1]
        
        # Scale features for classification
        features_scaled_class = scaler_class.transform([features])
        
        # Make prediction with classification model
        class_prediction = classifier_model.predict(features_scaled_class)
        
        # Scale features for regression
        features_scaled_reg = scaler_reg.transform([features])
        
        # Make prediction with regression model
        reg_prediction = regressor_model.predict(features_scaled_reg)
        
        # Convert predictions to appropriate types for JSON response
        return jsonify({
            'ticker': ticker,
            'classification_prediction': int(class_prediction[0]),  # 1 for Up, 0 for Down
            'regression_prediction': reg_prediction[0].tolist()  # Predicted closing price
        })
    
    except Exception as e:
        # Log the error for debugging
        print("Prediction error:", e)
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
