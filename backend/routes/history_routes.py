from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import db
from models.speech_history import SpeechHistory


history_bp = Blueprint("history", __name__)


@history_bp.route("/api/history", methods=["GET"])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()

    entries = (
        SpeechHistory.query
        .filter_by(user_id=user_id)
        .order_by(SpeechHistory.created_at.desc())
        .all()
    )

    return jsonify({
        "success": True,
        "history": [entry.to_dict() for entry in entries]
    })


@history_bp.route("/api/history/<int:entry_id>", methods=["DELETE"])
@jwt_required()
def delete_history(entry_id):
    user_id = get_jwt_identity()

    entry = SpeechHistory.query.filter_by(
        id=entry_id,
        user_id=user_id
    ).first()

    if not entry:
        return jsonify({
            "success": False,
            "error": "History entry not found."
        }), 404

    db.session.delete(entry)
    db.session.commit()

    return jsonify({
        "success": True
    })