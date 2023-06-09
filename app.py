from flask import Flask, render_template, request, redirect, session, jsonify
from flask_sqlalchemy import SQLAlchemy
import os 
from models.myform import AnkietaForm
import json

db = SQLAlchemy()

def create_app():

    app = Flask(__name__)
    
    app.secret_key = 'XHAEu7TvJgo5aplAGen57WMQNvvMOPRZ'

    from models.users import Users
    from models.task_results import TestResult
    instance = os.environ["INSTANCE_CONNECTION_NAME"]
    db_pass = os.environ["DB_PASS"]  # e.g. 'my-db-password'
    db_name = os.environ["DB_NAME"]  # e.g. 'my-database'
    db_user = os.environ["DB_USER"]


    url = f"postgresql+pg8000://{db_user}:{db_pass}@/{db_name}?unix_sock=/cloudsql/{instance}/.s.PGSQL.5432"

    app.config["SQLALCHEMY_DATABASE_URI"] = url

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    #f"postgresql://postgres:{db_pass}@{db_host}:5432/{db_name}"
    db.init_app(app)
    
    # @app.before_request
    # def block_firefox():
    #     user_agent = request.headers.get('User-Agent')
    #     if 'Firefox' in user_agent:
    #         return 'Dostęp z przeglądarki Firefox jest zabroniony.', 403


    @app.route("/")
    def index():
        return render_template('home.html')

    @app.route("/page2", methods=['GET', 'POST'])
    def page2():
        form = AnkietaForm()
        return render_template('test.html', form=form)

    @app.route('/page3', methods=['GET', 'POST'])
    def page3():
        form = AnkietaForm()
        if form.validate_on_submit():
            study_field = form.study_program.data
            university = form.university.data
            email = form.email.data
            gender = form.gender.data
            age = form.age.data

            new_user = Users(study_field=study_field,
                            university=university,
                            email=email,
                            gender=gender,
                            age=age)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            return redirect('/page4')
        return render_template('test.html', form=form)
    

    @app.route('/page4')
    def page4():
        return render_template('spot-typo.html')
        
    @app.route('/page5', methods=['POST', 'GET'])
    def page5():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                
                selected_answer = result['suma']
                time_taken = result['timeSpent']

                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=2, task_version=1, time_taken=time_taken, task_number=1)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page6' # Adres URL docelowej strony do przekierowania
                }

        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
        
    @app.route('/page6')
    def page6():
        return render_template('zad2.html')

    @app.route('/page7', methods=['POST', 'GET'])
    def page7():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)

                selected_answer = result['selectedAnswer']
                correct_answer = result['correct']
                task_version = result['ver']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=task_version, time_taken=time_taken, task_number=2)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page8' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)

    @app.route('/page8')
    def page8():
        return render_template('zad3.html')

    @app.route('/page9', methods=['POST', 'GET'])
    def page9():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedAnswers']
                correct_answer = result['correct']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=1, time_taken=time_taken, task_number=3)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page10' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)

    @app.route('/page10')
    def page10():
        return render_template('zad4.html')
    @app.route('/page11')
    def page11():
        return render_template('zad4pyt.html')
    @app.route('/page12', methods=['POST', 'GET'])
    def page12():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedAnswer']
                correct_answer = result['correct']
                time_taken = result['timeSpent']
                task_version = result['ver']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=task_version, time_taken=time_taken, task_number=4)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page13' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
    @app.route('/page13')
    def page13():
        return render_template('zad5.html')
    @app.route('/page14', methods=['POST', 'GET'])
    def page14():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedAnswer']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=13, task_version=1, time_taken=time_taken, task_number=5)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page15' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
        
    @app.route('/page15')
    def page15():
        return render_template('zad6.html') 
    @app.route('/page16', methods=['POST', 'GET'])
    def page16():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedanswer']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=17, task_version=1, time_taken=time_taken, task_number=6)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page17' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
    @app.route('/page17')
    def page17():
        return render_template('zad7.html') 
    @app.route('/page18', methods=['POST', 'GET'])
    def page18():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedanswer']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=3241, task_version=1, time_taken=time_taken, task_number=7)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page19' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
    @app.route('/page19')
    def page19():
        return render_template('zad8.html') 
    @app.route('/page20', methods=['POST', 'GET'])
    def page20():
        try:
            if request.method == 'POST':
                output = request.get_json()
                result = json.loads(output)
                selected_answer = result['selectedAnswer']
                time_taken = result['timeSpent']
                correct_answer = result['correct']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=correct_answer, task_version=1, time_taken=time_taken, task_number=8)
                db.session.add(new_result)
                db.session.commit()

                response_data = {
                'status': 'success', # Status odpowiedzi
                'message': 'Dane zostały pomyślnie przetworzone', # Komunikat
                'redirect': '/page21' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
    @app.route('/page21')
    def page21():
        return render_template('zad9.html') 
    @app.route('/page22', methods=['GET', 'POST'])
    def page22():
        try:
            if request.method == 'POST':

                output = request.get_json()
                result = json.loads(output)

                selected_answer = result['suma']
                time_taken = result['timeSpent']
                new_result = TestResult(user_id=session['user_id'], selected_answer=selected_answer, correct_answer=2, task_version=1, time_taken=time_taken, task_number=9)
                db.session.add(new_result)
                db.session.commit()
                
                response_data = {
                'status': 'success', # Status odpowiedzi
                'redirect': '/page23' # Adres URL docelowej strony do przekierowania
                }
        except Exception as e:
            db.session.rollback()
            print(str(e))
        return jsonify(response_data)
    @app.route('/page23')
    def page23():
        return render_template('end.html')
   
    if __name__ == "__main__":
        app.run(host= '0.0.0.0', debug=True, port=int(os.getenv("PORT",8080)))

    return app
