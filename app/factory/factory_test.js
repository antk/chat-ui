'use strict'

describe('DataService.getChats()', function() {
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