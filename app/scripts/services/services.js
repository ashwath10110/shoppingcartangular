myApp.service('CartService', function($resource, $filter, ShoppingLocalStorageService, toastr) {

	var service = {
		items: [],
		addItemsToCart: addItemsToCart,
		emptyCart: emptyCart,
		removeFromCart: removeFromCart
	}

	function addItemsToCart(product) {

		var found = false;

		service.items.forEach(function(item) {
			if (item.id === product.id) {
				item.quantity++;
				found = true;
			}
		});

		if (!found) {
			service.items.push(angular.extend({
				quantity: 1
			}, product));
		}

		var userDataSaved = ShoppingLocalStorageService.getDataFromLocalStorage('user');
		ShoppingLocalStorageService.saveDataToLocalStorage('user', userDataSaved.shoppingData, service.items);

		toastr.info('Added the product ' + product.name + ' to cart');
	}

	function emptyCart() {
		service.items = [];

		var userDataSaved = ShoppingLocalStorageService.getDataFromLocalStorage('user');
		ShoppingLocalStorageService.saveDataToLocalStorage('user', userDataSaved.shoppingData, service.items);
	}

	function removeFromCart(product) {

		var index = service.items.indexOf(product);

		var found = false;

		if (index > -1) {
			if (service.items[index].quantity > 1) {
				service.items[index].quantity--;
			} else {
				service.items.splice(index, 1);
			}
		}

		var userDataSaved = ShoppingLocalStorageService.getDataFromLocalStorage('user');
		ShoppingLocalStorageService.saveDataToLocalStorage('user', userDataSaved.shoppingData, service.items);

		toastr.info('Removed the Producy ' + product.name + ' from cart');
	};

	return service;
});

myApp.service('ItemsService', function($resource, $filter, ShoppingLocalStorageService, $http, $q) {

	var service = {
		data: '',
		isInitialised: false
	};

	this.initialise = function() {

		var deferred = $q.defer();

		if (service.data == '') {

			var userDataSaved = ShoppingLocalStorageService.getDataFromLocalStorage('user');

			if (!userDataSaved) {

				console.log("Not available in localStorage");

				$http.get("https://api.zalando.com/articles")
					.then(function(response) {
						
						if (response.status == 200) {
							service = {
								data: {
									user: 'user',
									shoppingData: response.data.content,
									cartData: []
								},
								isInitialised: true
							}

							ShoppingLocalStorageService.saveDataToLocalStorage('user', response.data.content, []);
							deferred.resolve(service);
						}
					});
			} else {
				var cartDataSaved = ShoppingLocalStorageService.getDataFromLocalStorage('cartData');
				service = {
					data: {
						user: 'user',
						shoppingData: userDataSaved.shoppingData,
						cartData: userDataSaved.cartData
					},
					isInitialised: true
				}
				console.log("available in localStorage");
				deferred.resolve(service);
			}
		}

		return deferred.promise;
	};
});


myApp.factory('ShoppingLocalStorageService', ['$rootScope', function($rootScope) {

	function saveDataToLocalStorage(key, shoppingData, cartData) {
		var objectToSave = {
			user: key,
			shoppingData: shoppingData,
			cartData: cartData
		}
		localStorage.setItem('user', JSON.stringify(objectToSave));
	}

	function getDataFromLocalStorage(key) {
		var dataSaved = localStorage.getItem(key);
		return JSON.parse(dataSaved);
	}

	var service = {
		saveDataToLocalStorage: saveDataToLocalStorage,
		getDataFromLocalStorage: getDataFromLocalStorage
	};

	return service;
}]);