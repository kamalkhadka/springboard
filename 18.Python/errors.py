
def get_days_alive(person):
    try:
        days = person["age"] * 365
        print(f"{person['name']} have been alive for {days} days")
    except KeyError as exc:
        print(f"Missing key: {exc}")
    except TypeError:
        print("Expected person to be dictionary")
    except:
        print("Something else went wrong")

# LBYL - look before you leap
# EAFP - easier to ask for forgiveness rather than permission
