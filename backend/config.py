import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-key")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///tts_app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    TTS_PROVIDER = os.getenv("TTS_PROVIDER", "gtts")
    TTS_API_KEY = os.getenv("TTS_API_KEY", "")
    TTS_REGION = os.getenv("TTS_REGION", "")
    TTS_ENDPOINT = os.getenv("TTS_ENDPOINT", "")

    MAX_TEXT_LENGTH = int(os.getenv("MAX_TEXT_LENGTH", 2000))
    AUDIO_FOLDER = os.getenv("AUDIO_FOLDER", "generated_audio")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")