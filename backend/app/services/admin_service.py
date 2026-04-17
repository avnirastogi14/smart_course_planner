from app.database import get_collection
from datetime import datetime

logs = get_collection("approval_logs")


def log_decision(student_id, semester, decision, reasons):
    logs.insert_one({
        "student_id": student_id,
        "semester": semester,
        "decision": decision,
        "reasons": reasons,
        "timestamp": datetime.utcnow()
    })