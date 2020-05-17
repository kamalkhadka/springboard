from random import randint, choice

def get_rand_year():
    return randint(1990, 2020)

def get_rand_month():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"
    "Aug", "Sep", "Oct", "Nov", "Dec"]
    return choice(months)
