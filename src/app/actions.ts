"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (user) {
    await supabase.from("todos").insert({ title, user_id: user.id });
    revalidatePath("/");
  }
}

export async function updateTodo(id: number, is_completed: boolean) {
  const supabase = createClient();
  await supabase.from("todos").update({ is_completed }).match({ id });
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  const supabase = createClient();
  await supabase.from("todos").delete().match({ id });
  revalidatePath("/");
}
