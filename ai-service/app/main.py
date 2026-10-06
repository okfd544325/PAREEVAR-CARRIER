from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

from .gemini.agent import analyze_career_matches, analyze_skill_gap, generate_roadmap

app = FastAPI(title="AI Career Counselling API - Gemini Integration")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProfileData(BaseModel):
    name: str = "Unknown"
    education: str = "Unknown"
    interests: List[str] = []
    skills: str = ""
    budget: str = "Unknown"
    location: str = "Unknown"
    assessmentScores: Dict[str, int] = {}

class RecommendationReq(BaseModel):
    profile: ProfileData
    candidates: List[Dict[str, Any]] # Careers from DB to analyze

class SkillGapReq(BaseModel):
    profile: ProfileData
    career: Dict[str, Any]

class RoadmapReq(BaseModel):
    profile: ProfileData
    career: Dict[str, Any]
    courses: List[Dict[str, Any]]

@app.get("/")
def read_root():
    return {"status": "AI Service (Gemini Edition) is running"}

@app.post("/recommendation")
def get_recommendation(req: RecommendationReq):
    result = analyze_career_matches(req.profile.model_dump(), req.candidates)
    if not result:
        # Fallback if Gemini fails or key missing
        return {"error": "Gemini AI unavailable or failed."}
    return result.model_dump()

@app.post("/skill-gap")
def get_skill_gap(req: SkillGapReq):
    result = analyze_skill_gap(req.profile.model_dump(), req.career)
    if not result:
        return {"error": "Gemini AI unavailable or failed."}
    return result.model_dump()

@app.post("/roadmap")
def get_roadmap(req: RoadmapReq):
    result = generate_roadmap(req.profile.model_dump(), req.career, req.courses)
    if not result:
        return {"error": "Gemini AI unavailable or failed."}
    return result.model_dump()

class LmisInsightReq(BaseModel):
    trade: str
    location: str
    demand: int
    capacity: int
    gap: int
    severity: str
    forecastDemand: int = 0
    signals: List[Dict[str, Any]] = []

@app.post("/api/lmis/insight")
def get_lmis_insight(req: LmisInsightReq):
    from .gemini.agent import generate_lmis_insight
    result = generate_lmis_insight(req.model_dump())
    if not result:
        return {"error": "Gemini AI unavailable or failed.", "insight": None}
    return result
