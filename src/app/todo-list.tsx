'use client';

import type { Database } from "@/lib/database.types";
import { updateTodo, deleteTodo } from "./actions";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id} className="mb-3 flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => updateTodo(todo.id, !todo.is_completed)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className={`ml-3 text-xl ${todo.is_completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {todo.title}
            </span>
          </div>
          <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700 transition duration-200 flex items-center space-x-1 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>削除</span>
            </button>
        </li>
      ))}
    </ul>
  );
}