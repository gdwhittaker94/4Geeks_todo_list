import React, { useEffect, useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    
    // TODO LIST VARIABLES
    const [todoList, setTodoList] = useState([]);       // <li> Array
    const [itemValue, setItemValue] = useState("");     // <li> Item Content
    const url = "https://playground.4geeks.com/apis/fake/todos/user/elLordInglés" //My User URL


    // TODO LIST USEEFFECTS
    useEffect(() => {
        getDataFetch()
    }, [])

    useEffect(() => {
        updateTodoList()
    }, [todoList])


    // TODO LIST FUNCTIONS
    const getDataFetch = () => {                        // Data Fetch - fetch Version
        fetch(url)
        .then(response => {if(!response.ok){createUser()} 
            return response.json()})                    // If Promise is fulfilled, turn received plain-text into JSON so JS can read it 
        .then(data => setTodoList(data))                // Update todo list with data received from API
        .catch(error => console.log(error))             // In case Promise is rejected 
    }

    const createUser = () => {                          // Function to create user in API if not already present
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([])
        })
        .then(response => response.json())           
        .then(data => setTodoList(data))                
        .catch(error => console.log(error))
    }

    const updateTodoList = () => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoList)
        })
    }

    const listUpdate = () => {                          // Function to update todo list
        if(itemValue.trim() !== ""){                    // As long as "itemValue" doesn't = empty, do the following: 
            const newItem = {label: itemValue};
            setTodoList([...todoList, newItem]);        // Takes current array and adds current "itemValue" to it
            setItemValue("");                           // Resets input field
        }                             
    }
    
    const deleteItem = (index) => {                     // Function takes index value of li item (from below)
        const updatedTodoList = [...todoList];          // Creates variable and stores the current todoList as its value
        updatedTodoList.splice(index, 1);               // Takes out the item with the passed index value
        setTodoList(updatedTodoList);                   // Passes this function's variable as the <li> array value 
    }


    //TODO LIST DISPLAY
    return (
        <>
            <input 
                type="text" 
                placeholder='Add a task...'    
                value={itemValue}                                                 // Value of input = value in "itemValue" variable = CONTROLLED INPUT = value controlled by React's state 
                onChange={(event) => setItemValue(event.target.value)}            // "itemValue" variable synced up with input field's value 
                onKeyDown={(event) => {if(event.key === "Enter"){listUpdate()}}}  // Pressing Enter triggers useState updater function 
            />
            <ul>
                {todoList.length === 0? <Message/> : todoList.map((item, index) => (
                    <>  
                        <div className='listDiv' key={index}>
                            <li className='listItem'>{item.label}</li>
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