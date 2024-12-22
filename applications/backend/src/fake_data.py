import random
from faker import Faker
from bson import ObjectId
from pymongo import MongoClient

fake = Faker()

# Configuration
NUM_DOCS = {
    "users": 100,
    "projects": 50,
    "threads": 30,
    "messages": 200,
    "programs": 20,
    "match_suggestions": 40,
    "colonies": 30,
}

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["fdata"]

def generate_users():
    users = []
    for _ in range(NUM_DOCS["users"]):
        user = {
            "_id": ObjectId(),
            "name": fake.name(),
            "email": fake.unique.email(),
            "profileInfo": {
                "bio": fake.text(max_nb_chars=100),
                "skills": [fake.word() for _ in range(random.randint(1, 5))],
                "interests": [fake.word() for _ in range(random.randint(1, 5))],
                "portfolio_links": [fake.url() for _ in range(random.randint(1, 3))],
            },
            "faction": random.choice(["Alpha", "Beta", "Gamma", None]),
            "projects": [],
        }
        users.append(user)
    return users

def generate_projects(users):
    projects = []
    for _ in range(NUM_DOCS["projects"]):
        project = {
            "_id": ObjectId(),
            "title": fake.sentence(nb_words=3),
            "description": fake.text(max_nb_chars=200),
            "status": random.choice(["open", "in-progress", "completed"]),
            "tags": [fake.word() for _ in range(random.randint(1, 5))],
            "skillsNeeded": [fake.word() for _ in range(random.randint(1, 5))],
            "deadline": fake.date_time_this_year(),
            "duration": f"{random.randint(1, 12)} months",
            "projectType": random.choice(["short-term", "long-term"]),
            "remote": random.choice([True, False]),
            "location": fake.city() if random.choice([True, False]) else None,
            "createdBy": random.choice(users)["_id"],
            "interestedUsers": [],
            "team": [],
            "threadId": None,
        }
        projects.append(project)
    return projects

def generate_threads(projects, users):
    threads = []
    for _ in range(NUM_DOCS["threads"]):
        thread = {
            "_id": ObjectId(),
            "projectId": random.choice(projects)["_id"],
            "participants": [random.choice(users)["_id"] for _ in range(random.randint(1, 5))],
            "title": fake.sentence(nb_words=5),
            "createdAt": fake.date_time_this_year(),
        }
        threads.append(thread)
    return threads

def generate_messages(threads, users):
    messages = []
    for _ in range(NUM_DOCS["messages"]):
        message = {
            "_id": ObjectId(),
            "threadId": random.choice(threads)["_id"],
            "sender": random.choice(users)["_id"],
            "content": fake.text(max_nb_chars=200),
            "timestamp": fake.date_time_this_year(),
        }
        messages.append(message)
    return messages

def generate_programs():
    programs = []
    for _ in range(NUM_DOCS["programs"]):
        program = {
            "_id": ObjectId(),
            "title": fake.sentence(nb_words=3),
            "description": fake.text(max_nb_chars=200),
            "duration": f"{random.randint(1, 12)} months",
            "goals": [fake.sentence(nb_words=6) for _ in range(random.randint(1, 3))],
            "photos": [fake.image_url() for _ in range(random.randint(1, 5))],
            "videos": [fake.url() for _ in range(random.randint(1, 3))],
        }
        programs.append(program)
    return programs

def generate_match_suggestions(users, projects):
    match_suggestions = []
    for _ in range(NUM_DOCS["match_suggestions"]):
        suggestion = {
            "_id": ObjectId(),
            "userId": random.choice(users)["_id"],
            "projectSuggestions": [random.choice(projects)["_id"] for _ in range(random.randint(1, 5))],
            "teammateSuggestions": [random.choice(users)["_id"] for _ in range(random.randint(1, 3))],
        }
        match_suggestions.append(suggestion)
    return match_suggestions

def generate_colonies(users, projects):
    colonies = []
    for _ in range(NUM_DOCS["colonies"]):
        colony = {
            "_id": ObjectId(),
            "title": fake.sentence(nb_words=3),
            "url": fake.url(),
            "category": random.choice(["Technology", "Science", "Art", "Education"]),
            "tags": [fake.word() for _ in range(random.randint(1, 5))],
            "projects": [random.choice(projects)["_id"] for _ in range(random.randint(1, 5))],
        }
        colonies.append(colony)
    return colonies

def main():
    # Generate data
    users = generate_users()
    projects = generate_projects(users)
    threads = generate_threads(projects, users)
    messages = generate_messages(threads, users)
    programs = generate_programs()
    match_suggestions = generate_match_suggestions(users, projects)
    colonies = generate_colonies(users, projects)

    # Insert data into MongoDB
    db.users.insert_many(users)
    db.projects.insert_many(projects)
    db.threads.insert_many(threads)
    db.messages.insert_many(messages)
    db.programs.insert_many(programs)
    db.match_suggestions.insert_many(match_suggestions)
    db.colonies.insert_many(colonies)

    print("Data generation complete.")

if __name__ == "__main__":
    main()
