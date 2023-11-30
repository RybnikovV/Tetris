from fastapi import FastAPI
# import uvicorn
from starlette.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory="build", html=True))


@app.get('/test/{x}')
def test(x: int) -> str:
    """
    Хуй
    """
    return str(x)


# if __name__ == "__main__":
#     uvicorn.run("www.main:app", host="192.168.1.33", port=8000, reload=True)