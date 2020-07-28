import os
os.environ['DATABASE_URL'] = 'postgresql:///warbler-test'

from app import app
from unittest import TestCase

class TestViews(TestCase):