def print_upper_words(words):
    """Capitalize list of words and print them in separate line""" 
    for word in words:
        word = word.upper()
        print(word)

def print_upper_words_e(words):
    """Capitalize word that starts with e or E"""
    for word in words:
        if word.startswith("e") or word.startswith("E"):
            print(word.upper())

def print_upper_words_must_start_with(words, must_start_with):
    for word in words:
        for start_with in must_start_with:
            if word.startwith(start_with):
                print(word.upper())
                break