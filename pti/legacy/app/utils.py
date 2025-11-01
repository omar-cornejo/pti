from functools import wraps
from flask import request, session, redirect, url_for, current_app
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

TOKEN_SALT = "auth-token"
TOKEN_MAX_AGE = 3600  # seconds


def _serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"])


def generate_token(username: str) -> str:
    return _serializer().dumps(username, salt=TOKEN_SALT)


def verify_token(token: str):
    try:
        return _serializer().loads(token, salt=TOKEN_SALT, max_age=TOKEN_MAX_AGE)
    except (BadSignature, SignatureExpired):
        return None


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        # session-based
        if "user" in session:
            return view(*args, **kwargs)
        # bearer token
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            token = auth.split(" ", 1)[1]
            user = verify_token(token)
            if user:
                # opcional: no persistimos en session, solo pasamos adelante
                request.user_from_token = user
                return view(*args, **kwargs)
        return redirect(url_for("auth.login"))

    return wrapped
