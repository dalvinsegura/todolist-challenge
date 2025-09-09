from src.models import Todo, TodoMutable
from src.todoRepository import (
    get_all_todos as db_get_all_todos,
    get_todo_by_id as db_get_todo_by_id,
    add_todo as db_add_todo,
    update_todo as db_update_todo,
    delete_todo as db_delete_todo
)


    
def get_all_todos():
    return db_get_all_todos()

def get_todo_by_id(todo_id: int):
    return db_get_todo_by_id(todo_id)

def add_todo(todo: TodoMutable):
    todos = db_get_all_todos()
    new_id = max([t.id for t in todos], default=0) + 1
    todo.id = new_id
    db_add_todo(todo)
    return todo

def update_todo(todo_id: int, updated_todo: Todo):
    return db_update_todo(todo_id, updated_todo)

def delete_todo(todo_id: int):
    return db_delete_todo(todo_id)
