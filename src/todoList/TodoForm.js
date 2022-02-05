import React, { useEffect, useState } from 'react';

function TodoForm(props) {
    const [form, setForm] = useState({
        title: '',
        desc: '',
        date: ''
    });
    const [error, setError] = useState({
        title: '',
        desc: '',
        date: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (props.data) {
            setForm(prevData => ({
                ...prevData,
                title: props.data.title || '',
                desc: props.data.desc || '',
                date: props.data.date || ''
            }));
        }
    }, [props.data]);

    function handleUpdate(event) {
        const targetName = event.target.name;
        const targetVal = event.target.value;
        setForm(prevData => ({
            ...prevData,
            [targetName]: targetVal
        }));

        setError(prevData => ({
            ...prevData,
            [targetName]: ''
        }));
    }

    function handleSubmit() {
        setIsSubmitted(true);

        if (!form.title) {
            setError(prevData => ({
                ...prevData,
                title: "This field required."
            }));
            return false;
        }

        if (!form.desc) {
            setError(prevData => ({
                ...prevData,
                desc: "This field required."
            }));
            return false;
        }

        if (!form.date) {
            setError(prevData => ({
                ...prevData,
                date: "This field required."
            }));
            return false;
        }
        props.handleSubmit(form);
    }

    return (
        <div className="container border my-4 w-50 rounded">

            <div className="row">
                <div className="col-12 py-3 bg-dark rounded-top text-center text-white px-0">
                    <h4>{props.data ? "Update": "Add"} Todo Details</h4>
                </div>
                <div className="col-12 mt-3">
                    <p className="my-0">Title</p>
                    <input 
                        type="text"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={handleUpdate}
                    />
                    {isSubmitted && error.title && <p className="text-danger my-0">{error.title}</p>}
                </div>
                <div className="col-12 mt-3">
                    <p className="my-0">Description</p>
                    <textarea 
                        name="desc"
                        className="form-control"
                        value={form.desc}
                        onChange={handleUpdate}
                    />
                    {isSubmitted && error.desc && <p className="text-danger my-0">{error.desc}</p>}
                </div>
                <div className="col-12 mt-3">
                    <p className="my-0">Date</p>
                    <input 
                        type="date"
                        name="date"
                        className="form-control"
                        value={form.date}
                        onChange={handleUpdate}
                    />
                    {isSubmitted && error.date && <p className="text-danger my-0">{error.date}</p>}
                </div>
                <div className="col-12 text-right my-3">
                    <button
                        onClick={() => props.setToggleTodoAdd(false)}
                        className="btn btn-outline-secondary"
                    >Back</button>
                    <button
                        onClick={() => handleSubmit()}
                        className="btn ml-2 btn-outline-primary"
                    >{props.data ? "Update": "Create"}</button>
                </div>
            </div>
        </div>
    );
}

export default TodoForm;