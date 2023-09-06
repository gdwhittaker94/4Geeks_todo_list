import React, { useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);       // <li> Array
    const [itemValue, setItemValue] = useState("");     // <li> Item Content

    const listUpdate = () => {                          // Function to update todo list
        setTodoList([...todoList, itemValue]);          // Updates <li> array with new "itemValue"
        setItemValue("");                               // Resets input field 
    }
    
    const deleteItem = (index) => {                     // Function takes index value of li item (from below)
        const updatedTodoList = [...todoList];          // Creates variable and stores the current todoList as its value
        updatedTodoList.splice(index, 1);               // Takes out the item with the passed index value
        setTodoList(updatedTodoList);                   // Passes this function's variable as the <li> array value 
    }

    return (
        <>
            <input 
                type="text" 
                placeholder='Add a task...'    
                value={itemValue}                                                 // Value of input = value in "itemValue" variable = CONTROLLED INPUT = value controlled by React's state 
                onChange={(event) => setItemValue(event.target.value)}            // "itemValue" variable synced up with this input field's value 
                onKeyDown={(event) => {if(event.key === "Enter"){listUpdate()}}}  // Pressing Enter triggers function 
            />
            <ul>
                {todoList.length === 0? <Message/> : todoList.map((item, index) => (
                    <>  
                        <div className='listDiv'>
                            <li key={index} className='listItem'>{item}</li> 
                            <Delete onDelete={() => deleteItem(index)}/>
                        </div>
                    </>)
                    )
                }                                                               
            </ul>
        </> // Here the content of the <ul> is dynamically generated, with the .map() method creating <li> elements from the "todoList" array          
    )
}

export default TodoList 

// if (todoInput.trim() !== "") {  const addTodo = () => {}