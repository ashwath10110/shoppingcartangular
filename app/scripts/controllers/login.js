'use strict';
/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
	.controller('LoginCtrl', function($state, $scope, toastr) {

		$scope.go = function() {
			if ($scope.password == "admin" && $scope.username == "admin") {
				toastr.success('Welcome Sudarshan!!!');
				$state.go('home');
			} else {
				toastr.error('username: admin  password: admin');
			}
		};

		$scope.forgotCredentials = function() {
			toastr.error('username: admin  password: admin');
		};

	});

