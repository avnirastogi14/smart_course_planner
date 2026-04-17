from app.database import get_collection

prereq_col = get_collection("prerequisites")


def get_all_prereqs():
    return list(prereq_col.find({}, {"_id": 0}))


def add_prereq(prereq: dict):
    prereq_col.insert_one(prereq)
    return {"status": "added"}

def delete_prereq(course: str, prerequisite: str):
    from app.services.database import db  # adjust if needed

    result = db.prerequisites.delete_one({
        "course": course,
        "prerequisite": prerequisite
    })

    if result.deleted_count == 0:
        return {"message": "Prerequisite not found"}

    return {"message": "Deleted successfully"}