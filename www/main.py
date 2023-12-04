from fastapi import FastAPI, Request

from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from www.auth.config import router_backend as auth_router_backend
from www.auth.config import router_crud as auth_router_crud

app = FastAPI()

app.include_router(
    auth_router_backend,
    prefix="/auth",
    tags=["Auth"],
)
app.include_router(
    auth_router_crud,
    prefix="/auth",
    tags=["Auth"],
)

app.mount("/static", StaticFiles(directory="build", html=True), 'static')
templates = Jinja2Templates(directory="build")


@app.get("/{rest_of_path:path}")
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse(rest_of_path or 'index.html', {'request': req})
