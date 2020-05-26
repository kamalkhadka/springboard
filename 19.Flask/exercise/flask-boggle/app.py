from flask import Flask, render_template
from flask import session, request
from flask import jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "chicken"

boggle_game = Boggle()


@app.route("/")
def index():
    """
    Handle the root request to the app.
    Create a board and add to session.
    Create a session score to store highest score during session.
    Create a session played to store the number of times the gamed is played.
    """
    board = boggle_game.make_board()
    session["board"] = board
    session["score"] = session.get("score", 0)
    session["played"] = session.get("played", 0)
    return render_template("/index.html", board=session["board"], highest_score=session["score"], played=session["played"])


@app.route("/guess")
def handle_guess():
    """
    Handles user guess word and checks in board and send json response: { "result": result}
    Result is "ok" if guess word exist in board. 
    Result is "not-on-board" if guess word does not exist in board.
    Result is "not-word" if guess word is not a word
    """
    guess = request.args["guess"]
    result = check_valid_word(session["board"], guess)
    return jsonify({"result": result})


def check_valid_word(board, word):
    """
    This function checks if the word is valid or not
    """
    return boggle_game.check_valid_word(board, word)


@app.route("/score", methods=["POST"])
def handle_score():
    """
    Read json from request
    Compare score in json with score in session.
    Store higest score between those two in session
    Increase played by 1
    Send json response: {"score": session["score"], "played": session["played"]}
    """
    json = request.json
    session["score"] = json["score"] if int(json["score"]) > int(
        session["score"]) else session["score"]
    session["played"] = session.get("played", 0) + 1
    return jsonify({"score": session["score"], "played": session["played"]})
