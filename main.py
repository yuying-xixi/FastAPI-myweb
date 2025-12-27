from fastapi import FastAPI
from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from routers import notes_router, comment_router, user_router
from utils import markdown_filter
app = FastAPI()

# 注册静态文件目录
app.mount("/static", StaticFiles(directory="static"), name="static")

# 模板对象
templates = Jinja2Templates(directory="templates")
templates.env.filters["markdown"] = markdown_filter
app.state.templates = templates


# 注册路由
app.include_router(notes_router.router)

app.include_router(comment_router.router)

app.include_router(user_router.router)

@app.get("/")
async def root():
    return RedirectResponse(url="/static/html/login_api.html")
