from dependencies import  SessionLocal
from sqlalchemy import text

from services.notes_service import get_notes_by_title

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

# get_notes_by_title 测试
# db = SessionLocal()
# try:
#     title = '信息安全期末总结'
#     notes = get_notes_by_title(db, title)
#     print("查询结果：", notes)
#     for note in notes:
#         print("ID:", note.note_id)
#         print("标题:", note.note_title)
#         print("内容:", note.note_content)
# except Exception as e:
#     print("查询失败：", e)
# finally:
#     db.close()