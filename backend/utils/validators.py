from config import Config

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "gu": "Gujarati",
    "mr": "Marathi",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
}

VOICES_BY_LANGUAGE = {
    "en": [
        {"id": "en-male", "label": "English Male", "gender": "male"},
        {"id": "en-female", "label": "English Female", "gender": "female"},
    ],
    "hi": [
        {"id": "hi-male", "label": "Hindi Male", "gender": "male"},
        {"id": "hi-female", "label": "Hindi Female", "gender": "female"},
    ],
    "gu": [{"id": "gu-female", "label": "Gujarati Female", "gender": "female"}],
    "mr": [{"id": "mr-female", "label": "Marathi Female", "gender": "female"}],
    "es": [
        {"id": "es-male", "label": "Spanish Male", "gender": "male"},
        {"id": "es-female", "label": "Spanish Female", "gender": "female"},
    ],
    "fr": [{"id": "fr-female", "label": "French Female", "gender": "female"}],
    "de": [{"id": "de-male", "label": "German Male", "gender": "male"}],
}


def validate_text(text):
    if text is None or not text.strip():
        return "Text must not be empty."
    if len(text) > Config.MAX_TEXT_LENGTH:
        return f"Text exceeds maximum allowed length of {Config.MAX_TEXT_LENGTH} characters."
    return None


def validate_language(language):
    if language not in SUPPORTED_LANGUAGES:
        return "Unsupported language selected."
    return None


def validate_voice(language, voice):
    voices = VOICES_BY_LANGUAGE.get(language, [])
    if not any(v["id"] == voice for v in voices):
        return "Selected voice does not belong to the selected language."
    return None