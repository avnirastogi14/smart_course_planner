from fastapi import APIRouter
from app.models.admin import ApprovalRequest
from app.services.database import get_all_data
from app.services.admin_service import log_decision
from app.algorithms.prereq_validation import prereq_violations

router = APIRouter(prefix="/admin")


def calculate_semester_load(courses, selected):
    course_map = {c["course_id"]: c for c in courses}
    total = sum(
        course_map[c]["credits"]
        for c in selected
        if c in course_map
    )
    return {"total_credits": total}


@router.post("/approve")
def approve_plan(req: ApprovalRequest):
    data = get_all_data()

    courses = data.get("courses", [])

    history = [
        h for h in data.get("student_history", [])
        if h.get("student_id") == req.student_id
    ]

    config = data.get("config", {})
    max_credits = config.get("max_credits_per_sem", 18)

    reasons = []

    # prereq check
    reasons += prereq_violations(courses, history, req.selected)

    # credit check
    load = calculate_semester_load(courses, req.selected)
    if load["total_credits"] > max_credits:
        reasons.append("Credit overload")

    decision = "APPROVED" if not reasons else "REJECTED"

    log_decision(req.student_id, req.semester, decision, reasons)

    return {
        "decision": decision,
        "reasons": reasons,
        "total_credits": load["total_credits"]
    }