from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import courses, prerequisites, admin, load_balancing

app = FastAPI(title="Smart Course Planner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses.router)
app.include_router(prerequisites.router)
app.include_router(admin.router)
app.include_router(load_balancing.router)


@app.get("/")
def root():
    return {"status": "running"}