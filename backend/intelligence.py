from openai import AsyncOpenAI
import os
from typing import List, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class Evidence(BaseModel):
    segment_ids: List[int] = Field(description="List of transcript segment IDs that support this sentence.")

class NoteSentence(BaseModel):
    text: str
    evidence: Evidence

class SoapSection(BaseModel):
    sentences: List[NoteSentence]

class ClinicalNoteStructured(BaseModel):
    subjective: SoapSection
    objective: SoapSection
    assessment: SoapSection
    plan: SoapSection

class IntelligenceService:
    def __init__(self):
        if not OPENAI_API_KEY or OPENAI_API_KEY == "your_openai_api_key_here":
            print("Warning: OPENAI_API_KEY is not set.")
            self.client = None
        else:
            self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)

    def prepare_transcript_for_llm(self, segments):
        """
        Formats transcript into a numbered list for citation.
        Format: [ID] SPEAKER: Text
        """
        formatted = ""
        for i, seg in enumerate(segments):
            # Using simple index 0..N as ID for LLM context
            formatted += f"[{i}] {seg['speaker']}: {seg['text']}\n"
        return formatted

    async def generate_note(self, segments_data: List[dict], visit_context: str = "General Visit") -> ClinicalNoteStructured:
        if not self.client:
            raise Exception("OpenAI client not initialized. Check API Key.")

        transcript_text = self.prepare_transcript_for_llm(segments_data)
        
        system_prompt = f"""
You are an expert clinical scribe assistant. Your task is to generate a structured SOAP note based on the provided transcript.
You must adhere to the "NO INVENT" rule: everything you write must be supported by the transcript.

CRITICAL REQUIREMENT: EVIDENCE LINKING
For every sentence you write, you MUST cite the source transcript segment IDs (the [N] numbers) that support it.
If a sentence infers information from multiple segments, cite all of them.

Context: {visit_context}
"""

        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": transcript_text},
                ],
                response_format={"type": "json_object"}, # Note: Strict JSON mode or tools is better, but this is simple starte
                # Actually, using Pydantic via tools/functions is more robust for 'ClinicalNoteStructured'
                # But for simplicity in this MVP, we can ask for JSON schema in prompt or use the new 'response_format' with schema support if available.
                # Let's use standard tool calling enforcement or just JSON mode. 
                # For this implementation plan, let's use the 'tools' approach or 'json_schema' if library supports it (v1.12 does).
            )
            
            # Using the new structured output parsing if available, or just parsing JSON content
            # For robustness in this snippet, let's assume standard json mode and we parse it into Pydantic manually or accept a wrapper.
            # But the 'client.beta.chat.completions.parse' is the modern way.  
            
            # Let's try the modern parse approach if pydantic is new enough.
            # If not, fallback to manual parse.
            pass 
        except Exception as e:
            print(f"Error calling OpenAI: {e}")
            raise e
            
    async def generate_note_with_structure(self, segments_data: List[dict]) -> ClinicalNoteStructured:
          if not self.client:
              # Return mock if no key
              return self._get_mock_note()
              
          transcript_text = self.prepare_transcript_for_llm(segments_data)
          
          completion = await self.client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": "You are a clinical scribe. Generate a SOAP note with strict evidence citations."},
                {"role": "user", "content": transcript_text},
            ],
            response_format=ClinicalNoteStructured,
        )
          return completion.choices[0].message.parsed

    def _get_mock_note(self):
        # Fallback for demo without keys
        return ClinicalNoteStructured(
            subjective=SoapSection(sentences=[NoteSentence(text="Patient describes... (Mock)", evidence=Evidence(segment_ids=[0]))]),
            objective=SoapSection(sentences=[]),
            assessment=SoapSection(sentences=[]),
            plan=SoapSection(sentences=[])
        )

intelligence_service = IntelligenceService()
