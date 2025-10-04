import os
import sqlite3
from flask import current_app, g


DATABASE_NAME = "pti.sqlite"


def get_db():
	"""Get a SQLite connection stored on Flask's g object.

	Creates instance folder on demand and configures row factory.
	"""
	if "db" not in g:
		# Ensure instance folder exists
		os.makedirs(current_app.instance_path, exist_ok=True)
		db_path = os.path.join(current_app.instance_path, DATABASE_NAME)
		g.db = sqlite3.connect(db_path, detect_types=sqlite3.PARSE_DECLTYPES)
		g.db.row_factory = sqlite3.Row
	return g.db


def close_db(e=None):
	"""Close DB connection at request teardown."""
	db = g.pop("db", None)
	if db is not None:
		db.close()


def init_db():
	"""Initialize database schema (id, username unique, password hash)."""
	db = get_db()
	db.execute(
		"""
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL
		);
		"""
	)
	db.commit()


