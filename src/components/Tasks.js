import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tasks extends Component {

    deleteTask = id => {
        console.log('delete this task', id);
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
                                        <button className="teal darken-3" onClick={this.deleteTask}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button className="teal darken-3" style={btnDelete} onClick={() => this.deleteTask(task._id)}>
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