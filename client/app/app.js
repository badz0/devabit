import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngMessages from 'angular-messages';
import 'normalize.css';
import 'bootstrap-loader';
import * as _ from 'lodash';
import uiBootstrap from 'angular-ui-bootstrap';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngMessages,
    'ui.bootstrap'
  ])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
