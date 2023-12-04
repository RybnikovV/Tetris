from fastapi_users import FastAPIUsers
from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from fastapi_users.authentication import JWTStrategy

from www.auth.manager import get_user_manager
from www.auth.models import User
from www.config import SECRET_AUTH
from www.auth.schemas import UserRead, UserCreate

cookie_transport = CookieTransport(cookie_name="tetris_session", cookie_max_age=60*60*3)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET_AUTH, lifetime_seconds=60*60*3)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user()

router_backend = fastapi_users.get_auth_router(auth_backend)
router_crud = fastapi_users.get_register_router(UserRead, UserCreate)
