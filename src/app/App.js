import React, {Component} from 'react';

class App extends Component {

    state = {
        title: '',
        description: ''
    }

    addTask = e => {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Materialize
                M.toast({html: 'Task Saved'});
                this.setState({title: '', description: ''});
            })
            .then(err => console.log(err));

        e.preventDefault();
    }

    handleChange = e => {
        //console.log(e.target.name, e.target.value);
        const { name, value} = e.target;
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
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" onChange={this.handleChange} placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange}  placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn teal darken-3">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;