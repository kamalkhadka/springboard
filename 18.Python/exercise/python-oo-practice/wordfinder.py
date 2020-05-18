"""Word Finder: finds random words from a dictionary."""
from random import randint


class WordFinder:

    def __init__(self, path):
        self.words= self.read_words_from_file(path)
        print(f"{len(self.words)} words read")

    def read_words_from_file(self, path):
        words = []
        with open(path, "r") as f:
            words = f.read().splitlines()
        return words

    def random(self):
        return self.words[randint(0, len(self.words))]
