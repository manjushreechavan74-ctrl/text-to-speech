import os
import uuid
import asyncio
import edge_tts

from config import Config


class TTSServiceError(Exception):
    """Raised when the TTS provider fails to generate audio."""
    pass


# Map your project's voice IDs to actual Microsoft Edge TTS voices.
VOICE_MAP = {
    # English
    "en-male": "en-US-GuyNeural",
    "en-female": "en-US-JennyNeural",

    # Hindi
    "hi-male": "hi-IN-MadhurNeural",
    "hi-female": "hi-IN-SwaraNeural",

    # Gujarati
    "gu-female": "gu-IN-DhwaniNeural",

    # Marathi
    "mr-female": "mr-IN-AarohiNeural",

    # Spanish
    "es-male": "es-ES-AlvaroNeural",
    "es-female": "es-ES-ElviraNeural",

    # French
    "fr-female": "fr-FR-DeniseNeural",

    # German
    "de-male": "de-DE-ConradNeural",
}


class TTSService:

    def __init__(self):
        self.audio_folder = Config.AUDIO_FOLDER
        os.makedirs(self.audio_folder, exist_ok=True)

    def generate_speech(self, text, language, voice):
        try:
            # Check whether the selected voice exists.
            voice_name = VOICE_MAP.get(voice)

            if not voice_name:
                raise TTSServiceError(
                    f"Unsupported voice selected: {voice}"
                )

            # Create a unique MP3 filename.
            filename = f"{uuid.uuid4().hex}.mp3"
            filepath = os.path.join(
                self.audio_folder,
                filename
            )

            # Generate speech using the selected Edge TTS voice.
            asyncio.run(
                self._generate_audio(
                    text,
                    voice_name,
                    filepath
                )
            )

            return filename

        except TTSServiceError:
            raise

        except Exception as exc:
            raise TTSServiceError(
                f"Failed to generate speech: {exc}"
            )

    async def _generate_audio(self, text, voice_name, filepath):
        communicate = edge_tts.Communicate(
            text,
            voice_name
        )

        await communicate.save(filepath)