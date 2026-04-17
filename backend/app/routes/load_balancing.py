from fastapi import APIRouter
from app.services.database import get_all_data
from app.algorithms.load_balancing import generate_plan

router = APIRouter(prefix="/load-balancing")


@router.post("")
def load_balancing(payload: dict):
    data = get_all_data()

    courses = data["courses"]
    prereqs = data["prerequisites"]

    # NEW: override config from frontend
    max_sem = payload.get("max_credits_per_sem", 18)
    degree_req = payload.get("degree_required_credits", 120)

    return generate_plan(courses, prereqs, max_sem, degree_req)