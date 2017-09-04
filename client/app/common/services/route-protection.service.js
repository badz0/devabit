class RouteProtectionService {
  constructor($q, $state, $timeout) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this.$timeout = $timeout;
  }

  homeProtect() {
    const defer = this.$q.defer();
    if (localStorage.getItem('kindaTwitterUser')) {
      defer.resolve();
    } else {
      this.$timeout(() => {
        this.$state.go('login');
      });
      defer.reject();
    }
    return defer.promise;
  }

  loginProtect() {
    const defer = this.$q.defer();
    if (!localStorage.getItem('kindaTwitterUser')) {
      defer.resolve();
    } else {
      this.$timeout(() => {
        this.$state.go('home');
      });
      defer.reject();
    }
    return defer.promise;
  }
}

export default RouteProtectionService;