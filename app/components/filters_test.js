'use strict'

describe('test image filter', function() {
  
  var $filter;

  beforeEach(module('chat'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should replace a string containing an image tag with text', function() {
    var str = 'here is an image <img src="http://img/src.jpg"/>';
    var imgFilter = $filter('imgFilter');
    expect(imgFilter(str)).toEqual('<em>image attachment</em>');
  });
});

describe('test datetime filter', function() {

  var $filter;

  beforeEach(module('chat'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return a readable date/time given milliseconds', function() {
    var milliseconds = 1470957611337;
    var datetime = $filter('datetime');
    expect(datetime(milliseconds)).toEqual('8/12/2016 - 4:20pm');
  });

});