class UsersService {
  constructor($http, $log, $state) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
    this.$state = $state;
    this._users = angular.fromJson(localStorage.getItem('kindaTwitterUsers')) || this.loadUsers();
  }

  loadUsers() {
    this.$http.get('user.json')
      .then((res) => {
        this._users = res.data;
        this.updateUsersInStorage();
      }).catch((rej) => {
        this.$log.error(rej);
      });
  }

  updateUsersInStorage() {
    localStorage.setItem('kindaTwitterUsers', JSON.stringify(this._users));
  }

  updateUserInStorage(user) {
    localStorage.setItem('kindaTwitterUser', JSON.stringify(user));
  }

  register(user) {
    if (this._users.find((person) => person.email === user.email)) {
      return 'emailExist';
    }

    user.id = this._users[this._users.length - 1].id + 1;
    user.following = [];
    
    this._users.push(user);
    this.updateUsersInStorage();
    this.login(user);
  }

  login(data) {
    const user = this._users.find((person) => person.email === data.email && person.password === data.password);
    
    if (user) {
      user.online = true;
      this.updateUsersInStorage();
      
      localStorage.setItem('kindaTwitterUser', JSON.stringify(user));
      this.$state.go('home');
    } else {
      return 'Wrong email or password';
    }
  }

  logOut() {
    this._users.find((person) => person.id === this.user.id).online = false;
    this.updateUsersInStorage();
    localStorage.removeItem('kindaTwitterUser');
    this.$state.go('login');
  }

  follow(userToFollow) {

    _.each(this._users, user => {
      if (user.id === this.user.id) {
        const index = user.following.indexOf(userToFollow.id);
        if (index !== -1) {
          user.following.splice(index, 1);
        } else {
          user.following.push(userToFollow.id);
        }
        this.updateUsersInStorage()
        this.updateUserInStorage(user);
        return false;
      }
    });

    return this.users;
  }

  get users() {
    return angular.copy(this._users);
  }

  get user() {
    return angular.fromJson(localStorage.getItem('kindaTwitterUser'))
  }

  set users(data) {
    this._users = angular.copy(data);
    this.updateUsersInStorage();
  }
}

export default UsersService;