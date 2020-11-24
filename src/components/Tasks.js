import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tasks extends Component {

    // DELETE TASK WHIT AXIOS
    deleteTaskAxios = async (id) => {
        if (confirm('Are you sure you want to delete if?')) {
            try {
                const res = await axios({
                    method: 'delete',
                    url: `/api/tasks/${id}`,
                });
                console.log(res.data);
                M.toast({ html: 'Task Delete' });
                this.props.handleTalkBlank();
                this.props.axiosTasks();
            } catch (error) {
                console.log(error);
            }
        }
    }
    // DELETE TASK WHIT FETCH
    deleteTaskFetch = id => {
        if (confirm('Are you sure you want to delete if?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Delete' });
                    this.props.handleTalkBlank();
                    this.props.axiosTasks();
                })
        }
    }

    // EDITAR TASK
    editTask = async(id) => {
        try {
            const res = await axios(`/api/tasks/${id}`);
            this.props.handleTaskEdit(res.data.title, res.data.description, res.data._id);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.tasks.map(task => {
                            return (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button className="teal darken-3" onClick={() => this.editTask(task._id)}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button className="teal darken-3" style={btnDelete} onClick={() => this.deleteTaskAxios(task._id)}>
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired
}

const btnDelete = {
    margin: '4px'
}

export default Tasks;