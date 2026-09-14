from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import db
from models.favorite import Favorite


favorites_bp = Blueprint("favorites", __name__)


@favorites_bp.route("/api/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()

    favorites = (
        Favorite.query
        .filter_by(user_id=user_id)
        .order_by(Favorite.created_at.desc())
        .all()
    )

    return jsonify({
        "success": True,
        "favorites": [favorite.to_dict() for favorite in favorites]
    })


@favorites_bp.route("/api/favorites", methods=["POST"])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True) or {}

    label = data.get("label", "").strip()
    text = data.get("text", "").strip()
    language = data.get("language", "")
    voice = data.get("voice", "")

    if not label or not text or not language or not voice:
        return jsonify({
            "success": False,
            "error": "label, text, language and voice are required."
        }), 400

    favorite = Favorite(
        user_id=user_id,
        label=label,
        text=text,
        language=language,
        voice=voice
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify({
        "success": True,
        "favorite": favorite.to_dict()
    }), 201


@favorites_bp.route("/api/favorites/<int:favorite_id>", methods=["DELETE"])
@jwt_required()
def delete_favorite(favorite_id):
    user_id = get_jwt_identity()

    favorite = Favorite.query.filter_by(
        id=favorite_id,
        user_id=user_id
    ).first()

    if not favorite:
        return jsonify({
            "success": False,
            "error": "Favorite not found."
        }), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({
        "success": True
    })