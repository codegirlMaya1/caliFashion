# backend/speech_routes.py
import os
from flask import Blueprint, request, jsonify, send_file
from openai import OpenAI
from datetime import datetime

speech_bp = Blueprint("speech_bp", __name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@speech_bp.post("/transcribe")
def transcribe_audio():
    """Receive audio blob and transcribe with Whisper."""
    try:
        audio = request.files["file"]
        with open("temp_audio.webm", "wb") as f:
            f.write(audio.read())

        with open("temp_audio.webm", "rb") as f:
            result = client.audio.transcriptions.create(
                model="whisper-1",
                file=f
            )
        return jsonify({"text": result.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@speech_bp.post("/speak")
def speak_text():
    """Generate speech from text using OpenAI TTS model."""
    try:
        data = request.get_json()
        text = data.get("text", "Hello there!")
        output_path = f"static/responses/{datetime.now().timestamp()}.mp3"

        response = client.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice="alloy",
            input=text
        )

        response.stream_to_file(output_path)
        return send_file(output_path, mimetype="audio/mpeg")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
