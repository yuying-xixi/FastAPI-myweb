# 本地MySQL数据库连接

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


DATABASE_URL = "mysql+pymysql://yvying_xixi:2005@localhost/MyWebNote"

'''
engine 是 SQLAlchemy 和数据库之间的桥梁。
pool_pre_ping=True：在使用连接前先 ping 数据库，防止长时间空闲导致连接失效。
'''
# 创建数据库引擎
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

'''
autocommit=False：关闭自动提交，需要手动 commit()。
autoflush=False：关闭自动刷新，可以自己控制何时 flush。
bind=engine：绑定到刚创建的数据库引擎。
'''
# Session 工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 基类
Base = declarative_base()

# 依赖注入
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


