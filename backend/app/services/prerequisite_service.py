from app.database import get_collection

prereq_col = get_collection("prerequisites")


def get_all_prereqs():
    return list(prereq_col.find({}, {"_id": 0}))


def add_prereq(prereq: dict):
    prereq_col.insert_one(prereq)
    return {"status": "added"}