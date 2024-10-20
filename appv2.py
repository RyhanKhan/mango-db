from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS
import llm
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ninjacart_db']  # Database for IoT data
except Exception as e:
    logging.error("Error connecting to MongoDB: %s", e)


# Function to pre-populate the collections if they are empty
def pre_populate_collections():
    collections = ['soil_pH', 'moisture_content', 'nitrogen_content', 'temperature', 'precipitation', 'humidity']
    for collection in collections:
        if db[collection].count_documents({}) == 0:
            db[collection].insert_one({"value": 0, "timestamp": datetime.now()})


# Call the pre-population function when the app starts
pre_populate_collections()


# Root route to check if the server is running
@app.route('/')
def index():
    logging.debug('Root endpoint accessed')
    return "Flask server is running!"


# Single route to add all metrics data
@app.route('/metrics', methods=['POST'])
def add_metrics():
    data = request.json

    # Check if the data contains the required fields and insert into the appropriate collections
    if 'soil_pH' in data:
        db.soil_pH.insert_one({"value": data.get('soil_pH'), "timestamp": datetime.now()})
    if 'moisture_content' in data:
        db.moisture_content.insert_one({"value": data.get('moisture_content'), "timestamp": datetime.now()})
    if 'nitrogen_content' in data:
        db.nitrogen_content.insert_one({"value": data.get('nitrogen_content'), "timestamp": datetime.now()})
    if 'temperature' in data:
        db.temperature.insert_one({"value": data.get('temperature'), "timestamp": datetime.now()})
    if 'precipitation' in data:
        db.precipitation.insert_one({"value": data.get('precipitation'), "timestamp": datetime.now()})
    if 'humidity' in data:
        db.humidity.insert_one({"value": data.get('humidity'), "timestamp": datetime.now()})

    # Update LLM tags
    llm.update_tags_fix(data)

    # Respond with success
    logging.debug("Metrics data inserted successfully.")
    return jsonify({"message": "Metrics data inserted!"}), 200


# Route to fetch the last 20 elements from all collections
@app.route('/data', methods=['GET'])
def fetch_data():
    try:
        data = {}
        collections = ['temperature', 'humidity', 'precipitation', 'moisture_content', 'nitrogen_content', 'soil_pH']
        
        # Loop through each collection and fetch the last 20 elements
        for collection_name in collections:
            collection = db[collection_name]
            # Fetch last 20 elements, sorting by the '_id' field to get the most recent
            last_20_entries = list(collection.find().sort('_id', -1).limit(20))
            
            # Format data: store only 'value' and 'timestamp' if they exist
            formatted_data = [
                {
                    'value': entry.get('value'),
                    'timestamp': entry.get('timestamp')
                }
                for entry in last_20_entries
            ]
            
            data[collection_name] = formatted_data
        
        # Return the combined data as JSON
        logging.debug("/data endpoint accessed successfully.")
        return jsonify(data)

    except Exception as e:
        logging.error("Error fetching data from MongoDB: %s", e)
        return jsonify({"error": "Error fetching data"}), 500


if __name__ == '__main__':
    app.run(debug=True)
