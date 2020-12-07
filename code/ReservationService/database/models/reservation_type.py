from database.db import db


class ReservationType(db.Document):
    title = db.StringField(required=True)
    description = db.StringField(required=False)
    created_at = db.StringField(required=False)
    updated_at = db.StringField(required=False)
