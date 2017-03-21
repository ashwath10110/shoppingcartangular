'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:OrdersCustomCtrl
 * @description
 * # OrdersCustomCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')

.controller('CheckoutCtrl', function($scope, $state, toastr, CartService) {

	$scope.cart = CartService.items;
	$scope.totalAmount = 0;

	$scope.addToCart = function(product) {

		var found = false;

		$scope.cart.forEach(function(item) {
			if (item.id === product.id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			$scope.cart.push(angular.extend({
				quantity: 1
			}, product));
		}

		var carName = product.manufacturer + ' ' + product.model;

		toastr.info('Added the car ' + carName + ' to cart');
	};

	$scope.getCartPrice = function() {
		var total = 0;
		$scope.cart.forEach(function(product) {
			total += product.units[0].price.value * product.quantity;
		});
		return total;
	};

	$scope.emptyCart = function() {
		CartService.emptyCart();
		$state.go('home');
	};

	$scope.removeFromCart = function(product) {

		CartService.removeFromCart(product);

		if (!CartService.items.length) {
			$state.go('home');
		}
	};

	$scope.checkoutOrder = function() {
		toastr.success('Congratulations!!! Your order has been placed.' + $scope.getCartPrice());
		CartService.emptyCart();
		$state.go('home');
	};

});