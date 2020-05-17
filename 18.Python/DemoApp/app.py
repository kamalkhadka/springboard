from faker import Faker

fake = Faker()
for x in range(10):
    print(fake.name()) 