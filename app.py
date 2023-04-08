from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

def create_app():
    app = Flask(__name__)

    #coś zmienne srodowiskowe mi nie działają więc
    #to lokalnie:
    #app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://attention_to_detail_db_user:DFykAjgLeZjqvCuL5mjtlk9nFXoy1GMf@dpg-cgo5pn5269v5rja7nbug-a.frankfurt-postgres.render.com/attention_to_detail_db"
    #a to na renderze:
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('URL_DB')
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db = SQLAlchemy(app)

    

    class test(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)

        def __repr__(self):
            return '<User %r>' % self.username

    new_user = test(username='jasiu', email='jasiu_doe@example.com')

    @app.route("/")
    def index():
        return render_template('index.html')

    @app.route("/dodaj")
    def dodaj():
      try:
        db.session.add(new_user)
        db.session.commit()
      except Exception as e:
        db.session.rollback()
        print(str(e))
      return render_template('index.html')

    if __name__ == "__main__":
     app.run(debug=True)

    return app