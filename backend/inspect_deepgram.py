from deepgram import DeepgramClient
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("DEEPGRAM_API_KEY", "dummy_key")

try:
    print(f"Initializing client with key length: {len(api_key)}")
    client = DeepgramClient(api_key=api_key)
    
    print("\n Inspecting client.listen:")
    print(dir(client.listen))
    
    if hasattr(client.listen, 'prerecorded'):
        print("\n client.listen.prerecorded exists")
    else:
        print("\n client.listen.prerecorded MISSING")
        
    print("\n Inspecting client.listen attributes manually:")
    for attr in dir(client.listen):
        if not attr.startswith("_"):
            print(f"- {attr}")
            val = getattr(client.listen, attr)
            print(f"  Type: {type(val)}")

except Exception as e:
    print(f"Error: {e}")
