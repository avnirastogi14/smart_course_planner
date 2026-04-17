from fastapi import APIRouter
from app.services.prerequisite_service import get_all_prereqs, add_prereq

router = APIRouter(prefix="/prerequisites")


@router.get("")
def get_prereqs():
    return get_all_prereqs()


@router.post("")
def add_prereq_route(data: dict):
    return add_prereq(data)

    from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PrereqDelete(BaseModel):
    course: str
    prerequisite: str

@router.delete("/prerequisites")
def delete_prerequisite(data: PrereqDelete):
    # delete from DB
    return {"message": "Deleted successfully"}