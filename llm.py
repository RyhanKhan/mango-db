import json
from pymongo import MongoClient

# Load the JSON data from the file llm.json
with open('./llm.json') as f:
    llm_data = json.load(f)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['ninjacart_llm']
collection = db['tags_fix']

# Function to find tag and solution based on value and metric
def find_tag_and_solution(crop_name, metric_name, value):
    crop_data = llm_data.get('crops', {}).get(crop_name, {}).get('metrics', {}).get(metric_name, [])
    for entry in crop_data:
        if float(value) >= entry['lrange'] and float(value) <= entry['hrange']:
            return {"tag": entry['tag'], "solution": entry['solution']}
    return None

# Function to update the tags_fix collection
def update_tags_fix(metrics, crop_name="Rice"):
    for metric, value in metrics.items():
        result = find_tag_and_solution(crop_name, metric.lower(), value)
        if result:
            collection.update_one(
                {"metric": metric},
                {"$set": {"tag": result['tag'], "solution": result['solution']}},
                upsert=True
            )
            print(f"Updated {metric}: Tag = {result['tag']}, Solution = {result['solution']}")
        else:
            print(f"No suitable range found for {metric} with value {value}")

# Example input metrics
# metrics_input = {
#     "soil_pH": 8.5,
#     "nitrogen_content": 188,
#     "moisture_content": 70,
#     "temperature": 30,
#     "humidity": 80,
#     "precipitation": 129
# }

# # Update the MongoDB collection based on the input metrics for Rice
# update_tags_fix(metrics_input)
