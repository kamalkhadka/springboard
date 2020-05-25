from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "chicken"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)

# @app.before_request
# def test():
#     print(f"{session['responses']}")

@app.route("/")
def root():
    survey_title = satisfaction_survey.title
    return render_template("/index.html", survey_title = survey_title)

@app.route("/start", methods=["POST"])
def start_survey():
    session["responses"] = []
    return redirect(f"/questions/{len(session['responses'])}")

@app.route("/questions/<int:id>")
def get_question(id):
    
    responses_length = len(session["responses"])
    if id == responses_length:
        question = satisfaction_survey.questions[id].question
        choices = satisfaction_survey.questions[id].choices
        return render_template("/answer-question.html", question=question, choices = choices, id=id)
    elif responses_length == len(satisfaction_survey.questions):
        return redirect("/thank-you")
    else:
        flash("You are trying to access an invalid question")
        return redirect(f"/questions/{responses_length}")

@app.route("/answer", methods=["POST"])
def answer():
    answer = request.form["choice"]
    responses = session["responses"]
    responses.append(answer)
    session["responses"] = responses    
    if len(satisfaction_survey.questions) > len(responses):
        return redirect(f"/questions/{len(responses)}")
    return redirect("/thank-you")

@app.route("/thank-you")
def thank_you():
    return render_template("/thank-you.html")