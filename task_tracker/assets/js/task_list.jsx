import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
    let tasks = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
    return <div className="row">
        <h1 className="col-12">All Tasks</h1>
        <div className="col-12">
            {tasks}
        </div></div>;
}

function Task(props) {
    let {task} = props;
    let completed = task.completed;

    function timeSpentChanged(ev) {  // <=
        let action = {
            type: 'UPDATE_TIME_SPENT',
            task_id: task.id,
            time_spent: ev.target.value,
        };
        dispatch(action);
    }

    function taskCompleted(ev) {  // <=
        let action = {
            type: 'UPDATE_COMPLETED',
            task_id: task.id,
            completed: ev.target.value,
        };
        dispatch(action);
    }

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

export default connect((state) => {return {tasks: state.tasks};})(TaskList);