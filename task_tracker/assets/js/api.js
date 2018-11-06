import store from './store';
// From Nat Tuck's lecture notes

class Server {
    fetch_path(path, callback) {
        $.ajax(path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: callback,
        });
    }

    fetch_tasks() {
        this.fetch_path(
            "/api/v1/tasks",
            (resp) => {
                store.dispatch({
                    type: 'TASK_LIST',
                    data: resp.data,
                });
            }
        );
    }

    fetch_users() {
        this.fetch_path(
            "/api/v1/users",
            (resp) => {
                store.dispatch({
                    type: 'USER_LIST',
                    data: resp.data,
                });
            }
        );
    }

    create_user(user_data) {
        $.ajax("/api/v1/users/", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(user_data),
            success: (resp) => {
                this.fetch_users();
            }
        });
    }

    create_task(task_data) {
        $.ajax("/api/v1/tasks/", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(task_data),
            success: (resp) => {
                this.fetch_tasks();
            }
        });
    }

    update_task(task_id, task_data) {
        $.ajax(`/api/v1/tasks/${task_id}`, {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(task_data),
            success: (resp) => {
                store.dispatch({
                    type: 'TASK_UPDATED',
                    task_id: task_id,
                    data: task_data
                });
            }
        });
    }

    send_post(path, data, callback) {
        $.ajax(path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
        });
    }

    create_session(email, password) {
        this.send_post(
            "/api/v1/sessions",
            {email, password},
            (resp) => {
                store.dispatch({
                    type: 'NEW_SESSION',
                    data: resp.data,
                });
            }
        );
    }
}

export default new Server();