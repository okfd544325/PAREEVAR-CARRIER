from pydantic import BaseModel
from google.genai import types
from .client import get_client, GEMINI_MODEL
from .prompts import SYSTEM_INSTRUCTION, build_context
from .schemas import CareerAnalysis, SkillGapResult, RoadmapResult

def analyze_career_matches(profile: dict, careers: list) -> CareerAnalysis | None:
    client = get_client()
    if not client:
        return None
        
    context = build_context(profile, careers)
    prompt = f"{context}\n\nAnalyze this student and return the top matching careers from the database."
    
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=CareerAnalysis,
            ),
        )
        return response.parsed
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def analyze_skill_gap(profile: dict, career: dict) -> SkillGapResult | None:
    client = get_client()
    if not client:
        return None
        
    context = build_context(profile, [career])
    prompt = f"{context}\n\nPerform a detailed skill gap analysis for the target career: {career['title']}"
    
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=SkillGapResult,
            ),
        )
        return response.parsed
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def generate_roadmap(profile: dict, career: dict, courses: list) -> RoadmapResult | None:
    client = get_client()
    if not client:
        return None
        
    context = build_context(profile, [career], courses)
    prompt = f"{context}\n\nCreate a chronological, actionable roadmap to achieve the target career: {career['title']} using the provided courses."
    
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=RoadmapResult,
            ),
        )
        return response.parsed
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def generate_lmis_insight(data: dict) -> dict:
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        You are an AI Labour Market Intelligence Analyst for MSDE/NCVET planners.
        You must analyze the following labour market data and explain WHY this situation is occurring and WHAT actions the planner should take.
        Do NOT invent any numerical statistics. ONLY use the data provided.

        DATA:
        Trade: {data['trade']}
        Location: {data['location']}
        Current Demand: {data['demand']}
        Current Training Capacity: {data['capacity']}
        Gap: {data['gap']} (Negative means shortage, Positive means oversupply)
        Severity Status: {data['severity']}
        Forecasted Demand (12mo): {data['forecastDemand']}
        Signals: {data['signals']}

        Write a concise, professional 3-paragraph insight formatted in HTML (using <p>, <strong>, <ul>, <li>).
        1. Summarize the current situation based on the numbers.
        2. Analyze the signals and forecast trend.
        3. Provide 2-3 bullet points of recommended actions for a planner.
        """
        response = model.generate_content(prompt)
        return {"insight": response.text}
    except Exception as e:
        print(f"Gemini LMIS Insight Error: {e}")
        return None
