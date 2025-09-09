import psycopg2
import os
from dotenv import load_dotenv
from src.models import Todo

load_dotenv()

conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
)
""")

def get_all_todos():
    cursor.execute("SELECT id, title, content, completed FROM todos")
    rows = cursor.fetchall()
    todos = [Todo(id=row[0], title=row[1], content=row[2], completed=row[3]) for row in rows]
    return todos

def get_todo_by_id(todo_id: int):
    cursor.execute("SELECT id, title, content, completed FROM todos WHERE id = %s", (todo_id,))
    row = cursor.fetchone()
    if row:
        return Todo(id=row[0], title=row[1], content=row[2], completed=row[3])
    return None

def add_todo(todo: Todo):
    cursor.execute(
        "INSERT INTO todos (title, content, completed) VALUES (%s, %s, %s) RETURNING id",
        (todo.title, todo.content, todo.completed)
    )
    new_id = cursor.fetchone()[0]
    conn.commit()
    todo.id = new_id
    return todo

def update_todo(todo_id: int, updated_todo: Todo):
    cursor.execute(
        "UPDATE todos SET title = %s, content = %s, completed = %s WHERE id = %s",
        (updated_todo.title, updated_todo.content, updated_todo.completed, todo_id)
    )
    conn.commit()
    if cursor.rowcount > 0:
        return updated_todo
    return None

def delete_todo(todo_id: int):
    cursor.execute("DELETE FROM todos WHERE id = %s RETURNING id, title, content, completed", (todo_id,))
    row = cursor.fetchone()
    conn.commit()
    if row:
        return Todo(id=row[0], title=row[1], content=row[2], completed=row[3])
    return None

conn.commit()
