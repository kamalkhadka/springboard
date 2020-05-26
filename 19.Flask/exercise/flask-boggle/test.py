from unittest import TestCase
from app import app
from flask import session, request
from boggle import Boggle

app.config["TESTING"] = True

board = Boggle().make_board()


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_start_page(self):
        """
        1. Test we can get to root of website
        2. Test session board is initialized
        3. Test session score is initialized to 0
        4. Test session played is initialized to 0 
        """
        with app.test_client() as client:
            resp = client.get("/")
            self.assertEqual(resp.status_code, 200)
            self.assertIsNotNone(session["board"])
            self.assertEqual(session["score"] ,0)
            self.assertEqual(session["played"], 0)

    def test_post_guess(self):
        """
        Test for guess submission
        Build session with board value
        Send a get request to /guess with query param guess with random value
        Check we receive json response back
        Check the response back is among one of the expected value 
        """
        expected_output = ["ok", "not-on-board", "not-word"]
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["board"] = board
            test_word = "pop"
            res = client.get(f"/guess?guess={test_word}")
            json = res.json
            self.assertEqual(res.status_code, 200)
            self.assertIn(json["result"], expected_output)


    def test_handle_score(self):
        """
        Build json with user current score to post to /score
        Set score and played value session
        Send post request and check response status code is 200
        Check session for score and played
        Checked returned json for score
        """
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["score"] = 4
                change_session["played"] = 1
            res = client.post("/score", json={"score" : 3})
            self.assertEqual(res.status_code, 200)
            self.assertTrue(res.is_json)
            self.assertEqual(session["score"], 4)
            self.assertEqual(session["played"], 2)
            self.assertEqual(res.json["score"], 4)

        

