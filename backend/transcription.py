from deepgram import DeepgramClient
import os
from dotenv import load_dotenv

load_dotenv()

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

class TranscriptionService:
    def __init__(self):
        if not DEEPGRAM_API_KEY or DEEPGRAM_API_KEY == "your_deepgram_api_key_here":
            print("Warning: DEEPGRAM_API_KEY is not set.")
            self.client = None
        else:
            self.client = DeepgramClient(api_key=DEEPGRAM_API_KEY)

    async def transcribe_audio(self, file_path: str, mimetype: str = "audio/mp3"):
        if not self.client:
            raise Exception("Deepgram client not initialized. Check API Key.")

        with open(file_path, "rb") as file:
            buffer_data = file.read()


        # options: nova-2-medical, smart_format, diarize
        # SDK v3+ uses direct kwargs for options, and typed boolean values
        response = self.client.listen.v1.media.transcribe_file(
            request=buffer_data,
            model="nova-2-medical",
            smart_format=True,
            diarize=True,
            punctuate=True,
            utterances=True
        )
        return self.parse_deepgram_to_segments(response)

    def parse_deepgram_to_segments(self, response):
        segments = []
        try:
            # Navigate Deepgram response structure
            alternatives = response.results.channels[0].alternatives[0]
            
            # Use paragraphs if available (better for chat format), else fall back to utterances or words
            if hasattr(alternatives, 'paragraphs') and alternatives.paragraphs:
                for paragraph in alternatives.paragraphs.paragraphs:
                    # Deepgram speaker index (0, 1, 2) -> "Speaker 0", "Speaker 1"
                    speaker_label = f"Speaker {paragraph.speaker}"
                    
                    # Combine sentences in the paragraph
                    text = " ".join([s.text for s in paragraph.sentences])
                    
                    segments.append({
                        "speaker": speaker_label,
                        "text": text,
                        "start_time": paragraph.start,
                        "end_time": paragraph.end,
                        "confidence": getattr(paragraph.sentences[0], 'confidence', 1.0) if paragraph.sentences else 1.0
                    })
            else:
                # Fallback implementation (if paragraphs not enabled)
                text = alternatives.transcript
                segments.append({
                    "speaker": "Speaker 0",
                    "text": text,
                    "start_time": 0.0,
                    "end_time": alternatives.words[-1].end if alternatives.words else 0.0,
                    "confidence": 1.0
                })
                
        except Exception as e:
            print(f"Error parsing Deepgram response: {e}")
            import traceback; traceback.print_exc()
            
        return segments

transcription_service = TranscriptionService()
