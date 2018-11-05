# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias TaskTracker.Repo
alias TaskTracker.Users.User

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "zamir@johl.com", admin: true, password_hash: pwhash})
Repo.insert!(%User{email: "boo@radley.com", admin: false, password_hash: pwhash})

alias TaskTracker.Tasks.Task

Repo.insert!(%Task{title: "Create more tasks", desc: "It's a task to make sure that I make more tasks",
  user_id: 1, completed: false, time_spent: 200})
Repo.insert!(%Task{title: "Create this task", desc: "making tasks and feeling good about it",
  user_id: 1, completed: true, time_spent: 10})
Repo.insert!(%Task{title: "Complain about making tasks", desc: "It's not as easy as people think to make tasks.",
  user_id: 1, completed: false, time_spent: 1000000})
