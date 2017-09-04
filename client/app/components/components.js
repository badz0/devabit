import angular from 'angular';
import uiRouter from 'angular-ui-router';
import home from './home/home.component';
import login from './login/login.component';
import signup from './signup/signup.component';
import search from './search/search.component';
import searchFilter from './search/search.filter';
import following from './following/following.component';


let componentModule = angular.module('app.components', [
  uiRouter,
])

  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'home',
        resolve: {
          homeProtect: function (routeProtectionService) {
            'ngInject';
            return routeProtectionService.homeProtect().catch(() => { });
          }
        }
      })

      .state('following', {
        url: '/following',
        component: 'following',
        resolve: {
          followingProtect: function (routeProtectionService) {
            'ngInject';
            return routeProtectionService.homeProtect().catch(() => { });
          }
        }
      })

      .state('search', {
        url: '/search',
        component: 'search',
        resolve: {
          searchProtect: function (routeProtectionService) {
            'ngInject';
            return routeProtectionService.homeProtect().catch(() => { });
          }
        }
      })

      .state('login', {
        url: '/login',
        component: 'login',
        resolve: {
          loginProtect: function (routeProtectionService) {
            'ngInject';
            return routeProtectionService.loginProtect().catch(() => { });
          }
        }
      })

      .state('signup', {
        url: '/signup',
        component: 'signup',
        resolve: {
          loginProtect: function (routeProtectionService) {
            'ngInject';
            return routeProtectionService.loginProtect().catch(() => { });
          }
        }
      });
  })

  .component('home', home)
  .component('login', login)
  .component('signup', signup)
  .component('search', search)
  .component('following', following)
  .filter('searchFilter', searchFilter)
  .name;

export default componentModule;
