from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
import os
from models.myform import AnkietaForm

db = SQLAlchemy()

def create_app():
  app = Flask(__name__)

  app.secret_key = 'XHAEu7TvJgo5aplAGen57WMQNvvMOPRZ'

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

  @app.route("/page2", methods=['GET', 'POST'])
  def page2():
    form = AnkietaForm()
    
    if form.validate_on_submit():
        session.clear()
        # Odbieranie danych z formularza
        first_name = form.first_name.data
        last_name = form.last_name.data
        study_field = form.study_program.data
        university = form.university.data
        email = form.email.data
        gender = form.gender.data
        age = form.age.data
      
        new_user = Users(first_name=first_name,
                      last_name=last_name,
                      study_field=study_field,
                      university=university,
                      email=email,
                      gender=gender,
                      age=age)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        
        print(first_name + gender)

        return redirect('/page4')
    return render_template('test.html', form=form)

  @app.route('/page3', methods=['GET', 'POST'])
  def page3():
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
                      gender=gender,
                      age=age)
      db.session.add(new_user)
      db.session.commit()
      session['user_id'] = new_user.id

    return redirect('/page4')
  
  @app.route('/page4')
  def page4():
    return render_template('spot-typo.html')
    
  @app.route('/page5', methods=['GET', 'POST'])
  def page5():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sum']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=2, task_version=1, time_taken=time_taken, task_number=1)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page6')
    
  @app.route('/page6')
  def page6():
    return render_template('zad2.html')

  @app.route('/page7', methods=['GET', 'POST'])
  def page7():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          correct_answer = request.form['correct']
          task_version = request.form['ver']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=task_version, time_taken=time_taken, task_number=2)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page8')

  @app.route('/page8')
  def page8():
    return render_template('zad3.html')

  @app.route('/page9', methods=['GET', 'POST'])
  def page9():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          correct_answer = request.form['correct']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=1, time_taken=time_taken, task_number=3)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page10')

  @app.route('/page10')
  def page10():
    return render_template('zad4.html')
  @app.route('/page11')
  def page11():
    return render_template('zad4pyt.html')
  @app.route('/page12', methods=['GET', 'POST'])
  def page12():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          correct_answer = request.form['correct']
          time_taken = request.form['timetak']
          task_version = request.form['ver']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=task_version, time_taken=time_taken, task_number=4)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page13')
  @app.route('/page13')
  def page13():
    return render_template('zad5.html')
  @app.route('/page14', methods=['GET', 'POST'])
  def page14():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=13, task_version=1, time_taken=time_taken, task_number=5)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page15')
    
  @app.route('/page15')
  def page15():
    return render_template('zad6.html') 
  @app.route('/page16', methods=['GET', 'POST'])
  def page16():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=17, task_version=1, time_taken=time_taken, task_number=6)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page17')
  @app.route('/page17')
  def page17():
    return render_template('zad7.html') 
  @app.route('/page18', methods=['GET', 'POST'])
  def page18():
    try:
        if request.method == 'POST':
          selected_answer = request.form['sel']
          time_taken = request.form['timetak']
        # Create a new TestResult object and add it to the database
        new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=3241, task_version=1, time_taken=time_taken, task_number=7)
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(str(e))
    return redirect('/page19')
  @app.route('/page19')
  def page19():
    return render_template('zad8.html') 
  if __name__ == "__main__":
    app.run(host= '0.0.0.0', debug=True)

  return app
