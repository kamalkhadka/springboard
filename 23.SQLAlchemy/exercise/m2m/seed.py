from models import User, Post, Tag, PostTag, db
from app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.drop_all()
db.create_all()

# Make users
user1 = User(first_name='Kamal',last_name='Khadka', image_url='http://placehold.jp/150x150.png')
user2 = User(first_name='lamak',last_name='akdaha', image_url='http://placehold.jp/150x150.png')
user3 = User(first_name='Mal',last_name='ka', image_url='http://placehold.jp/150x150.png')

db.session.add_all([user1, user2, user3])
db.session.commit()

# Make posts
post1 = Post(title='Test Post 1', content='Hello World! 1', user_id = user1.id)
post2 = Post(title='Test Post 2', content='Hello World! 2', user_id = user2.id)
post3 = Post(title='Test Post 3', content='Hello World! 3', user_id = user3.id)
post4 = Post(title='Test Post 4', content='Hello World! 4', user_id = user1.id)
post5 = Post(title='Test Post 5', content='Hello World! 5', user_id = user2.id)

db.session.add_all([post1, post2, post3, post4, post5])
db.session.commit()

# Make tags
tag1 = Tag(name='tag1')
tag2 = Tag(name='tag2')
tag3 = Tag(name='tag3')

db.session.add_all([tag1, tag2, tag3])
db.session.commit()


# Make post_tag
p1t1 = PostTag(post_id=1, tag_id=1)
p1t2 = PostTag(post_id = 1, tag_id = 2)
p1t3 = PostTag(post_id = 1, tag_id = 3)

db.session.add_all(p1t3)

db.session.commit()