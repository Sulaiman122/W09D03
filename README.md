## Description

**_TodosSite_** is a website allow registered user to create their own todo list, also allow the user to change the task or delete it.
and admin has his own page to see all users todo plus his own todo and delete whatever he wants and he can also see all users and delete them if he wants.

## User Stories

- **Register:** As a visitor I can register in the website so that I can create my own todo list
- **Login:** As a user I can login to in the website so that I can create my own todo list
- **Logout:** As a user I can logout from the website so no one else can use it
- **Add Todo** As a user I can add an task to my todo list
- **delete todo task** As a user I can delete one of my todo task
- **detele other user todos** As an admin I can see all users todo then i can delete any one of them
- **detele other user** As an a I admin I can see all users then i can delete any one of them

# Client / Frontend

## React Router Routes (React App)

| Path        | Component | Permissions                 | Behavior                                                             |
| ----------- | --------- | --------------------------- | -------------------------------------------------------------------- |
| `/`         | n/a       | public `<Route>`            | Home page                                                            |
| `/register` | Register  | anon only `<AnonRoute>`     | Register form, link to login, navigate to log in page after register |
| `/login`    | Login     | anon only `<AnonRoute>`     | Login form, link to register, navigate to homepage after login       |
| `/todos`    | Todos     | user only `<PrivateRoute>`  | Shows user todo list                                                 |
| `/todos/admin` | AllTodos  | admin only `<PrivateRoute>` | Shows other users todo list                                          |

## Components

- Home
- Admin
- Login
- Sign up
- Todos

## Reducers

- Account Reducer
- login(user, role, token)
- logout()
- Tasks Resucer
- set(todos)



## Packages Used

- axios
- react-router-dom
- dotenv
- react-redux
- redux
- redux-devtools-extension



## GitHub Link

[repository Link](https://github.com/sulaiman122/w09d03)
