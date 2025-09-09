from typing import Union, List
from src import todo_router


from fastapi import FastAPI, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app = FastAPI(
    title="Todo List API",
    description="A simple Todo List API built with FastAPI",
    version="1.0.0"
)

# Todo router
app.include_router(todo_router.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail":" Invalid request", "errors": exc.errors()},
    )