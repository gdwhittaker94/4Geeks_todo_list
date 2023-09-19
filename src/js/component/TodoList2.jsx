import React, { useEffect, useState } from 'react';
import Delete from './Delete';
import Message from './Message';

const TodoList = () => {
    
     /* NOTES
    - User's todo list is not the same when we leave their list and go back to it/doesn't sync
    */ 

    /* TODO LIST VARIABLES */
    const [userList, setUserList] = useState([]);         // List of all current users
    const [newUserValue, setNewUserValue] = useState(""); // Create New User 
    const [selectedUser, setSelectedUser] = useState(""); // Currently Selected User
    const [todoList, setTodoList] = useState([]);         // TodoList Array
    const [todoValue, setTodoValue] = useState("");       // TodoList Item Content 
    const [toggleUsers, setToggleUsers] = useState(true); // Toggle state 
    const allUserUrl = "https://playground.4geeks.com/apis/fake/todos/user/"; //My User URL
    

    /* UI WITH ALL USERS */
    useEffect(() => {                                   
        getAllUsers()                                         
    }, [])
    
    const getAllUsers = async () => {
        const userResponse = await fetch(allUserUrl);
        const allUsersData = await userResponse.json();
        setUserList(allUsersData);
    }

    const createNewUser = () => {                           
        fetch(`${allUserUrl}${newUserValue}`, {                                     
            method: "POST",                               
            headers: {                                     
                "Content-Type": "application/json"            
            },
            body: JSON.stringify([])                      
        }).catch((e) => console.log(e))                                     
        setUserList([newUserValue, ...userList])                   
    }

    const getUserTodoList = (value) => {                               
        fetch(`${allUserUrl}${value}`)                                       
        .then(response => response.json())                   
        .then(data => setTodoList(data))                 
        .catch(error => console.log(error))  
        setSelectedUser(value);             
        setToggleUsers(false);
    }  

    /* UI WITH ONE USER */

    useEffect(() => {                                   
        listUpdate()                                         
    }, [todoList])

    const listUpdate = () => {                           
        if(todoValue.trim() !== ""){   
            // On-screen Changes    
            const newTodo = {label: todoValue, done: false};           
            setTodoList([...todoList, newTodo]);          
            setTodoValue("");  

            // API Changes 
            fetch(`${allUserUrl}${selectedUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todoList)                
            })                      
        }                             
    }   
        
    const deleteItem = (index) => {                       
        const updatedTodoList = [...todoList];            
        updatedTodoList.splice(index, 1);                 
        setTodoList(updatedTodoList);                    
    }

    const deleteUser = () => {                       
        fetch(`${allUserUrl}${selectedUser}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }               
        })      
        setToggleUsers(true);               
    }
  
    /* USER INTERFACE */
    return (
        toggleUsers === true?             
            <>
                <p>
                    First time here? 
                    <br />
                    Create a new user to store your Todo list.
                </p>
                <input // Input for creating new user 
                    type="text" 
                    placeholder='Create New User...'    
                    value={newUserValue}                                                      
                    onChange={(event) => setNewUserValue(event.target.value)}                 
                    onKeyDown={(event) => {if(event.key === "Enter"){createNewUser()}}} 
                />
                <p>
                    Or return back to your previous user: 
                </p>
                <ul>
                    { // List of current users to choose from 
                        userList.map((value, index) => (
                            <div className='listDiv' onClick={() => getUserTodoList(value)}>
                                <li key={index} className='listItem'>{value}</li>
                            </div>
                        ))
                    }
                </ul>
            </>
            : // if 'toggleUsers' = false
            <>
                <input // Input for adding a new task 
                    type="text" 
                    placeholder='Add a task...'    
                    value={todoValue}                                                  
                    onChange={(event) => setTodoValue(event.target.value)}           
                    onKeyDown={(event) => {if(event.key === "Enter"){listUpdate()}}}   
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
                <button onClick={() => {
                    setToggleUsers(!toggleUsers);
                    setTodoList([]);
                }}>Go back to list of all users</button> 
                <button onClick={() => {
                    deleteUser()
                }}>Delete this user and all their tasks</button> 
            </>            
        )
}

export default TodoList 