import { Request, Response } from "express";
import { Database } from "sqlite";
import { Todo } from "../types";

const jwt = require("jsonwebtoken");
export function generateAccessToken(user_id: any) {
  return jwt.sign({ user_id: user_id }, process.env.TOKEN_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRY });
}

export async function createTodoServer(req: Request, res: Response, db: Database) {
  const userId = req.body.user_id;
  const { id, content, completed } = req.body;

  // check if content and id exists
  if (!content || !id) {
    return res.status(400).send({ error: "Missing required field: content" });
  }

  try {
    await db.run("INSERT INTO todolist (id, content, completed, user_id) VALUES (?, ?, ?, ?);", [
      id,
      content,
      completed,
      userId,
    ]);
  } catch (error) {
    return res.status(400).send({ error: `Todo item could not be created, + ${error}` });
  }

  res.status(201).send({ content, completed });
}

export async function deleteTodo(req: Request, res: Response, db: Database) {
  const todoId = req.params.id;
  const todoItem = await db.get("SELECT * FROM todolist WHERE id = ?;", [todoId]);

  // check if todo item exists
  if (!todoItem) {
    return res.status(404).send({ error: "Todo Item not found" });
  }

  await db.run("DELETE FROM todolist WHERE id = ?;", [todoId]);
  res.status(200).send({ message: "Todo Item deleted" });
}

export async function updateTodo(req: Request, res: Response, db: Database) {
  const todoId = req.params.id;
  let completed = req.body.completed;

  completed = completed ? 1 : 0;

  const todoItem = await db.get("SELECT * FROM todolist WHERE id = ?;", [todoId]);

  // Check if the todo item exists
  if (!todoItem) {
    return res.status(404).send({ error: "Todo Item not found" });
  }

  await db.run("UPDATE todolist SET completed = ? WHERE id = ?;", [completed, todoId]);
  res.status(200).send({ message: "Todo updated successfully", id: todoId, completed });
}

export async function getTodoList(req: Request, res: Response, db: Database) {
  const userId = req.body.user_id;
  const todoList = await db.all("SELECT * FROM todolist WHERE user_id = ?;", [userId]);
  res.status(200).send({ data: todoList });
}
