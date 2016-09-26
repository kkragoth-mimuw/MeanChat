angular.module('app')
.controller('ApplicationCtrl', function($scope, $location, UserSvc) {

  if (window.localStorage.token) {
      UserSvc.token = window.localStorage.token
      UserSvc.getUser().then(function(response) {
        $scope.$emit('login', response.data)
      })
  }

  $scope.$on('login', function(_, user) {
    $scope.currentUser = user
    $location.path("/")
  })
  $scope.$on('logout'), function() {
    $scope.currentUser = null
    $location.path("/")
  }

  $scope.logout = function() {
    $scope.currentUser = null
    $location.path("/")
  }
})
