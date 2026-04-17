from fastapi import APIRouter
from app.services.course_service import get_all_courses, create_course
from app.models.course import Course

router = APIRouter(prefix="/courses")


@router.get("")
def get_courses():
    return get_all_courses()


@router.post("")
def add_course(course: Course):
    return create_course(course.dict())