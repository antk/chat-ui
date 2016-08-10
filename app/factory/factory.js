'use strict';

angular.module('chat')

.factory('DataService', ['$http',
  function($http) {

    // non-promisey methods

    // helper method to get user record by id
    // used inside async callbacks, so need to pass in array to search, too
    var getUserById = function(id, userData) {
      var c = userData.length - 1;
      id = parseInt(id, 10);
      if(isNaN(id)) return;
      do {
        if(userData[c].id === id) {
          return userData[c];
        }
      } while(c--);
      return {};
    };

    // return an array of participant user objects
    var getParticipants = function(pIds, userData) {
      var pNames = [];
      for(var i=0; i<pIds.length; i++) {
        pNames.push(getUserById(pIds[i], userData));
      }
      return pNames;
    }

    // promisey methods
    var getData = function(url) {
      return $http.get(url)
        .then(function(response) {
          return response.data;
        }, function(errResponse) {
          throw errResponse.status + ': ' + errResponse.data;
      });
    };

    var getChats = function() {
      return getData('../data/chats.json');
    };

    var getUsers = function() {
      return getData('../data/users.json');
    }

    var getChatById = function(cid) {
      return getUsers().then(function(userData) {
        return getChats().then(function(chatData) {
          var theChat = null;
          var i = chatData.length - 1;
          do {
            if(chatData[i].chat_id === cid) {
              theChat = chatData[i];
              theChat.participants = getParticipants(theChat.participants, userData);
              // console.log(theChat);
              break;
            }
          } while(i--);
          return {
            chat: theChat
          }
        });
      });
    };

    var getChatsByUserId = function(uid) {
      return getUsers().then(function(userData) {
        var user = getUserById(uid, userData);
        return getChats().then(function(chatData) {
          var chats = chatData;
          var userChats = [];
          for(var i = 0; i < chats.length; i++) {
            var foundIdx = chats[i].participants.indexOf(uid);
            if(foundIdx >= 0) {
              // remove the user
              chats[i].participants.splice(foundIdx, 1);

              // replace participant id's with participant names
              chats[i].participants = getParticipants(chats[i].participants, userData);
              userChats.push(chats[i]);
            }
          }
          return { 
            user: user,
            chats: userChats
          };
        });
      });
    }
    
    return {
      getChats: getChats,
      getUsers: getUsers,
      getChatById: getChatById,
      getChatsByUserId: getChatsByUserId
    };
  }
])

// use the UserChatService to get user data and store it for future access
.factory('UserChatService', ['$q', 'DataService', function($q, DataService) {
  var data = {user: {}, chats: []};

  var getDataForUser = function(uid) {
    var deferred = $q.defer();
    if(!data.user || data.chats.length === 0) {
      console.log('no data yet, get it');
      // we don't have data yet, go get it
      DataService.getChatsByUserId(uid).then(function(theData) {
        data.user = theData.user;
        data.chats = theData.chats;
        DataService.getUsers().then(function(userData) {
          // convert userData array to key value pairs
          var kvUsers = {};
          var i = userData.length - 1;
          do {
            kvUsers[userData[i].id] = userData[i];
          } while(i--);
          var theContacts = []; // change id's to actual user info
          var j = data.user.contacts.length - 1;
          do { 
            var rec = kvUsers[data.user.contacts[j]];
            delete rec.contacts;
            theContacts.push(rec);
          } while(j--);
          data.user.contacts = theContacts;
          deferred.resolve(theData);
        });
      });
    }
    else {
      console.log('this service has data, send that instead');
      deferred.resolve(data);
    }
    return deferred.promise;
  };

  var addMessage = function(chat_id, message) {
    var i = data.chats.length - 1;
    do {
      if(data.chats[i].chat_id === chat_id) {
        data.chats[i].messages.push(message);
        break;
      }
    } while(i--);
  };

  return {
    getDataForUser: getDataForUser,
    addMessage: addMessage

  };


}]);

