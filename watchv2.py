from pymongo import MongoClient
from bson.json_util import dumps
import threading

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['ninjacart_db']

# Get latest values
# db.collection_name.find().sort({ _id: -1 }).limit(1)


# Function to watch changes in a collection
def watch_collection(collection):
    
    with collection.watch() as stream:

        #Get the last element
        current = float(db[collection.name].find_one(sort=[("timestamp", -1)])['value'])
        print(current)

        while stream.alive:
            #current = float(db[collection.name].find_one(sort=[("timestamp", -1)])['value'])
            #print(current)
            for change in stream:
                # Log the change for the specific collection
                #print(f"{collection.name.capitalize()} changed:", dumps(change))
                
                # Extract the collection name and value from the full document
                collection_name = change['ns']['coll']
                value = float(change['fullDocument']['value'])
                # Fetch the second last document based on timestamp
                second_last_element_cursor = db[collection.name].find().sort("timestamp", -1).skip(1).limit(1)

                # Convert the cursor to a list or directly get the document
                second_last_element = list(second_last_element_cursor)

                # Ensure there is a document returned before accessing it
                if second_last_element:
                    current = float(second_last_element[0]['value'])
                # Accessing 'value' of the second last document
                else:
                    current = None  # In case there are not enough documents
                    
                # current = float(db.collection.find().sort("timestamp", -1).skip(1).limit(1)['value'])
                if current == value:
                    continue
                # Prepare the output in the desired format
                result = {collection_name: value}

                # Print or return the result (you could also send it to the dashboard/LLM here)
                # Send it to the LLM
                print(result)

# List of collections to watch
collections = [
    db.soil_pH,
    db.moisture_content,
    db.nitrogen_content,
    db.temperature,
    db.precipitation,
    db.humidity
]

# Start threads for each collection to monitor the change streams concurrently
threads = []
for collection in collections:
    t = threading.Thread(target=watch_collection, args=(collection,))
    t.start()
    threads.append(t)

# Ensure the program doesn't exit and waits for all threads
for t in threads:
    t.join()
