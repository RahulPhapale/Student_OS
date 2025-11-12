import configparser
import database.database as db

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

# Call getconnection with the parsed configuration
session, engine = db.getconnection()
