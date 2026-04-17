from app.database import get_collection

history_col = get_collection("student_history")


def get_student_history(student_id: str):
    return [
        h for h in history_col.find({}, {"_id": 0})
        if h.get("student_id") == student_id
    ]