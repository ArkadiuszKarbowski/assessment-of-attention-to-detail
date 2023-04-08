from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    study_field = db.Column(db.String(80), nullable=False)
    university = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120))
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer(), nullable=False)

    def __repr__(self):
      return '<User %r>' % self.username
