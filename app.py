from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()


def create_app():
  app = Flask(__name__)

  from models.users import Users
  from models.task_results import TestResult
  

  #coś zmienne srodowiskowe mi nie działają więc
  #to lokalnie:
  #app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://attention_to_detail_db_user:DFykAjgLeZjqvCuL5mjtlk9nFXoy1GMf@dpgcgo5pn5269v5rja7nbug-a.frankfurt-postgres.render.com/attention_to_detail_db"
  #a to na renderze:
  app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('URL_DB')

  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db.init_app(app)

  @app.route("/")
  def index():
    return render_template('home.html')
  @app.route("/page2")
  def page2():
    return render_template('test.html')
  @app.route('/page3', methods=['GET', 'POST'])
  def page3():
    try:
      if request.method == 'POST':
        first_name = request.form['imie']
        last_name = request.form['nazwisko']
        study_field = request.form['kierunek']
        university = request.form['uczelnia']
        email = request.form['email']
        gender = request.form['plec']
        age = request.form['wiek']
        x
      new_user = Users(first_name=first_name,
                      last_name=last_name,
                      study_field=study_field,
                      university=university,
                      email=email,
                      gender=gender,
                      age=age)
      db.session.add(new_user)
      db.session.commit()
    except Exception as e:
      db.session.rollback()
      print(str(e))
    return redirect('/page4')
  
  @app.route('/page4')
  def page4():
    return render_template('spot-typo.html')
  @app.route('/page5')
  def page5():
    return render_template('zad2.html')
  @app.route('/page6', methods=['POST'])
  def page6():
    try:
        
        selected_answer = request.form['sel']
        correct_answer = request.form['correct']
        task_version = request.form['ver']
        time_taken = request.form['timetak']

        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=1, task_id=1, selected_answer=selected_answer,   correct_answer=correct_answer, task_version=task_version, time_taken=time_taken)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page7')
  @app.route('/page7')
  def page7():
    return render_template('zad3.html')
  if __name__ == "__main__":
    app.run(host= '0.0.0.0', debug=True)

  return app
