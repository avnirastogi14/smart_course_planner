from app.database import get_collection


def get_all_data():
    courses = list(get_collection("courses").find({}, {"_id": 0}))
    prereqs = list(get_collection("prerequisites").find({}, {"_id": 0}))
    history = list(get_collection("student_history").find({}, {"_id": 0}))
    config_doc = get_collection("config").find_one({}, {"_id": 0}) or {}

    return {
        "courses": courses,
        "prerequisites": prereqs,
        "student_history": history,
        "config": config_doc
    }