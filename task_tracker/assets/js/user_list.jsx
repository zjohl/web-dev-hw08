import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from "./api";
import $ from "jquery";

function UserList(props) {
    let users = _.map(props.users, (user) => <User key={user.id} user={user} />);
    return <div className="row">
        <div className="col-12">
            <table className="table table-striped">
                <thead>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Admin</th>
                </thead>
                <tbody>
                    {users}
                    <NewUser session={props.session} />
                </tbody>
            </table>
        </div>
    </div>;
}

function User(props) {
    let {user} = props;
    return <tr>
        <td>{user.email}</td>
        <td></td>
        <td>{user.admin}</td>
    </tr>;
}

function create_user() {
    api.create_user({user: {email: $('#new_email_form').val(), password: $('#new_password_form').val()}});
    $('#new_email_form').val("");
    $('#new_password_form').val("");
}

function NewUser(props) {
    if(props.session) {
        return null;
    }

    return <tr>
        <td><input id="new_email_form" type="email" required placeholder="email" /></td>
        <td><input id="new_password_form" type="password" required placeholder="password" /></td>
        <td><button className="btn btn-secondary" onClick={create_user}>Create</button></td>
    </tr>;
}


export default connect((state) => {return {users: state.users, session: state.session};})(UserList);