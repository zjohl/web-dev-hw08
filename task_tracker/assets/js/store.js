import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
Application State:

tasks: props.tasks
users: []
session: null {toke, user_id

 */


function tasks(state = [], action) {
    switch (action.type) {
        case 'TASK_LIST':
            return action.data;
        case 'TASK_UPDATED':
            return _.concat(_.filter(state, (task) => task.id !== action.task_id ), action.data.task);
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
            return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
        case 'NEW_SESSION':
            return action.data;
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", state0, action);

    let reducer = combineReducers({tasks, users, session});
    let state1 = reducer(state0, action);

    console.log("reducer1", state1);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;