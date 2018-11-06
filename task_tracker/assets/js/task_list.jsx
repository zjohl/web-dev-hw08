import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
    let tasks = _.map(_.sortBy(props.tasks, 'id'), (task) => <Task key={task.id} task={task} dispatch={props.dispatch}/>);
    return <div className="row">
        <h1 className="col-12">All Tasks</h1>
        <div className="col-12">
            {tasks}
        </div></div>;
}

function Task(props) {
    let {task, dispatch} = props;

    function title_changed(ev) {
        api.update_task(task.id, {task: _.assign({}, task, {title: ev.target.value })});
    }

    function desc_changed(ev) {
        api.update_task(task.id, {task: _.assign({}, task, {desc: ev.target.value })});
    }

    function time_spent_changed(ev) {
        api.update_task(task.id, {task: _.assign({}, task, {time_spent: ev.target.value })});
    }

    function completed_changed(ev) {
        api.update_task(task.id, {task: _.assign({}, task, {completed: ev.target.checked })});
    }

    return <div className="row">
        <div className="col-3">
            <input type="text" className="form-control" name="title" value={task.title} onChange={title_changed}/>
        </div>
        <div className="col-5">
            <input type="text" className="form-control" name="desc" value={task.desc} onChange={desc_changed}/>
        </div>
        <div className="col-2">
            <input type="number" className="form-control" name="time_spent" step={15} min={0} value={task.time_spent} onChange={time_spent_changed}/>
        </div>
        <div className="col-2">
            <input type="checkbox" className="form-control" name="completed" checked={task.completed} onChange={completed_changed}/>
        </div>
    </div>;
}

export default connect((state) => {return {tasks: state.tasks};})(TaskList);