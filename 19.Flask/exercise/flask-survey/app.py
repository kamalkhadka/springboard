from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "chicken"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)

responses = []

@app.route("/")
def root():
    survey_title = satisfaction_survey.title
    return render_template("/index.html", survey_title = survey_title)

@app.route("/questions/<int:id>")
def get_question(id):
    question = satisfaction_survey.questions[id].question
    choices = satisfaction_survey.questions[id].choices
    return render_template("/answer-question.html", question=question, choices = choices, id=id)

@app.route("/answer", methods=["POST"])
def answer():
    id = request.form["id"]
    id = int(id) + 1
    if len(satisfaction_survey.questions) > id:
        answer = request.form["choice"]
        responses.append(answer)
        return redirect(f"/questions/{str(id)}")
    return render_template("/thank-you.html")