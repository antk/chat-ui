'use strict'

angular.module('chat')

.filter('imgFilter', function() {
  // replace messages with image attachments with a simple msg
  // mostly for use in chat list view
  return function(str) {
    return str.match(/<img\s.*\/>/) ? "<em>image attachment</em>" : str;
  };
})

.filter('datetime', function() {
  // convert milliseconds to readable date
  return function(milliseconds) {
    var d = new Date(milliseconds);
    var h = d.getHours();
    var m = (d.getMinutes()+'').length === 1 ? '0'+d.getMinutes() : d.getMinutes();
    var h12 = h > 12 ? h - 12 : h;
    var ampm = h < 12 ? 'am' : 'pm';
    var date = (d.getMonth()+1) + '/' + (d.getDate()+1) + '/' + d.getFullYear();
    return date + ' - ' + h12 + ':' + m + ampm;
  };
})