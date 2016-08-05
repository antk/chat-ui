'use strict';

angular.module('chat')

.factory('DataService', [ 
  function() {
    var data = 
    [
      {
        "user": "Peter Parker", 
        "id":0, 
        "chats":[], 
        "contacts":[]
      },
      {
        "user": "Eddie Brock", 
        "id":1, 
        "chats":[], 
        "contacts":[]
      },
    ];

    // always return an array
    var getData = function(id) {
      id = parseInt(id, 10);
      if(isNaN(id)) return [];
      var i = data.length - 1;
      do {
        if(data[i].id === id) {
          return [data[i]];
        }
      } while(i--);
      return [];
    }

    return {
      getData: getData
    }
  }
]);