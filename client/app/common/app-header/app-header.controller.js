class AppHeaderController {
  constructor(usersService) {
    'ngInject';
    this.usersService = usersService;
  }

  logOut() {
    this.usersService.logOut();
  }
}

export default AppHeaderController;
