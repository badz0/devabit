class FollowingController {
  constructor(postsService, usersService, $scope) {
    'ngInject';
    this.$scope = $scope;
    this.postsService = postsService;
    this.usersService = usersService;
  }
  
  $onInit() {
    this.users = this.usersService.users;
    this.currUser = this.usersService.user;
  }

  unfollow(user) {
    this.users = this.usersService.follow(user);
  }
  
  filterUsers(user) {
    const currUser = angular.fromJson(localStorage.getItem('kindaTwitterUser'));
    return currUser.following.includes(user.id);
  }
}

export default FollowingController;
