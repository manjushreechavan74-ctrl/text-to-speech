from datetime import datetime

from models.user import db


class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    label = db.Column(
        db.String(100),
        nullable=False
    )

    text = db.Column(
        db.Text,
        nullable=False
    )

    language = db.Column(
        db.String(20),
        nullable=False
    )

    voice = db.Column(
        db.String(50),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "label": self.label,
            "text": self.text,
            "language": self.language,
            "voice": self.voice,
            "created_at": self.created_at.isoformat()
            if self.created_at else None
        }