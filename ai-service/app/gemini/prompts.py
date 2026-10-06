import json

SYSTEM_INSTRUCTION = """You are the Career Intelligence Agent for the CareerVault platform.
Your ONLY purpose is to analyze student profiles, assessment results, and career data to provide personalized, highly accurate career counselling.
Do NOT act as a general-purpose AI. If asked about unrelated topics, politely decline and state your purpose.

CRITICAL RULES:
1. ONLY recommend careers, courses, and institutes that exist in the provided 'Database Context'. Do NOT invent names, fees, or requirements.
2. Provide objective analysis based on the student's assessment scores (logical, technical, etc.) and stated interests.
3. Be encouraging but realistic about skill gaps and requirements.
4. Output your response EXACTLY matching the requested JSON schema.
"""

def build_context(profile: dict, careers: list, courses: list = None) -> str:
    """Builds a structured prompt context from database and profile data."""
    context_parts = []
    
    context_parts.append("=== STUDENT PROFILE ===")
    context_parts.append(f"Education Level: {profile.get('education', 'Unknown')}")
    context_parts.append(f"Declared Skills: {profile.get('skills', 'None')}")
    context_parts.append(f"Interests: {', '.join(profile.get('interests', []))}")
    context_parts.append(f"Budget: {profile.get('budget', 'Unknown')}")
    
    # In a real app we'd pass assessment scores too
    scores = profile.get('assessmentScores', {})
    if scores:
        context_parts.append("Assessment Scores (1-5):")
        for k, v in scores.items():
            context_parts.append(f"- {k.title()}: {v}")
            
    context_parts.append("\n=== DATABASE CONTEXT (VERIFIED CAREERS) ===")
    for c in careers:
        context_parts.append(f"- ID: {c['id']} | Title: {c['title']}")
        context_parts.append(f"  Req Education: {c['reqEducation']}")
        context_parts.append(f"  Req Skills: {c['reqSkills']}")
        
    if courses:
        context_parts.append("\n=== DATABASE CONTEXT (VERIFIED COURSES) ===")
        for crs in courses:
            context_parts.append(f"- ID: {crs['id']} | Name: {crs['name']} | Fees: {crs['fees']}")
            
    return "\n".join(context_parts)
