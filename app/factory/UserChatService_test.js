'use strict'

describe('UserChatService.addMessage', function() {
  var UserChatService;

  beforeEach(module('chat'));

  beforeEach(function() {
    inject(function($q, $rootScope, DataService, _UserChatService_) {
      // because UserChatService has a dependency on DataService
      // need to include it here and use jasmine spyOn to fake the calls and return promises
      UserChatService = _UserChatService_;
      spyOn(DataService, "getChatsByUserId").and.callFake(function(uid) {
        var deferred = $q.defer();
        deferred.resolve({user: {"id":0, "firstName":"Peter", "lastName":"Parker", "contacts": [1,2]}, 
              chats:[ {
                "chat_id":0, 
                "participants":[0, 1], 
                "messages": [
                  {"msg_id":0, "sender_id":0, "text":"i got da best webz", "datetime":""},
                  {"msg_id":1, "sender_id":0, "text":"u must respect", "datetime":""},
                  {"msg_id":2, "sender_id":1, "text":"go away", "datetime":""},
                  {"msg_id":3, "sender_id":1, "text":"puny spider", "datetime":""}
                ]
              }]
            });
        return deferred.promise;
      });
      spyOn(DataService, "getUsers").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve([{"id":0, "firstName":"Peter", "lastName":"Parker", "contacts": [1,2]},
              {"id":1, "firstName":"Bruce", "lastName":"Banner", "contacts": [0,2]},
              {"id":2, "firstName":"Steve", "lastName":"Rogers", "contacts": [0,1]}]);
        return deferred.promise;
      });
    });
  });
  it('should add a new message to an existing chat', inject(function($rootScope) {
    UserChatService.getDataForUser(0).then(function(data) {
      var oldLength = data.chats[0].messages.length;
      var msgId = data.chats[0].messages.length
      var testMsg = {"msg_id":msgId, "sender_id":1, "text":"puny spider", "datetime":""}
      UserChatService.addMessage(data.chats[0].chat_id, testMsg); // finally get to test addMessage!
      expect(data.chats[0].messages.length).toEqual(oldLength+1);
    });
    $rootScope.$apply();
  }));
});