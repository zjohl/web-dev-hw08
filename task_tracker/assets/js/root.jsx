import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
    let tasks = window.tasks;
    ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        };

    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header/>
                    <Route path="/" exact={true} render={() =>
                        <TaskList tasks={this.state.tasks}/>
                    }/>
                    <Route path="/users" exact={true} render={() =>
                        <div>User list</div>
                    }/>
                </div>
            </Router>
        </div>;
    }
}

function Header(_props) {
    return <div className="row my-2">
        <div className="col-6">
            <h1>Task Tracker</h1>
        </div>
        <div className="col-6">
            <div className="form-inline my-2">
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button className="btn btn-secondary">Login</button>
            </div>
        </div>
    </div>;
}

function TaskList(props) {
    let tasks = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
    return <div className="row">
        <h1 className="col-12">All Tasks</h1>
        <div className="col-12">
        {tasks}
    </div></div>;
}

function taskCompleted(e) {
    let id = e.target.getAttribute('data-task-id');
}

function timeSpentChanged(e) {
    let id = e.target.getAttribute('data-task-id');
}

function Task(props) {
    let {task} = props;
    let completed = task.completed;
    return <div className="row">
            <h2 className="task-title col 4">{task.title}</h2>
            <p className="col-4">{task.desc}</p>

            <div className="col-2">
                <input type="number" data-task-id={task.id} onChange={timeSpentChanged} step={15} min={0} value={task.timeSpent}/>
            </div>
            <div className="col-2">
                <input type="checkbox" className="form-control" data-task-id={task.id} name="completed" value={completed} checked={completed} onChange={taskCompleted}/>
            </div>
    </div>;
}
