from app.database import get_collection

courses_collection = get_collection("courses")


def create_course(course: dict):
    courses_collection.insert_one(course)
    return {"status": "added"}


def get_all_courses():
    return list(courses_collection.find({}, {"_id": 0}))