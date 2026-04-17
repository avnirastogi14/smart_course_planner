from pymongo import MongoClient

MONGO_URI = "mongodb+srv://admin:<admin123>@cluster0.qim0t4s.mongodb.net/?appName=Cluster0"

DB_NAME = "test"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def get_collection(name: str):
    return db[name]