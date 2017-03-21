'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
	.controller('MainCtrl', function($scope, toastr, $state, $http, CartService, ItemsService) {

		if (ItemsService && ItemsService.isInitialised) {
			$scope.items = [];
			$scope.items = ItemsService.data.shoppingData;
		} else {
			$scope.items = [];

			ItemsService.initialise().then(function(result) {
				$scope.items = result.data.shoppingData;
				CartService.items = result.data.cartData;
			});
		}

		$scope.addToCart = function(product) {
			CartService.addItemsToCart(product);
		};

		$scope.checkout = function() {
			$state.go('checkout');
		};

	});

angular.module('myAppApp')
	.controller('NavCtrl', function($scope, toastr, $state, CartService) {

		$scope.totalCount = 0;
		for (var i = 0; i < CartService.items.length; i++) {
			$scope.totalCount += CartService.items[i].quantity;
		}

	});