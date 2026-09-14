from datetime import datetime

from models.user import db


class SpeechHistory(db.Model):
    __tablename__ = "speech_history"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
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

    audio_url = db.Column(
        db.String(255),
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
            "text": self.text,
            "language": self.language,
            "voice": self.voice,
            "audio_url": self.audio_url,
            "created_at": self.created_at.isoformat()
            if self.created_at else None
        }