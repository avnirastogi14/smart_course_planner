from pydantic import BaseModel
from typing import List

class ApprovalRequest(BaseModel):
    student_id: str
    semester: int
    selected: List[str]