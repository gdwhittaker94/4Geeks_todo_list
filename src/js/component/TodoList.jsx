import React, { useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);       // <li> Array
    const [itemValue, setItemValue] = useState("");     // <li> Item Content

    const listUpdate = () => {
        setTodoList([...todoList, itemValue]);          // Updates array with new "itemValue"
        setItemValue("");                               // Resets input field 
    }
    
    const deleteItem = (index) => {                     // Function takes index value of li item
        const updatedTodoList = [...todoList];          // Creates variable with current todoList
        updatedTodoList.splice(index, 1);               // Takes out the item with the passed index value
        setTodoList(updatedTodoList);                   // Updates "todoList" with value of this function's variable 
    }

    return (
        <>
            <input 
                type="text" 
                value={itemValue}                                                 // Controlled input: value controlled by React's state 
                onChange={(event) => setItemValue(event.target.value)}            // itemValue variable synced up with input field value 
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
        </>
        
        // <ul>: .map() to perform a function on each array item: create a <li> with each value inside todoList array.        
    )
}

export default TodoList 