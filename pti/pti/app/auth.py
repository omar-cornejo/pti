from flask import Blueprint, render_template, request, redirect, session, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from .models import get_db
from .utils import generate_token

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]
        db = get_db()
        row = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        if row and check_password_hash(row["password"], password):
            session["user"] = username
            return redirect(url_for("main.dashboard"))
        return "Usuario o contraseña incorrectos", 401
    return render_template("login.html")


@auth.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]
        if not username or not password:
            return "Usuario y contraseña requeridos", 400
        db = get_db()
        try:
            db.execute(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                (username, generate_password_hash(password)),
            )
            db.commit()
        except Exception:
            return "Usuario ya existe", 400
        return redirect(url_for("auth.login"))
    return render_template("register.html")


@auth.route("/token", methods=["POST"])
def token_login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")
    if not username or not password:
        return jsonify({"error": "missing credentials"}), 400

    db = get_db()
    row = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    if row and check_password_hash(row["password"], password):
        token = generate_token(username)
        return jsonify({"token_type": "Bearer", "token": token}), 200
    return jsonify({"error": "invalid credentials"}), 401


@auth.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("main.home"))
