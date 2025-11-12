import database.database as db
session, engine = db.getconnection()

def get_db():
    db = session()
    try:
        return db
    finally:
        db.close()
        
def get_engine():
    return engine
