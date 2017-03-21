myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

    .state('login', {
    url: '/login',
    views: {
      content: {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('home', {
    url: '/home',
    views: {
      nav: {
        templateUrl: 'views/navbar.html',
        controller: 'NavCtrl'
      },
      content: {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      },
      footer: {
        templateUrl: 'views/footer.html'
      }
    }
  })

  .state('checkout', {
    url: '/checkout',
    views: {
      nav: {
        templateUrl: 'views/navbar.html',
        controller: 'NavCtrl'
      },
      content: {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
      },
      footer: {
        templateUrl: 'views/footer.html'
      }
    }
  })

  .state('about', {
    url: '/about',
    controller: 'AboutCtrl',
    views: {
      nav: {
        templateUrl: 'views/navbar.html'
      },
      content: {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      },
      footer: {
        templateUrl: 'views/footer.html'
      }
    }
  });

});