import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models.user import db
from routes.tts_routes import tts_bp
from routes.auth_routes import auth_bp
from routes.history_routes import history_bp
from routes.favorites_routes import favorites_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["AUDIO_FOLDER"] = Config.AUDIO_FOLDER

    os.makedirs(Config.AUDIO_FOLDER, exist_ok=True)

    db.init_app(app)
    JWTManager(app)
    CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)

    app.register_blueprint(tts_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(history_bp)
    app.register_blueprint(favorites_bp)

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)