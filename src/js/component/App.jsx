import React from "react";
import Header from './Header.jsx';
import TodoList from './TodoList.jsx';
import Mensaje from './Mensaje.jsx';

//create your first component
const App = () => {
	return (
		<>
			<Header/>
			<TodoList/>
			<Mensaje/>
		</>
	);
};

export default App;
