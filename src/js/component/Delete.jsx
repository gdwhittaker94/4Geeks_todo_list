import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Delete = ({ onDelete }) => {

    // Delete button for list item that, when clicked, removes the list item from the list
    // Initially not displayed, but displays when we hover over div containing list item 

    return (
        <div className='deleteButton'>
            <input type="radio" id="delete" name="deleteButton" value="Delete"/>
            <label for="delete" onClick={onDelete}>                                    
                <FontAwesomeIcon icon={faTrash} style={{color: "#000000",}}/>
            </label>
        </div>
    )
}

export default Delete; 