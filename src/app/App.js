import React, { Component } from 'react';

import Tasks from '../components/Tasks';
import TaskForm from '../components/TaskForm';

class App extends Component {

    state = {
        title: '',
        description: '',
        tasks: [],
        _id: ''
    }

    // INICILIZADOR
    componentDidMount() {
        //this.fetchTasks();
        this.axiosTasks();
    }

    // GET TASK WHIT FETCH
    fetchTasks = () => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
            });
    }

    // GET TASK WHIT AXIOS
    axiosTasks = async () => {
        try {
            const res = await axios('/api/tasks');
            this.setState({ tasks: res.data });
        } catch (error) {
            console.log(error);
        }
    }

    handleTaskEdit = (title, description, id) => {
        this.setState({ title, description, _id: id });
    }

    handleTalkBlank = () => {
        this.setState({ title: '', description: '', _id: '' });
    }

    handleTaskChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/** NAVIGATION */}
                <nav className="teal darken-3">
                    <div className="container">
                        <a className="brand-logo" href="/">TASK</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <TaskForm
                                title={this.state.title}
                                description={this.state.description}
                                id={this.state._id}
                                handleTaskChange={this.handleTaskChange}
                                axiosTasks={this.axiosTasks}
                                handleTalkBlank={this.handleTalkBlank}
                            />
                        </div>
                        <div className="col s7">
                            <Tasks 
                                tasks={this.state.tasks} 
                                axiosTasks={this.axiosTasks}
                                handleTaskEdit={this.handleTaskEdit}
                                handleTalkBlank={this.handleTalkBlank}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;