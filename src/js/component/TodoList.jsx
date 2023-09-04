import React, { useState } from 'react';

const TodoList = () => {
    
    const [input, setInput] = useState("")

    const createTask = (input) => {
        return <li>{input}</li>
    }

    return (
        <>
            <input type="text" onKeyDown={(event) => {if(event.key === "Enter") setInput(event.target.value) value={input}}}/>
            <ul>
                {createTask}
            </ul>
            <button>Borrar?</button>
        </>
       
    )
}

export default TodoList 