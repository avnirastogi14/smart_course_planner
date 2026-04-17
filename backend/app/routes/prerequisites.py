from fastapi import APIRouter
from pydantic import BaseModel
from app.services.prerequisite_service import get_all_prereqs, add_prereq, delete_prereq

router = APIRouter(prefix="/prerequisites")

@router.get("")
def get_prereqs():
    return get_all_prereqs()


@router.post("")
def add_prereq_route(data: dict):
    return add_prereq(data)


class PrereqDelete(BaseModel):
    course: str
    prerequisite: str


# @router.delete("")
# def delete_prerequisite(data: PrereqDelete):
#     return delete_prereq(data.course, data.prerequisite)

@router.delete("")
def delete_prerequisite(course: str, prerequisite: str):
    return delete_prereq(course, prerequisite)