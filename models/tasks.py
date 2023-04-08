from app import db

class Tasks(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    task_text = db.Column(db.String)
    option1 = db.Column(db.String)
    option2 = db.Column(db.String)
    option3 = db.Column(db.String)
    option4 = db.Column(db.String)
    correct_answer = db.Column(db.String)

    def __repr__(self):
        return f"<Task(id={self.id}, task_text='{self.task_text}', option1='{self.option1}', option2='{self.option2}', option3='{self.option3}', option4='{self.option4}', correct_answer='{self.correct_answer}')>"
  
