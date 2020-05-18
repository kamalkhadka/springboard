from math import sqrt
from random import randint


class Triangle:
    """
    A class used to represent a right triangle
    Attrributes:
    ------------
    a: int
        length of side a
    b: int
        length of side b
    """

    def __init__(self, a, b):
        self.a = a
        self.b = b

    def __repr__(self):
        return f"Triangle(a={self.a}, b={self.b})"

    def __str__(self):
        return self.describe()

    def __eq__(self, other):
        return self.a == other.a and self.b == other.b

    @classmethod
    def random(cls):
        """Class method which returns Triangel with random sides"""
        return cls(randint(1, 20), randint(1, 20))

    def get_hypotenuse(self):
        """Calculates hypotenuse (3rd side of right triangle)"""
        return sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        return self.a * self.b / 2

    def describe(self):
        return f"I am a triangle with sides: {self.a} & {self.b}"
