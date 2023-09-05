import React, { useState } from 'react';

const TodoList = () => {
    
    const [todoList, setTodoList] = useState([]);       // List Array
    const [itemValue, setItemValue] = useState("")      // <li> Item Content

    const listUpdate = () => {
        setTodoList([...todoList, itemValue]);          // Updates array with new "itemValue"
        setItemValue("");                               // Resets input field 
    }
    
    return (
        <>
            <input 
                type="text" 
                value={itemValue}                                                   // Controlled input: value controlled by React's state 
                onChange={(event) => setItemValue(event.target.value)}              // Variable value in sync with input field value 
                onKeyDown={(event) => {if(event.key === "Enter"){listUpdate()}}}    // Pressing Enter triggers function 
            />
            <ul>                                                                    
                {todoList.map((item, index) => (<li key={index}>{item}</li>))}       
            </ul>
            <button>Borrar?</button>
        </>
        // <ul>: .map() to perform a function on each array item: create a <li> with each value inside todoList array.        
    )
}

export default TodoList 