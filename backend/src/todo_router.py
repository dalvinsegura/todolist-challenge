from fastapi import APIRouter, HTTPException, status
from typing import List

from src.models import Todo, TodoMutable
from src.service import get_all_todos, get_todo_by_id, delete_todo, add_todo, update_todo

router = APIRouter(prefix="/todo", tags=["Todos"])


@router.get("/", response_model=List[Todo], status_code=status.HTTP_200_OK)
def get_todos():
    return get_all_todos()

@router.get("/{todo_id}", response_model=Todo, status_code=status.HTTP_200_OK)
def read_todo(todo_id: int):
    todo = get_todo_by_id(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.post("/", response_model=TodoMutable, status_code=status.HTTP_201_CREATED)
def post_todo(todo: TodoMutable):
    created_todo = add_todo(todo)
    return created_todo

@router.put('/{todo_id}', response_model=Todo, status_code=status.HTTP_200_OK)
def update_todo_endpoint(todo_id: int, todo: TodoMutable):
    updated_todo = update_todo(todo_id, todo)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo

@router.delete("/{todo_id}", response_model=Todo, status_code=status.HTTP_200_OK)
def delete_todo_endpoint(todo_id: int):
    deleted_todo = delete_todo(todo_id)
    if not deleted_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return deleted_todo
