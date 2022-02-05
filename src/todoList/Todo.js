import React, { useState } from 'react';

function Todo(props) {
    const [sortBy, setShortBy] = useState({
        title: '',
        date: ''
    });

    const resultsArr = [...props.todoList];
    const resultData = (resultsArr.length > 0) ? (
        (sortBy.title) ? resultsArr.sort((firstVal, secondVal) => {
            let x = firstVal.title.toLowerCase();
            let y = secondVal.title.toLowerCase();
            if (x < y) {return (sortBy.title == 2) ? 1: -1;}
            if (x > y) {return (sortBy.title == 2) ? -1: 1;}
            return 0;
        }): (
            (sortBy.date) ? resultsArr.sort((firstVal, secondVal) => {
                let x = firstVal.date;
                let y = secondVal.date;
                if (x < y) {return (sortBy.date == 2) ? 1: -1;}
                if (x > y) {return (sortBy.date == 2) ? -1: 1;}
                return 0;
            }): [...resultsArr]
        )
    ): [...resultsArr];

    return (
        <>
            <div className="d-flex mt-4 mx-4">
                <h4 className="">Todo List</h4>
                <div className="ml-auto">
                    <select
                        className="align-self-center form-control"
                        disabled={sortBy.date ? true: false}
                        name="title"
                        placeholder="Sort by title"
                        value={sortBy.title}
                        onChange={(event) => setShortBy(prevData => ({
                            ...prevData,
                            title: event.target.value,
                            date: ''
                        }))}
                    >
                        <option value="">Please Select</option>
                        <option value="1">Ascending</option>
                        <option value="2">Descending</option>
                    </select>
                </div>
                <div className="ml-2">
                    <select
                        className="align-self-center form-control"
                        name="date"
                        disabled={sortBy.title ? true: false}
                        placeholder="Sort by date"
                        value={sortBy.date}
                        onChange={(event) => setShortBy(prevData => ({
                            ...prevData,
                            date: event.target.value,
                            title: ''
                        }))}
                    >
                        <option value="">Please Select</option>
                        <option value="1">Ascending</option>
                        <option value="2">Descending</option>
                    </select>
                </div>
                {(sortBy.title || sortBy.date) && <button
                    className="align-self-center btn ml-2 btn-danger"
                    onClick={() => setShortBy(prevData => ({
                        ...prevData,
                        title: '',
                        date: ''
                    }))}
                >Reset</button>}
                <button
                    className="align-self-center btn ml-2 btn-success"
                    onClick={() => props.setToggleTodoAdd(true)}
                >+ Add Todo</button>
            </div>
            <div class="table-responsive p-4 todo-table">
                <table className="table border rounded">
                    <thead className="thead-dark">
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {(resultData.length == 0) ? <tr>
                            <td colSpan="6" className="text-center">
                                <div className="py-5 alert alert-warning">
                                    No Data Found
                                </div>
                            </td>
                        </tr>:
                        resultData.map((todo, index) => <tr>
                            <td>{(index + 1)}</td>
                            <td className="max-width">{todo.title}</td>
                            <td className="max-width">{todo.desc}</td>
                            <td>{todo.date}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => props.handleEdit(todo)}
                                >Edit</button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => props.handleDelete(todo)}
                                >Delete</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Todo;