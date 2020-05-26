from unittest import TestCase
from boggle import Boggle

class BoogleTestCase(TestCase):

    def test_make_board(self):
        boggle = Boggle()
        board = boggle.make_board()
        self.assertIsInstance(board, list)
        self.assertEqual(len(board), 5)