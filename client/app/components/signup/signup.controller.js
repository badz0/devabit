class SignupController {
  constructor(usersService, $timeout) {
    'ngInject';
    this.$timeout = $timeout;
    this.usersService = usersService;
  }
  submit(form) {
    if (form.$valid) {
      const errMsg = this.usersService.register({
        email: form.email.$viewValue,
        firstName: form.firstName.$viewValue,
        lastName: form.lastName.$viewValue,
        password: form.password.$viewValue
      });
      if (errMsg === 'emailExist') {
        form.email.$setValidity('exist', false);
        this.$timeout(() => form.email.$setValidity('exist', true), 5000);
      }
    }
  }
}

export default SignupController;
