'use client'

import { updateTodo } from "@/lib/actions";
import React, {useOptimistic, useTransition} from 'react'
import { Todo } from "./TodoList";

const Checkbox = ({ todo }: { todo: Todo}) => {
    //const [isPending, startTransition] = useTransition();
    const [optimisticTodo, addOptimisticTodo] = useOptimistic(
        todo, 
        (state: Todo, completed: boolean) => ({...state, completed})
        );
  return (
    <input
        type="checkbox"
        checked={optimisticTodo.completed}
        id="completed"
        name="completed"
        onChange={ async () => {
            addOptimisticTodo(!todo.completed);
            await updateTodo(todo);
        }}
        //disabled={isPending}
        className="min-w-[2rem] min-h-[2rem]"    
    />
  )
}

export default Checkbox
