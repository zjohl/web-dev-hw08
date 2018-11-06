import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';

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

        api.get_session();
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
