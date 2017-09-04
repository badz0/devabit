class PostsService {
  constructor($http, $log, $q) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
    this.$q = $q;

    this._userPosts = [];
    this.loadAllPosts();
  }

  loadAllPosts() {
    const postsFromStorage = angular.fromJson(localStorage.getItem('kindaTwitterPosts'));
    if (postsFromStorage) {
      this._allPosts = postsFromStorage;

      const defer = this.$q.defer();
      defer.resolve(this.loadUserPosts());
      return defer.promise;
    } else {
      return this.$http.get('post.json')
        .then((res) => {
          this._allPosts = res.data;
          this.updatePostsInStorage();
          return this.loadUserPosts();
        }).catch((rej) => {
          this.$log.error(rej);
        });
    }
  }

  loadUserPosts() {
    this._userPosts = [];
    const user = angular.fromJson(localStorage.getItem('kindaTwitterUser'));
    if (user) {
      user.following.forEach(item => {
        const posts = this._allPosts[item];
        if (posts) this._userPosts = this._userPosts.concat(posts);
      });
      
      if (this._allPosts[user.id]) this._userPosts = this._userPosts.concat(this._allPosts[user.id]);

      this.parseDates(this._userPosts);
    }
    return angular.copy(this._userPosts);
  }

  parseDates(posts) {
    posts.forEach(post => {
      post.date = new Date(post.date);
      post.comments.forEach(comment => comment.date = new Date(comment.date));
    });
  }

  updatePostsInStorage() {
    localStorage.setItem('kindaTwitterPosts', JSON.stringify(this._allPosts));
  }

  like(tweet, userId) {

    _.each(this._allPosts[tweet.authorId], post => {
      if (post.tweetId === tweet.tweetId) {
        const index = post.likes.indexOf(userId);
        if (index !== -1) {
          post.likes.splice(index, 1);
        } else {
          post.likes.push(userId);
        }
        return false;
      }
    });

    this.updatePostsInStorage();
    return this.loadUserPosts();
  }

  tweet(tweet, user) {
    if (!(user.id in this._allPosts)) this._allPosts[user.id] = [];

    this._allPosts[user.id].push({
      authorId: user.id,
      tweetId: this.makeTweetId(user),
      authorName: user.firstName + ' ' + user.lastName,
      body: tweet,
      date: new Date(),
      likes: [],
      comments: []
    });
    
    this.updatePostsInStorage();
    return this.loadUserPosts();
  }

  makeTweetId(user) {
    const userTweetsCount = this._allPosts[user.id].length;
    const idStart = user.id.toString();
    if (!userTweetsCount) return idStart + 0;
    const idEnd = parseInt(this._allPosts[user.id][userTweetsCount - 1].tweetId.replace(user.id, ''), 10) + 1;
    return idStart + idEnd;

  }

  get posts() {
    return angular.copy(this._userPosts);
  }
}

export default PostsService;