from deepgram import DeepgramClient
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("DEEPGRAM_API_KEY", "dummy_key")

try:
    client = DeepgramClient(api_key=api_key)
    
    print("\n Inspecting client root:")
    print(dir(client))
    
    if hasattr(client, 'listen'):
        print("\n HAS listen")
        print(dir(client.listen))
        
    if hasattr(client, 'prerecorded'):
        print("\n HAS prerecorded")

    # Maybe it's client.listen.rest.v("1")?
    # But 'rest' was not in dir(client.listen).
    
    # Is it possible 'transcribe' is somewhere else?
    
except Exception as e:
    print(f"Error: {e}")
