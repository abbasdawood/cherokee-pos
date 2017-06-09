describe('stockService', function() {

    var stockService, ENV, deferred, deferred1, deferred2, scope, window, commonService, Dexie, localStorageService, Offline, httpBackend;


    beforeEach(function() {
        module('cherokee');
        module('stock');
        module('config');
        module('common');
        module('LocalStorageModule');

        inject(function($injector) {
            stockService = $injector.get('stockService');
            ENV = $injector.get('ENV');
            localStorageService = $injector.get('localStorageService');
            scope = $injector.get('$rootScope').$new();
            deferred = $injector.get('$q').defer();
            deferred1 = $injector.get('$q').defer();
            deferred2 = $injector.get('$q').defer();
            window = $injector.get('$window');
            httpBackend = $injector.get('$httpBackend');

            Dexie = window.Dexie;
            commonService = $injector.get('commonService');
            Offline = window.Offline;
        });

        window.localStorage.clear();

        Parse.initialize(ENV.parseAPIKey, ENV.parseJsKey);
        Parse.serverURL = ENV.serverURL + ENV.parsePath;
        Parse.User.logIn('8454822263', '12345678');

        httpBackend
            .whenPOST('http://localhost:1337/stock/product/')
            .respond({ id: '123456' });
    });

    afterEach(function() {
        Parse.User.logOut();
    });

    describe('instantiation', function() {
        it('should expect the factory to be instantiated', function() {
            expect(stockService).toBeDefined();
        });
    });

    describe('createProduct()', function() {

        beforeEach(function() {
            httpBackend.expectPOST('http://localhost:1337/stock/product/');
            spyOn(stockService, 'createProduct').and.returnValue(deferred.promise);

        });

        it('should create a new product', function() {
            var res, err;
            deferred.resolve(1);
            stockService.createProduct({
                name: 'sample test'
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(stockService.createProduct).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if add item is incorrect', function() {
            var res, err;
            deferred.reject(0);
            stockService.createProduct({
                name: 'test',
                order: '1',
                rate: '12',
                category: 'test cat'
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(stockService.createProduct).toHaveBeenCalled();
            expect(res).toBeUndefined(1);
            expect(err).toEqual(0);
        });
    });

    describe('toggleActive()', function() {

        beforeEach(function() {
            spyOn(Parse.Query.prototype, 'get').and.returnValue(deferred.promise);
        });

        it('should toggle the product state to active', function() {
            var res, err;
            spyOn(Parse.Object.prototype, 'set');
            deferred.resolve({ id: 1 });
            deferred1.resolve();
            spyOn(Parse.Object.prototype, 'save').and.returnValue(deferred1.promise);
            stockService.toggleActive().then(function(response) {
                res = response;
            }, function(error) {
                err = error;
            });

            expect(Parse.Query.prototype.get).toHaveBeenCalled();
            scope.$digest();
            expect(deferred.promise.$$state.value).toEqual({ id: 1 });
        });
    });

    describe('getProductStats()', function() {
        beforeEach(function() {
            httpBackend.expectGET('http://localhost:1337/stock/stats/');
        });

        it('should get product stats', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(stockService, 'getProductStats').and.returnValue(deferred.promise);
            stockService.getProductStats('123')
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.getProductStats).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if an an error is reported', function() {
            var res, err;
            deferred.reject(0);
            spyOn(stockService, 'getProductStats').and.returnValue(deferred.promise);
            stockService.getProductStats('123')
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.getProductStats).toHaveBeenCalled();
            expect(res).toBeUndefined(1);
            expect(err).toEqual(0);
        });
    });

    describe('getProducts()', function() {
        beforeEach(function() {
            httpBackend.expectGET('http://localhost:1337/stock/products/');
        });

        it('should get products', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(stockService, 'getProducts').and.returnValue(deferred.promise);
            stockService.getProducts('123')
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.getProducts).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if an an error is reported', function() {
            var res, err;
            deferred.reject(0);
            spyOn(stockService, 'getProducts').and.returnValue(deferred.promise);
            stockService.getProducts('123')
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.getProducts).toHaveBeenCalled();
            expect(res).toBeUndefined(1);
            expect(err).toEqual(0);
        });
    });

    describe('updateProduct()', function() {
        beforeEach(function() {
            httpBackend.expectPUT('http://localhost:1337/stock/product/');
            spyOn(stockService, 'updateProduct').and.returnValue(deferred.promise);
        });

        it('should update the product', function() {
            var res, err;
            deferred.resolve(1);
            stockService.updateProduct({ id: '123' })
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.updateProduct).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if an an error is reported', function() {
            var res, err;
            deferred.reject(0);
            stockService.updateProduct({ id: '123' })
                .then(function(itemId) {
                    res = itemId;
                }, function(error) {
                    err = error;
                });
            scope.$digest();
            expect(stockService.updateProduct).toHaveBeenCalled();
            expect(res).toBeUndefined(1);
            expect(err).toEqual(0);
        });
    });

});
