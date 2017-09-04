class HomeController {
  constructor(postsService, usersService) {
    'ngInject';
    this.postsService = postsService;
    this.usersService = usersService;
  }

  $onInit() {
    this.getTweets();
    this.currentUser = this.usersService.user;
  }

  getTweets() {
    this.postsService.loadAllPosts().then(data => {
      this.tweets = data;
    });
  }

  checkLike(likes) {
    return likes.indexOf(this.currentUser.id) !== -1;
  }

  like(tweet) {
    this.tweets = this.postsService.like(tweet, this.currentUser.id);
  }
  
  tweet() {
    this.tweets = this.postsService.tweet(this.tweetInput, this.currentUser);
    this.tweetInput = '';
  }
}

export default HomeController;
