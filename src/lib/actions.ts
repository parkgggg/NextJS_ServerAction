'use server';

import { Todo } from "@/app/components/TodoList";
import { revalidatePath } from "next/cache";
import sleep from "./sleep";

//서버 액션은 사용할 "서버 컴포넌트" 내부에서 or 별도의 파일을 만들어서(재사용 가능) 정의 가능
//이번은 후자의 경우
//외부 컴포넌트에서 불러서 사용("use client" 지시문 빼먹으면 안 됨)

export async function addTodo(data: FormData) {
    const title = data.get('title');
    await fetch('http://localhost:3002/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: 1, title, completed: false
        })
    })

    revalidatePath('/')
}

export async function deleteTodo(todo: Todo){
    const res = await fetch(`http://localhost:3001/todos${todo.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: todo.id,
        })
    })
    await res.json();
    revalidatePath('/')
}

export async function updateTodo(todo: Todo){
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...todo, completed: !todo.completed
        })
    }
    )
    await res.json();
    await sleep(2000);
    revalidatePath('/')

}