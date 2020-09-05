
export function createPost(post) {
  let { posts } = this.state.jsonPlaceholderDB;
  let newPostId = this.getNewId({ contentObj: 'post' });
  let newPost = {
    userId: this.state.selectedUser.userId,
    title: post.title,
    body: post.body,
    id: newPostId
  }
  posts.push(newPost);
  this.updateDb(this.state.jsonPlaceholderDB)
}

