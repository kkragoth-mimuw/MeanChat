angular.module('app')
.run(function($rootScope, $timeout) {
  (function connect(){

    function websocketHost() {
      if (window.location.protocol == 'https:') {
        return "wss://" + window.location.host
      } else {
        return "ws://" + window.location.host
      }
    }
    var connection = new WebSocket(websocketHost())

    connection.onclose = function(e) {
      console.log('Websocket closed. Trying to reconnect...')
      $timeout(connect, 10*1000)
    }

    connection.onmessage = function(e) {
      console.log(e)
      var payload = JSON.parse(e.data)
      $rootScope.$broadcast('ws:' + payload.topic, payload.data)
    }
  })()
})
