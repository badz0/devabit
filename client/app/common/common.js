import angular from 'angular';
import appHeader from './app-header/app-header.component';
import postsService from './services/posts.service';
import usersService from './services/users.service';
import routeProtectionService from './services/route-protection.service';

let commonModule = angular.module('app.common', [])
.component('appHeader', appHeader)
.service('postsService', postsService)
.service('usersService', usersService)
.service('routeProtectionService', routeProtectionService)
.name;

export default commonModule;
