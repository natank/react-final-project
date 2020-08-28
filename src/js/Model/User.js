/** User Methods */

export function setUserFlag(settings) {
  this.setState({ userFlag: settings.isOpen });
}


export function updateUser(userDetails) {
  let { name, email, street, city, zipcode } = userDetails;
  let address = { street, city, zipcode }
  let userDetailsFormatted = { name, email, address };

  const { users } = this.state.jsonPlaceholderDB;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userDetails.id) {
      Object.keys(userDetailsFormatted).forEach(key => {
        users[i][key] = userDetailsFormatted[key]
      })
      break;
    }
  }
  this.updateDb(this.state.jsonPlaceholderDB)
}

export function deleteUser(settings) {
  let { users, todos, posts } = this.state.jsonPlaceholderDB;
  const { userId } = settings;

  let db = {}
  db.posts = posts.filter(post => post.userId !== userId)
  db.todos = todos.filter(todo => todo.userId !== userId)
  db.users = users.filter(user => user.id !== userId)

  if (userId === this.state.selectedUser.userId) {
    this.setState({ selectedUser: { userId: undefined } })
  }
  this.updateDb(db)
}

export function selectUser(id) {
  checkUserExists = checkUserExists.bind(this);
  let userExists = checkUserExists(id)
  if (userExists) {
    this.setState({ selectedUser: { userId: id } })
  }
}

let checkUserExists = function (userId) {
  // check if user with the id exists
  let { users } = this.state.jsonPlaceholderDB;
  return users.some(user => user.id === userId)
}

export function createUser(user) {
  let { users } = this.state.jsonPlaceholderDB;
  let newUserId = this.getNewId({ contentObj: 'user' });
  let newUser = {
    id: newUserId,
    name: user.name,
    userName: user.email,
    email: user.email,
    address: null
  }
  users.push(newUser);
  this.updateDb(this.state.jsonPlaceholderDB)
}

export function determineUsersTodos() {
  const { users, todos } = this.state.jsonPlaceholderDB

  users.forEach(user => {
    user.hasTodos = false;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].userId === user.id && todos[i].completed === false) {
        user.hasTodos = true;
        break;
      }
    }
  })
}