import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskForm extends Component {


    // CREAR/AGREGAR UNA TAREA
    addTask = async(e) => {
        
        let dataForm = {
            title: this.props.title,
            description: this.props.description
        }

        if (this.props.id) {

            try {
                const res = await axios({
                    method: 'put',
                    url: `/api/tasks/${this.props.id}`,
                    data: dataForm
                });
                console.log(res.data);
                M.toast({html: 'Task Updated'});
                this.props.handleTalkBlank();
                this.props.axiosTasks();
            } catch (error) {
                console.log(error);
            }

        } else {

            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // Materialize
                    M.toast({ html: 'Task Saved' });
                    this.props.handleTalkBlank();
                    //this.fetchTasks();
                    this.props.axiosTasks();
                })
                .then(err => console.log(err));
        }
        e.preventDefault();
    }

    // CHANGE THE STATE
    handleChange = e => {
        const { name, value } = e.target;
        this.props.handleTaskChange(name, value);
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <form onSubmit={this.addTask}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" name="title" onChange={this.handleChange} placeholder="Task Title" value={this.props.title} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.props.description}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn teal darken-3">Send</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;