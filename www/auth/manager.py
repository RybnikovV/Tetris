from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin, exceptions, models, schemas

from www.auth.models import User, get_user_db

from www.config import SECRET_HASH_PASSWORD


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    # Надо будет определить validate_password
    reset_password_token_secret = SECRET_HASH_PASSWORD
    verification_token_secret = SECRET_HASH_PASSWORD


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
