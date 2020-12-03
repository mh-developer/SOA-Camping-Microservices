from database.db import db


class Reservation(db.Document):
    title = db.StringField(required=True)
    description = db.StringField(required=False)
    from_date = db.StringField(required=True)
    to_date = db.StringField(required=True)
    type_of_camping = db.StringField(required=False)
    status = db.StringField(required=False)
    camp = db.ListField(db.StringField(), required=False)
    created_at = db.StringField(required=False)
    updated_at = db.StringField(required=False)
