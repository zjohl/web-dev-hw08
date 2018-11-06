import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import UserList from './user_list';
import TaskList from './task_list';

export default function root_init(node, store) {
    let tasks = window.tasks;
    ReactDOM.render(
        <Provider store={store}>
            <Root tasks={tasks} />
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);

        api.fetch_tasks();
        api.fetch_users();
    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header/>
                    <Route path="/" exact={true} render={() =>
                        <TaskList />
                    }/>
                    <Route path="/users" exact={true} render={() =>
                        <UserList />
                    }/>
                </div>
            </Router>
        </div>;
    }
}

function Header(_props) {
    return <div className="row my-2">
        <div className="col-4">
            <h1><Link to={"/"} onClick={() => api.fetch_tasks()}>Task Tracker</Link></h1>
        </div>
        <div className="col-2">
            <p><Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link></p>
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
