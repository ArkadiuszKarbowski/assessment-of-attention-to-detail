from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import os
from .models import Users


def create_app():
  app = Flask(__name__)

  #coś zmienne srodowiskowe mi nie działają więc
  #to lokalnie:
  #app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://attention_to_detail_db_user:DFykAjgLeZjqvCuL5mjtlk9nFXoy1GMf@dpgcgo5pn5269v5rja7nbug-a.frankfurt-postgres.render.com/attention_to_detail_db"
  #a to na renderze:
  app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('URL_DB')

  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db = SQLAlchemy(app)

  @app.route("/")
  def index():
    return render_template('index.html')

  @app.route('/page2', methods=['GET', 'POST'])
  def page2():
    try:
      if request.method == 'POST':
        first_name = request.form['imie']
        last_name = request.form['nazwisko']
        study_field = request.form['kierunek']
        university = request.form['uczelnia']
        email = request.form['email']
        gender = request.form['plec']
        age = request.form['wiek']

      new_user = Users(first_name=first_name,
                      last_name=last_name,
                      study_field=study_field,
                      university=university,
                      email=email,
                      gener=gender,
                      age=age)
      db.session.add(new_user)
      db.session.commit()
    except Exception as e:
      db.session.rollback()
      print(str(e))
    return render_template('index.html')

  if __name__ == "__main__":
    app.run(debug=True)

  return app
