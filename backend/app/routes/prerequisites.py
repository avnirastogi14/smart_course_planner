from fastapi import APIRouter
from app.services.prerequisite_service import get_all_prereqs, add_prereq

router = APIRouter(prefix="/prerequisites")


@router.get("")
def get_prereqs():
    return get_all_prereqs()


@router.post("")
def add_prereq_route(data: dict):
    return add_prereq(data)