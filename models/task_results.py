from app import db

class TestResult(db.Model):
    __tablename__ = 'test_results'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    selected_answer = db.Column(db.Text, nullable=False)
    correct_answer = db.Column(db.Text, nullable=False)
    task_version = db.Column(db.Integer, nullable=False)
    time_taken = db.Column(db.Integer, nullable=False)

    
    def __repr__(self):
        return f'<TestResult id={self.id}, user_id={self.user_id},  task_version={self.task_version}, time_taken={self.time_taken}, timestamp={self.timestamp}>'