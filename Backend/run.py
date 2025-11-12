import uvicorn
import os
import multiprocessing

API_PORT = int(os.getenv('API_PORT', 8000))
if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run("backend:app", host="0.0.0.0", port=API_PORT, log_level="info", reload=False)
