import React, { Component } from "react";
import { createPost } from '../Model/Post';
import { createTodo, completeTodo } from '../Model/Todo';
import { initDb, createLocalDb, updateDb, getNewId } from '../Model/database';
import { setUserFlag, createUser, updateUser, deleteUser, selectUser, determineUsersTodos } from '../Model/User'
import { AppProvider } from '../Context/AppContext'
import UserList from './UserList';
import SelectedUser from './SelectedUser';
import UserForm from './UserForm';
import '../../styles/Components/app.scss'
import jsonPlaceholder from '../API/jsonPlaceholder'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonPlaceholderDB: null,
      selectedUser: { userId: undefined },
      userFlag: false
    }
    // Post Methods
    this.createPost = createPost.bind(this);

    // Todo Methods
    this.createTodo = createTodo.bind(this);
    this.completeTodo = completeTodo.bind(this);

    // User Methods
    this.createUser = createUser.bind(this);
    this.updateUser = updateUser.bind(this);
    this.deleteUser = deleteUser.bind(this);
    this.selectUser = selectUser.bind(this);
    this.setUserFlag = setUserFlag.bind(this);
    this.determineUsersTodos = determineUsersTodos.bind(this);

    // Db Methods
    this.initDb = initDb.bind(this);
    this.createLocalDb = createLocalDb.bind(this);
    this.updateDb = updateDb.bind(this);
    this.getNewId = getNewId.bind(this);
  }

  async componentDidMount() {
    // Create a persistent local storage
    let jsonPlaceholderDB = await this.initDb();
    this.setState({ jsonPlaceholderDB })
  }

  renderSelectedUser = () => {
    let { todos, posts } = this.state.jsonPlaceholderDB;

    todos = todos.filter(todo => todo.userId === this.state.selectedUser.userId)
    posts = posts.filter(post => post.userId === this.state.selectedUser.userId)
    return pug`
        SelectedUser(
          todos = ${todos}, 
          posts=${posts}, 
          userId=${this.state.selectedUser.userId}, 
          completeTodo= ${this.completeTodo},
          renderSelectedUser=${this.renderSelectedUser},
          )
      `
  }

  render() {

    if (!this.state.jsonPlaceholderDB) return null;
    const { users } = this.state.jsonPlaceholderDB;

    this.determineUsersTodos();

    return (
      pug`
        AppProvider(value={
          selectedUser: this.state.selectedUser.userId,
          updateUser: this.updateUser,
          selectUser:this.selectUser,
          deleteUser: this.deleteUser,
          createTodo: this.createTodo,
          completeTodo: this.completeTodo,
          createPost: this.createPost
        })
          .app
            UserList(
              userList= ${users}, 
              setUserFlag=${this.setUserFlag}
              )
            if(this.state.userFlag)
              UserForm(
                setUserFlag = ${this.setUserFlag},
                createUser = ${this.createUser},

                )
            else
              ${this.renderSelectedUser()}
      `
    )
  }

}

export default App