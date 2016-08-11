'use strict'

describe('DataService.getChats', function() {
  var DataService,
      httpBackend;

  beforeEach(module('chat'));

  // assign httpBackend and DataService
  beforeEach(function() {
    inject(function($httpBackend, _DataService_) {
      DataService = _DataService_;
      httpBackend = $httpBackend;
    })
  });

  // after test verifications, vanilla
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should respond with chat data', function() {

    // respond with this data
    var respondData = [
    {
      "chat_id":0, 
      "participants":[0, 1], 
      "messages": [
        {"msg_id":0, "sender_id":0, "text":"i got da best webz", "datetime":""},
        {"msg_id":1, "sender_id":0, "text":"u must respect", "datetime":""},
        {"msg_id":2, "sender_id":1, "text":"go away", "datetime":""},
        {"msg_id":2, "sender_id":1, "text":"puny spider", "datetime":""}
      ]
    }];
    // httpBackend.when('GET', '/data/chats.json').respond(200, respondData);

    // when DataService makes a get request, respond with respondData
    httpBackend.expectGET('../data/chats.json').respond(respondData);

    // call DataService.getChats()
    // httpBackend will respond
    var result;
    DataService.getChats().then(function(response) {
      result = response;
    });

    httpBackend.flush();

    expect(result).toEqual(respondData);
  });
});

describe('DataService.getChatsByUserId', function() {
  var DataService,
      httpBackend;

  beforeEach(module('chat'));

  beforeEach(function() {
    inject(function($httpBackend, _DataService_) {
      DataService = _DataService_;
      httpBackend = $httpBackend;
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should respond with chats by user id', function() {
    var users = [
          {"id":0, "firstName":"Peter", "lastName":"Parker", "contacts": [1,2,3,4,5,6,7]},
          {"id":1, "firstName":"Bruce", "lastName":"Banner", "contacts": [0,2,3,4,5,6,7]},
          {"id":2, "firstName":"Steve", "lastName":"Rogers", "contacts": [0,1,3,4,5,6,7]}
        ];
    var chats = [
      {
        "chat_id":0, 
        "participants":[0, 1], 
        "messages": [
          {"msg_id":0, "sender_id":0, "text":"i got da best webz", "datetime":""},
          {"msg_id":1, "sender_id":0, "text":"u must respect", "datetime":""},
          {"msg_id":2, "sender_id":1, "text":"go away", "datetime":""},
          {"msg_id":2, "sender_id":1, "text":"puny spider", "datetime":""}
        ]
      },
      {
        "chat_id":1, 
        "participants":[0, 2, 4], 
        "messages": [
          {"msg_id":0, "sender_id":0, "text":"i got da best webz", "datetime":""},
          {"msg_id":1, "sender_id":0, "text":"u must respect", "datetime":""},
          {"msg_id":2, "sender_id":2, "text":"my shield is better than your webz", "datetime":""},
          {"msg_id":3, "sender_id":1, "text":"smash your shield!", "datetime":""},
          {"msg_id":4, "sender_id":1, "text":"puny spider", "datetime":""}
        ]
      },
      {
        "chat_id":2, 
        "participants":[1, 3], 
        "messages": [
          {"msg_id":0, "sender_id":1, "text":"SMASH", "datetime":""},
          {"msg_id":1, "sender_id":3, "text":"pew pew", "datetime":""}
        ]
      }
    ];

    httpBackend.expectGET('../data/users.json').respond(users);
    httpBackend.expectGET('../data/chats.json').respond(chats);

    var results;
    DataService.getChatsByUserId(0).then(function(response) {
      results = response;
    });

    httpBackend.flush();

    expect(results.user).toEqual(users[0]);
    expect(results.chats.length).toEqual(2);
  });
});