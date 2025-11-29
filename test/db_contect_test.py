from database import  SessionLocal
from sqlalchemy import text


# 创建一个 Session
db = SessionLocal()
try:
    # 执行原生 SQL 验证连接
    result = db.execute(text("SELECT 1"))
    print("数据库连接成功，返回：", result.scalar())
except Exception as e:
    print("数据库连接失败：", e)
finally:
    db.close()

