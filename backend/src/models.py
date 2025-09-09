from pydantic import BaseModel

class TodoMutable(BaseModel):
    id: int = None
    title: str
    content: str
    completed: bool = False

class Todo(BaseModel):
    id: int = None
    title: str
    content: str
    completed: bool = False
    