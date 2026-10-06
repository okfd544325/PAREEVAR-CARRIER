from pydantic import BaseModel, Field
from typing import List, Optional

class CareerRecommendation(BaseModel):
    careerId: str = Field(..., description="The unique ID of the career from the database")
    matchExplanation: str = Field(..., description="Why this career is a good match based on profile and assessment")
    strengths: List[str] = Field(..., description="Student's strengths aligning with this career")
    gaps: List[str] = Field(..., description="Student's gaps or missing skills for this career")
    suitabilityLevel: str = Field(..., description="High, Medium, or Low")
    recommendedPath: str = Field(..., description="A short recommendation on how to start")

class CareerAnalysis(BaseModel):
    summary: str = Field(..., description="Overall summary of the student's aptitude and profile")
    topCareers: List[CareerRecommendation] = Field(..., description="List of personalized career recommendations")
    recommendedNextStep: str = Field(..., description="The immediate next actionable step for the student")

class SkillGapResult(BaseModel):
    careerId: str
    currentSkills: List[str]
    requiredSkills: List[str]
    missingSkills: List[str]
    prioritySkills: List[str] = Field(..., description="Skills to learn first")
    explanation: str = Field(..., description="Why these skills matter")

class RoadmapResult(BaseModel):
    goal: str
    stages: List[str] = Field(..., description="Chronological stages of the roadmap")
    skillsToLearn: List[str]
    recommendedCourses: List[str] = Field(..., description="Specific course names recommended")
    practicalProjects: List[str] = Field(..., description="Ideas for practical projects")
    internshipStep: str
    finalCareerStep: str
