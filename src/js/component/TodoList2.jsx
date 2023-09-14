import React, { useEffect, useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    
    // TODO LIST VARIABLES
    const [todoList, setTodoList] = useState([]);         // <li> Array
    const [itemValue, setItemValue] = useState("");       // <li> Item Content
    const [userList, setUserList] = useState([]);
    const [userValue, setUserValue] = useState("");       // New User 
    const [toggleUsers, setToggleUsers] = useState(true);
    const allUserUrl = "https://playground.4geeks.com/apis/fake/todos/user/" //My User URL

    // TODO LIST USEEFFECTS

    useEffect(() => {                                   
        getAllUsers()                                         // On component mount, call 'getData' function
    }, [])
    

    /* TODO 
    - When we select user we fetch their data (todolist) + hide user list 
    - Display their data on screen 
    - Add input to create user
    */

    const getAllUsers = async () => {
        const userResponse = await fetch(allUserUrl);
        const allUserData = await userResponse.json();
        setUserList(allUserData);
    }

    const getListItems = (value) => {                               // Fetching Data using Fetch API 
        fetch(`${allUserUrl}${value}`)                                        // Fetch endpoint 
        .then(response => response.json())                      // Else, if = true, create 2nd Promise that resolves with the result of converting the response body plaintext to JSON 
        .then(data => setTodoList(data))                  // With this JSON data now available to use (an array full of objects), update todoList with it. 
        .catch(error => console.log(error))               // In case Promise is rejected 
        setToggleUsers(false)
    }  

    const createNewUser = () => {                            // Function to create user in API if not already present
        fetch(`${allUserUrl}${userValue}`, {                                      // Fetch endpoint + Fetch init object to adjust settings of fetch
            method: "POST",                               // POST = Create
            headers: {                                    // Headers = meta-data/additional info about our request 
                "Content-Type": "application/json"        // Indicates the type of data being sent in the request body to the server.    
            },
            body: JSON.stringify([])                      // The request body (an empty JSON array) and this method converts the empty array into a JSON string (so the server can use it).
        }).catch((e) => console.log(e))
                                                            // If the request is successful, create 2nd Promise that resolves with the result of converting the response body plaintext to JSON
     
        setUserList([userValue, ...userList])                  // With this JSON data now available to use (an array full of objects), update todoList with it. 
    }


    const updateTodoList = (itemValue) => {   
        // Todo replace jim with userName
        fetch(`${allUserUrl}jim`, {
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
            setItemValue("");   
            updateTodoList(itemValue)                          // Resets input field
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
             placeholder='Create New User...'    
             value={userValue}                                                     // Value of input = value in "userValue" variable = CONTROLLED INPUT = value controlled by React's state 
             onChange={(event) => setUserValue(event.target.value)}                // "userValue" variable synced up with input field's value 
             onKeyDown={(event) => {if(event.key === "Enter"){createNewUser()}}} 
            />
            <input 
                type="text" 
                placeholder='Add a task...'    
                value={itemValue}                                                 // Value of input = value in "itemValue" variable = CONTROLLED INPUT = value controlled by React's state 
                onChange={(event) => setItemValue(event.target.value)}            // "itemValue" variable synced up with input field's value 
                onKeyDown={(event) => {if(event.key === "Enter"){listUpdate()}}}  // Pressing Enter triggers useState updater function 
            />
            <ul>
                {
                    toggleUsers && userList.map((value, index) => (
                        <div className='listDiv'>
                            <li key={index} className='listItem' onClick={() => getListItems(value)}>{value}</li>
                        </div>
                    ))
                }
            </ul>
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
            {toggleUsers === false? <button onClick={() => {
                setToggleUsers(!toggleUsers);
                setTodoList([]);
            }}>
            Go back</button> : null}
        </> // Here the content of the <ul> is dynamically generated, with the .map() method creating <li> elements from the "todoList" array          
    )
}

export default TodoList 