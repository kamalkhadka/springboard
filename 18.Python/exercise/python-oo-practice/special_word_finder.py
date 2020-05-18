from wordfinder import WordFinder


class SpecialWordFinder(WordFinder):
    def __init__(self, path):
        super().__init__(path)
        self.words = [word for word in self.words if word.isalpha()]
        
