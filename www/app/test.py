from www.main import app


@app.get('/test')
def test(x: int) -> int:
    return x

