class SearchController {
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
  
  follow(user) {
    this.users = this.usersService.follow(user);
    this.currUser = this.usersService.user;
  }
}

export default SearchController;
