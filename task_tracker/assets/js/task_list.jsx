import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function TaskList(props) {

    let tasks = _.map(_.sortBy(props.tasks, 'id'), (task) => <Task session={props.session} key={task.id} task={task} dispatch={props.dispatch}/>);
    return <div className="row">
        <h1 className="col-12">All Tasks</h1>
        <div className="col-12">
            {tasks}
            <NewTask session={props.session}/>
        </div>
    </div>;
}

function Task(props) {
    let {task, dispatch, session} = props;
    let authenticated = session && session.token;

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
            <input type="text" className="form-control" name="title" value={task.title} disabled={!authenticated} onChange={title_changed}/>
        </div>
        <div className="col-5">
            <input type="text" className="form-control" name="desc" value={task.desc} disabled={!authenticated} onChange={desc_changed}/>
        </div>
        <div className="col-2">
            <input type="number" className="form-control" name="time_spent" step={15} min={0} value={task.time_spent} disabled={!authenticated} onChange={time_spent_changed}/>
        </div>
        <div className="col-2">
            <input type="checkbox" className="form-control" name="completed" checked={task.completed} disabled={!authenticated} onChange={completed_changed}/>
        </div>
    </div>;
}

function NewTask(props) {
    let {session} = props;
    let authenticated = session && session.token;

    function create_task(ev) {
        api.create_task({task: {
            user_id: session.user_id,
            title: $('#title-input').val(),
            desc: $('#desc-input').val(),
            time_spent: $('#time-spent-input').val(),
            completed: $('#completed-input').checked,
        }});

        debugger;
        $('#title-input').val("");
        $('#desc-input').val("");
        $('#time-spent-input').val("");
        $('#completed-input').checked = false;
    }

    return <div className="row">
        <div className="col-3">
            <input type="text" id="title-input" className="form-control" name="title" required />
        </div>
        <div className="col-5">
            <input type="text" id="desc-input" className="form-control" name="desc" required />
        </div>
        <div className="col-2">
            <input type="number" id="time-spent-input" className="form-control" name="time_spent" step={15} min={0} />
        </div>
        <div className="col-2">
            <input type="checkbox" id="completed-input" className="form-control" name="completed" />
        </div>
        <div className="my-2">
            <button className="btn btn-secondary" disabled={!authenticated} onClick={create_task}>Create Task</button>
        </div>
    </div>;
}

export default connect((state) => {return {tasks: state.tasks, session: state.session};})(TaskList);