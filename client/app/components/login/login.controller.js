class LoginController {
  constructor(usersService, $timeout) {
    'ngInject';
    this.$timeout = $timeout; 
    this.usersService = usersService;
  }

  login(form) {
    if (!form.email.$viewValue || !form.password.$viewValue) {
      this.errorMsg = 'Fill all fields';
      this.clearMsg();
      return;
    }
    this.errorMsg = this.usersService.login({
      email: form.email.$viewValue,
      password: form.password.$viewValue
    });
    this.clearMsg();
  }

  clearMsg() {
    this.$timeout(() => this.errorMsg = null, 5000);
  }
}

export default LoginController;
