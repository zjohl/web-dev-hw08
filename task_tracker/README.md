# TaskTracker

An app to manage personal tasks.

Users can sign up for an account on the user's page. This doesn't 
require any authentication because it is the entry point to the app.
Once they create an account they can log in and then create tasks
on the tasks page (the index). At the moment, as per the instructions, 
a user can assign tasks to any other user. They can edit existing tasks, 
but they cannot reassign tasks, to prevent users from incorrectly 
assigning tasks to other users. Likewise, they are not allowed to delete
tasks, since a task should be marked as complete when it is done, not 
deleted. Generally, my strategy was to limit the amount of options
users had to tamper with data, which prevents them from being able 
to delete other users or tamper unduely with tasks.
