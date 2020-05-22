from flask import Flask, request, render_template
from stories import story

app = Flask(__name__)


@app.route("/")
def home():
    prompts = story.prompts
    return render_template("index.html", prompts=prompts)

@app.route("/story")
def get_story():
    args = request.args
    return render_template("story.html", story=story.generate(args))
