from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

app = Flask(__name__)

app.config['SECRET_KEY'] = "chicken"
debug = DebugToolbarExtension(app)


@app.route("/")
def home_page():
    html = """
        <html>
            <body>
                <h1>Home page</h1>
                <p>Welcome to my simple app!</p>
                <a href="/hello">Go to hello page</a>
            </body>
        </html>
    """
    return html


@app.route("/form")
def show_form():
    return render_template("form.html")


@app.route("/form-2")
def show_form_2():
    return render_template("form_2.html")


COMPLIMENTS = [
    "cool", "clever", "tenacious", "awesome", "Pythonic"
]


@app.route("/greet")
def get_greeting():
    username = request.args["username"]
    return render_template("greet.html", username=username, compliment=choice(COMPLIMENTS))


@app.route("/greet-2")
def get_greeting_2():
    username = request.args["username"]
    wants = request.args.get("wants_compliments")
    nice_things = sample(COMPLIMENTS, 3)
    return render_template("/greet_2.html", username=username, wants_compliments=wants, compliments=nice_things)


@app.route("/lucky")
def lucky_number():
    num = randint(1, 10)
    return render_template("lucky.html", lucky_num=num)


@app.route("/hello")
def say_hello():
    """Show Hello page"""
    return render_template("hello.html")


@app.route("/spell/<word>")
def spell_word(word):
    return render_template("spell_word.html", word=word)


@app.route("/goodbye")
def say_bye():
    return "GOOD BYE"


@app.route("/search")
def search():
    term = request.args["term"]
    sort = request.args["sort"]
    return f"<h1>Search results For: {term}</h1><p>Sorting by : {sort}</p>"


@app.route('/add-comment')
def add_comment_form():
    return """
    <h1>Add Comment</h1>
    <form method="POST">
        <input type="text" placeholder="comment" name="comment"/>
         <input type="text" placeholder="username" name="username"/>
        <button>Submit</button>
    </form>
    """


@app.route("/add-comment", methods=["POST"])
def save_comment():
    comment = request.form["comment"]
    username = request.form["username"]
    return f"""
    <h1>SAVED YOUR COMMENT</h1>
    <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment}</li>
    </ul>
    """


@app.route("/r/<subreddit>")
def show_subreddit(subreddit):
    return f"<h1>Browing the {subreddit} subreddit</h1>"


@app.route("/r/<subreddit>/comments/<int:post_id>")
def show_comment(subreddit, post_id):
    return f"Viewing comments for post with id: {post_id} from the {subreddit} Subreddit"


POSTS = {
    1: "I like chicken tenders",
    2: "I hate mayo!",
    3: "Double rainbow all the way",
    4: "YOLO OMG (kill me)"
}


@app.route("/posts/<int:id>")
def find_post(id):
    post = POSTS.get(id, "Post not found")
    return f"<p>{post}</p>"
