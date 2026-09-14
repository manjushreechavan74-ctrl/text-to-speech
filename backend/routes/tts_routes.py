from flask import Blueprint, request, jsonify, send_from_directory, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import db
from models.speech_history import SpeechHistory

from services.tts_service import TTSService, TTSServiceError

from utils.validators import (
    validate_text,
    validate_language,
    validate_voice,
    SUPPORTED_LANGUAGES,
    VOICES_BY_LANGUAGE,
)


tts_bp = Blueprint("tts", __name__)

tts_service = TTSService()


@tts_bp.route("/api/tts", methods=["POST"])
@jwt_required(optional=True)
def generate_tts():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "error": "Invalid or missing JSON body."
        }), 400

    text = data.get("text", "")
    language = data.get("language", "")
    voice = data.get("voice", "")

    # Validate text
    error = validate_text(text)

    if error:
        return jsonify({
            "success": False,
            "error": error
        }), 400

    # Validate language
    error = validate_language(language)

    if error:
        return jsonify({
            "success": False,
            "error": error
        }), 400

    # Validate voice
    error = validate_voice(language, voice)

    if error:
        return jsonify({
            "success": False,
            "error": error
        }), 400

    # Generate speech
    try:
        filename = tts_service.generate_speech(
            text,
            language,
            voice
        )

    except TTSServiceError as exc:
        return jsonify({
            "success": False,
            "error": str(exc)
        }), 503

    audio_url = f"/audio/{filename}"

    # Save history if user is logged in
    user_id = get_jwt_identity()

    if user_id:
        history_entry = SpeechHistory(
            user_id=user_id,
            text=text,
            language=language,
            voice=voice,
            audio_url=audio_url,
        )

        db.session.add(history_entry)
        db.session.commit()

    return jsonify({
        "success": True,
        "audio_url": audio_url
    }), 201


@tts_bp.route("/api/voices", methods=["GET"])
def get_voices():
    language = request.args.get("language")

    if language:
        return jsonify({
            "success": True,
            "voices": VOICES_BY_LANGUAGE.get(language, [])
        })

    return jsonify({
        "success": True,
        "languages": SUPPORTED_LANGUAGES,
        "voices": VOICES_BY_LANGUAGE
    })


@tts_bp.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok"
    })


@tts_bp.route("/audio/<path:filename>", methods=["GET"])
def get_audio(filename):
    return send_from_directory(
        current_app.config["AUDIO_FOLDER"],
        filename,
        as_attachment=False
    )