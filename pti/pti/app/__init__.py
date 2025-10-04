from flask import Flask
import os

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-change-me")

    
    from .routes import main
    from .auth import auth
    app.register_blueprint(main)
    app.register_blueprint(auth)

    
    from .models import close_db, init_db
    app.teardown_appcontext(close_db)
    
    with app.app_context():
        init_db()

    return app
