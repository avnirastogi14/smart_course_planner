from pydantic import BaseModel
from typing import List

class Course(BaseModel):
    course_id: str
    name: str
    credits: int
    difficulty: int
    semester_offered: int
    department: str