'use strict';

describe('kiosk', function() {
  beforeEach(module('ng-kiosk'));

  var $compile, 
      $rootScope,
      $httpBackend;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should compile the kiosk element to a div', function() {
      var directiveHtml = '<kiosk></kiosk>',
          element = $compile(directiveHtml)($rootScope);
      
      expect(element[0].tagName).toEqual('DIV');
  }); 

  it('should set the data url to what is in the src attribute', function() {
      var directiveHtml = '<kiosk src="http://jasonandbrianrcool.com/api"></kiosk>',
          element = $compile(directiveHtml)($rootScope);
      
      expect($rootScope.dataUrl).toEqual('http://jasonandbrianrcool.com/api');
  });

  it('should set error html if the src attribute is not set', function() {
      var directiveHtml = '<kiosk></kiosk>',
          element = $compile(directiveHtml)($rootScope),
          expected = '<p><strong>ng-kiosk:src attribute not set</strong></p>';
      
      expect(element.html()).toEqual(expected);
  });

  it('should make an http request to the url in the src attribute', function() {
      var directiveHtml = '<kiosk src="http://geocities.com"></kiosk>';

      $httpBackend.expectGET('http://geocities.com').respond(200);
      $rootScope.$apply(function() {
        $compile(directiveHtml)($rootScope);
      });

      $httpBackend.flush();
   });

  it('should store the request result on the scope', function() {
      var directiveHtml = '<kiosk src="http://geocities.com"></kiosk>',
          response = '{"_links":{}}';

      $httpBackend.expectGET('http://geocities.com').respond(200, response);
      $rootScope.$apply(function() {
        $compile(directiveHtml)($rootScope);
      });

      $httpBackend.flush();
      expect($rootScope.data).toEqual(JSON.parse(response));
   });
});
