import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

function UserList(props) {
    let users = _.map(props.users, (user) => <User key={user.id} user={user} />);
    return <div className="row">
        <div className="col-12">
            <table className="table table-striped">
                <tbody>
                    {users}
                </tbody>
            </table>
        </div>
    </div>;
}

function User(props) {
    let {user} = props;
    return <tr>
        <td>{user.email}</td>
        <td>{user.admin}</td>
    </tr>;
}

export default connect((state) => {return {users: state.users, session: state.session};})(UserList);