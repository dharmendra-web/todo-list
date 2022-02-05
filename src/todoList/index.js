import React, { useEffect, useState } from 'react';
import ToData from './todoJson.json';
import Todo from './Todo';
import './style.css';
import TodoForm from './TodoForm';

function TodoContainer() {
    const [todoList, setTodoList] = useState([...ToData]);
    const [toggleTodoAdd, setToggleTodoAdd] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        const getStorageData = localStorage.getItem('reactTodoList');
        if (getStorageData) {
            setTodoList([...JSON.parse(getStorageData)]);
        } else {
            localStorage.setItem('reactTodoList', JSON.stringify(ToData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('reactTodoList', JSON.stringify(todoList));
    }, [todoList]);
 
    function handleAddORUpdate(data) {
        if (selectedTodo) {
            setTodoList(prevData => [...prevData.map(item => {
                if (item.title == selectedTodo.title) {
                    item.title = data.title;
                    item.desc = data.desc;
                    item.date = data.date;
                }
                return item;
            })]);
        } else {
            setTodoList(prevData => [data, ...prevData]);
        }
        setSelectedTodo(null);
        setToggleTodoAdd(false);
    }

    function handleEdit(todo) {
        setSelectedTodo(todo);
        setToggleTodoAdd(true);
    }

    function handleDelete(todo) {
        setTodoList(prevData => [...prevData.filter(item => (item.title != todo.title))]);
    }

    return (
        <>
            {!toggleTodoAdd ? <Todo 
                todoList={todoList}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setToggleTodoAdd={setToggleTodoAdd}
            />: <TodoForm 
                handleSubmit={handleAddORUpdate}
                data={selectedTodo}
                setToggleTodoAdd={setToggleTodoAdd}
            />}
        </>
    );
}

export default TodoContainer;