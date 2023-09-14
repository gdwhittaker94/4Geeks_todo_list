import React, { useEffect, useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    
    // TODO LIST VARIABLES
    const [todoList, setTodoList] = useState([]);         // <li> Array
    const [itemValue, setItemValue] = useState("");       // <li> Item Content
    const url = "https://playground.4geeks.com/apis/fake/todos/user/elLordInglés" //My User URL


    // TODO LIST USEEFFECTS

    useEffect(() => {                                   
        getData()                                         // On component mount, call 'getData' function
    }, [])
    

    const getData = () => {                               // Fetching Data using Fetch API 
        fetch(url)                                        // Fetch endpoint 
        .then(response => {if(!response.ok){createUser()} // If ok property of object = false, call 'createUser' function   
            return response.json()})                      // Else, if = true, create 2nd Promise that resolves with the result of converting the response body plaintext to JSON 
        .then(data => setTodoList(data))                  // With this JSON data now available to use (an array full of objects), update todoList with it. 
        .catch(error => console.log(error))               // In case Promise is rejected 
    }  

    const createUser = () => {                            // Function to create user in API if not already present
        fetch(url, {                                      // Fetch endpoint + Fetch init object to adjust settings of fetch
            method: "POST",                               // POST = Create
            headers: {                                    // Headers = meta-data/additional info about our request 
                "Content-Type": "application/json"        // Indicates the type of data being sent in the request body to the server.    
            },
            body: JSON.stringify([])                      // The request body (an empty JSON array) and this method converts the empty array into a JSON string (so the server can use it).
        })
        .then(response => response.json())                // If the request is successful, create 2nd Promise that resolves with the result of converting the response body plaintext to JSON
        .then(data => setTodoList(data))                  // With this JSON data now available to use (an array full of objects), update todoList with it. 
        .catch(error => console.log(error))               // In case Promise is rejected
    }


    useEffect(() => {                                     // Whenever the todoList changes, call 'updateTodoList' function
        updateTodoList()                            
    }, [todoList])


    const updateTodoList = () => {                        // This function sends a request to update the endpoint
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoList)                // Updates endpoint with current todoList (converted into plaintext)
        })
    }


    const listUpdate = () => {                            // Function to update todoList
        if(itemValue.trim() !== ""){                      // As long as "itemValue" doesn't = empty, do the following: 
            const newItem = {label: itemValue};           // Create a variable whose value = an object with a property called 'label' whose value is whatever the user has put in the input box 
            setTodoList([...todoList, newItem]);          // Takes current array and adds the object from 'newItem' to it
            setItemValue("");                             // Resets input field
        }                             
    }                                                     // NB: The variable value is an object because the API deals in objects
    
    const deleteItem = (index) => {                       // Function takes index value of li item (from below)
        const updatedTodoList = [...todoList];            // Creates variable and stores the current todoList as its value
        updatedTodoList.splice(index, 1);                 // Takes out the item with the passed index value
        setTodoList(updatedTodoList);                     // Passes this function's variable as the <li> array value 
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