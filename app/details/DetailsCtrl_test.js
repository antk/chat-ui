describe('DetailsCtrl', function() {
  var scope, createController;

  beforeEach(module('chat'));
  beforeEach(inject(
    function($rootScope, $controller) {
      scope = $rootScope.$new();

      createController = function() {
        return $controller('DetailsCtrl', {
          '$scope': scope,
          '$routeParams': {id: -1}
        });
      };
    }
  ));

  it('should detect a new chat', function() {
    var controller = createController();
    expect(scope.newChat).toEqual(true);
  });

});