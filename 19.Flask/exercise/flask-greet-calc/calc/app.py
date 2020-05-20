# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

@app.route("/add")
def add():
    a = request.args.get("a")
    b = request.args.get("b")
    return str(operations.add(int(a), int(b)))

@app.route("/sub")
def sub():
    a = request.args.get("a")
    b = request.args.get("b")
    return str(operations.sub(int(a), int(b)))

@app.route("/mult")
def mult():
    a = request.args.get("a")
    b = request.args.get("b")
    return str(operations.mult(int(a), int(b)))

@app.route("/div")
def div():
    a = request.args.get("a")
    b = request.args.get("b")
    return str(operations.div(int(a), int(b)))

@app.route("/math/<operation>")
def operate(operation):
    a = int(request.args["a"])
    b = int(request.args["b"])
    if operation == "add":
        return str(operations.add(a, b))
    elif operation == "sub":
        return str(operations.sub(a, b))
    elif operation == "mult":
        return str(operations.mult(a, b))
    elif operation == "div":
        return str(operations.div(a, b))
    else:
        return f"{operation} is not supported operation"
