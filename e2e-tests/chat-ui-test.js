'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('chat ui tests', function() {


  it('should automatically redirect to /list when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/list");
  });

  describe('chat details view', function() {

    beforeEach(function() {
      browser.get('index.html#!/list/0');
      element.all(by.repeater('chatObj in userChats')).get(0).click();
      browser.sleep(2000);
    });

    it('should render chat details when user clicks on a chat', function() {
      var el = element.all(by.tagName('section-header'));
      el.getAttribute('type').then(function(value) {
        expect(value[0]).toEqual('chatDetail');
      })
    });
  });

  describe('chat details send message', function() {
    var chatLength;
    beforeEach(function() {
      browser.get('index.html#!/list/0');
      browser.sleep(2000);
      element.all(by.repeater('chatObj in userChats')).get(0).click();
      browser.sleep(2000);
      element.all(by.repeater('msg in messages')).count().then(function(count) { chatLength = count });
    });

    it('should add a message to the chat', function() {
      element(by.id('msgEl')).sendKeys('this is a test message');
      element(by.css('.send-link')).click();
      browser.sleep(2000);
      element.all(by.repeater('msg in messages')).count().then(function(newCount) {
        expect(newCount).toEqual(chatLength+1);
      });
    })
  })
});
