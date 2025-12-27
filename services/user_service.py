from sqlalchemy.orm import Session
from models import User
from datetime import datetime, timezone


class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_name: str, password: str, role: str = "user") -> User:
        from utils.security import hash_password
        user = User(
            user_name=user_name,
            user_password_hash=hash_password(password),
            role=role,
            user_create_time=datetime.now(timezone.utc)
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def authenticate(self, user_name: str, password: str) -> User | None:
        from utils.security import verify_password
        user = (
            self.db.query(User)
            .filter(User.user_name == user_name)
            .first()
        )
        if user and verify_password(password, user.user_password_hash):
            return user
        return None