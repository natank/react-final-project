/** DB Methods  */

export async function initDb() {
  let jsonPlaceholderDB = JSON.parse(localStorage.getItem('jsonPlaceholderDB'));
  // for persistent localStorage value, we initialize jsonPlaceholderDb from network only if it not exists
  if (!jsonPlaceholderDB) {
    await this.createLocalDb()
    jsonPlaceholderDB = JSON.parse(localStorage.getItem('jsonPlaceholderDB'));
  }
  let { posts, users, todos } = jsonPlaceholderDB;
  jsonPlaceholderDB = {
    posts,
    users,
    todos
  }
  return jsonPlaceholderDB;
}
export async function createLocalDb() {

  let jsonPlaceholderDB = localStorage.getItem('jsonPlaceholderDB');
  if (!jsonPlaceholderDB) {
    jsonPlaceholderDB = {}
    try {

      jsonPlaceholderDB.posts = await jsonPlaceholder.get('/posts')
      jsonPlaceholderDB.users = await jsonPlaceholder.get('/users')
      jsonPlaceholderDB.todos = await jsonPlaceholder.get('/todos')
    } catch (err) {
      console.log(err)
    }
    jsonPlaceholderDB.posts = jsonPlaceholderDB.posts.data;
    jsonPlaceholderDB.users = jsonPlaceholderDB.users.data;
    jsonPlaceholderDB.todos = jsonPlaceholderDB.todos.data;

    let data = JSON.stringify(jsonPlaceholderDB);
    localStorage.setItem('jsonPlaceholderDB', data)
  }
}

export function updateDb(newDb) {
  localStorage.setItem('jsonPlaceholderDB', JSON.stringify(newDb));
  let jsonPlaceholderDB = JSON.parse(localStorage.getItem('jsonPlaceholderDB'))
  this.setState({ jsonPlaceholderDB })
}



/** Generic function to get an id for a new user/todo/post */
export function getNewId(settings) {
  // the setting object specifies the contentObj name (e.g todo/user/post)

  /**content array's name is the plural of contentObj (e.g. todo=>todos)*/
  let contentArray = this.state.jsonPlaceholderDB[`${settings.contentObj}s`]

  if (contentArray == undefined) throw ("unknown content array name")
  let lastIndex = contentArray.length - 1;
  let newId = contentArray[lastIndex].id + 1;
  return newId;
}


