import requests
import os

API_KEY = "8a01c736-07fb-4d1d-b3bb-10a3a2cc3435"  # test key

url = "https://api.vapi.ai/assistant"

payload = {
    "name": "Interview Assistant",
    "firstMessage": "Hi! Let's start your interview. I’ll ask one question at a time.",
    "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "temperature": 0.7,
        "messages": [{
            "role": "system",
            "content": """
You are an interview assistant.
You will ask the candidate the questions provided in the metadata field "questions".

Rules:
1. Ask one question at a time in order.
2. After the candidate answers, move to the next question.
3. Be polite and concise.
4. When all questions are done, thank the candidate and end the call.
            """
        }]
    },
    "voice": {
        "provider": "11labs",
        "voiceId": "21m00Tcm4TlvDq8ikWAM"   # 👈 Correct format
    }
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.status_code)
print(response.json())
