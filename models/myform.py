from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length, Optional, InputRequired, NumberRange


class AnkietaForm(FlaskForm):
    first_name  = StringField('Imię', validators=[DataRequired(), Length(max=15)])
    last_name  = StringField('Nazwisko', validators=[DataRequired(), Length(max=40)])
    study_program  = StringField('Kierunek studiów', validators=[DataRequired()])
    university  = StringField('Uczelnia', validators=[DataRequired()])
    email = StringField('Email', validators=[Optional(), Email()])
    gender  = SelectField('Płeć', choices=[('', 'Wybierz'), ('Mężczyzna', 'Mężczyzna'), ('Kobieta', 'Kobieta'), ('Inna', 'Inna')], validators=[DataRequired()])
    age = IntegerField('Wiek', validators=[InputRequired(), NumberRange(min=16, max=60, message='Wiek musi być w zakresie od 16 do 60'),])
    submit = SubmitField('Wyślij')
