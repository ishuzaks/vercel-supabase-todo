import { createClient } from "@/lib/supabase/server";
import AuthForm from "./auth-form";
import { addTodo } from "./actions";
import TodoList from "./todo-list";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  const session = data?.session;

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <AuthForm />
      </main>
    );
  }

  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-md">
        <form action={addTodo} className="mb-6 flex items-center space-x-2">
          <input
            type="text"
            name="title"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="新しいTodoを追加"
          />
          <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
            追加
          </button>
        </form>
        <TodoList todos={todos || []} />
      </div>
    </main>
  );
}