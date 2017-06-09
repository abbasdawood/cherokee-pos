describe('inventoryService', function() {

    /*var inventoryService, ENV, scope, deferred, httpBackend;

    beforeEach(function() {
        module('stock');
        module('config');

        inject(function($injector) {
            inventoryService = $injector.get('inventoryService');
            httpBackend = $injector.get('$httpBackend');
            ENV = $injector.get('ENV');
            scope = $injector.get('$rootScope').$new();
            deferred = $injector.get('$q').defer();
        });

        Parse.initialize(ENV.parseAPIKey, ENV.parseJsKey);
        Parse.serverURL = ENV.serverURL + ENV.parsePath;
        if (!Parse.User.current()) {
            Parse.User.logIn('8454822263', '12345678');
        }
    });

    describe('instantiation', function() {
        it('should expect the factory to be instantiated', function() {
            expect(inventoryService).toBeDefined();
        });
    });

    describe('addItem()', function() {
        it('should add an item', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(inventoryService, 'addItem').and.returnValue(deferred.promise);
            inventoryService.addItem({
                type: 'type1',
                name: 'ABBAS',
                threshold: '12',
                measure: 'kg',
                class: 'sample',
                openingStock: '0.50',
                cost:'695.00'
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.addItem).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should call parse backend to add an item', function() {
            spyOn(Parse.Object.prototype, 'set');
            deferred.resolve({ id: 1 });
            spyOn(Parse.Object.prototype, 'save').and.returnValue(deferred.promise);
            inventoryService.addItem({ type: 'type1', name: 'ABBAS', threshold: '12', measure: 'kg', class: 'sample' });
            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('type', 'type1');

            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('name', 'abbas');
            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('measure', 'kg');
            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('class', 'sample');

            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('threshold', 12);

            expect(Parse.Object.prototype.save).toHaveBeenCalled();
            expect(deferred.promise.$$state.value).toEqual({ id: 1 });
        });

        it('should return error if add item is incorrect', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'addItem').and.returnValue(deferred.promise);
            inventoryService.addItem({
                type: 'type1',
                name: 'ABBAS',
                threshold: '12',
                measure: 'kg',
                class: 'sample'
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.addItem).toHaveBeenCalled();
            expect(res).toBeUndefined(1);
            expect(err).toEqual(0);
        });
    });

    describe('updateItem()', function() {
        it('should update an item', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(inventoryService, 'updateItem').and.returnValue(deferred.promise);
            inventoryService.updateItem({
                id: 'type1',
                threshold: 12
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.updateItem).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should call parse backend to update an item', function() {
            deferred.resolve({ id: 1 });
            spyOn(Parse.Query.prototype, 'get').and.returnValue(deferred.promise);
            inventoryService.updateItem({ type: 'type1', threshold: '12' });
            expect(Parse.Query.prototype.get).toHaveBeenCalled();
            expect(deferred.promise.$$state.value).toEqual({ id: 1 });
        });

        it('should return error if update item is incorrect', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'updateItem').and.returnValue(deferred.promise);
            inventoryService.updateItem({
                id: 'type1',
                threshold: 12
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.updateItem).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('getStoreQuantity()', function() {
        it('should get store qty for an item', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(inventoryService, 'getStoreQuantity').and.returnValue(deferred.promise);
            inventoryService.getStoreQuantity({
                id: 'type1',
                threshold: 12
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getStoreQuantity).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if update item is incorrect', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getStoreQuantity').and.returnValue(deferred.promise);
            inventoryService.getStoreQuantity({
                item: 'type1',
                storeId: 'store1'
            }).then(function(itemId) {
                res = itemId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getStoreQuantity).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('getItems()', function() {
        it('should get store qty for an item', function() {
            var res, err;
            deferred.resolve([{ id: 1 }]);
            spyOn(inventoryService, 'getItems').and.returnValue(deferred.promise);
            inventoryService.getItems(0, 0, 0, 'fg', 'online', 'store1').then(function(items) {
                res = items;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getItems).toHaveBeenCalled();
            expect(res.length).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if update item is incorrect', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getItems').and.returnValue(deferred.promise);
            inventoryService.getItems(0, 0, 0, 'fg', 'online', 'store1').then(function(items) {
                res = items;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getItems).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('getItem()', function() {
        it('should get item info', function() {
            var res, err;
            deferred.resolve({ id: 1 });
            spyOn(inventoryService, 'getItem').and.returnValue(deferred.promise);
            inventoryService.getItem('item1').then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getItem).toHaveBeenCalled();
            expect(res.id).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should return error if item info is not available', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getItem').and.returnValue(deferred.promise);
            inventoryService.getItem('item1').then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getItem).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('checkName()', function() {
        it('should check unique name', function() {
            var res, err;
            deferred.resolve(true);
            spyOn(inventoryService, 'checkName').and.returnValue(deferred.promise);
            inventoryService.checkName('item1').then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.checkName).toHaveBeenCalled();
            expect(res).toBeTruthy();
            expect(err).toBeUndefined();
        });

        it('should return error if name is not unique', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'checkName').and.returnValue(deferred.promise);
            inventoryService.checkName('item1').then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.checkName).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('getThreshold()', function() {
        it('should get the threshold settings', function() {
            var res, err;
            deferred.resolve(20);
            spyOn(inventoryService, 'getThreshold').and.returnValue(deferred.promise);
            inventoryService.getThreshold().then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getThreshold).toHaveBeenCalled();
            expect(res).toBe(20);
            expect(err).toBeUndefined();
        });

        it('should return error if name is not unique', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getThreshold').and.returnValue(deferred.promise);
            inventoryService.getThreshold().then(function(item) {
                res = item;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getThreshold).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });


    describe('getVendors()', function() {
        it('should get the vendors', function() {
            var res, err;
            deferred.resolve([{ id: 1 }]);
            spyOn(inventoryService, 'getVendors').and.returnValue(deferred.promise);
            inventoryService.getVendors().then(function(vendors) {
                res = vendors;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getVendors).toHaveBeenCalled();
            expect(res.length).toBe(1);
            expect(err).toBeUndefined();
        });

        it('should return error if vendors not found', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getVendors').and.returnValue(deferred.promise);
            inventoryService.getVendors().then(function(vendors) {
                res = vendors;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getVendors).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('getExpenses()', function() {
        it('should get the expenses', function() {
            var res, err;
            deferred.resolve([{ id: 1 }]);
            spyOn(inventoryService, 'getExpenses').and.returnValue(deferred.promise);
            inventoryService.getExpenses().then(function(expenses) {
                res = expenses;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getExpenses).toHaveBeenCalled();
            expect(res.length).toBe(1);
            expect(err).toBeUndefined();
        });

        it('should return error if expenses not found', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'getExpenses').and.returnValue(deferred.promise);
            inventoryService.getExpenses().then(function(expenses) {
                res = expenses;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.getExpenses).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });

    describe('addVendor()', function() {
        it('should add a vendor', function() {
            var res, err;
            deferred.resolve(1);
            spyOn(inventoryService, 'addVendor').and.returnValue(deferred.promise);
            inventoryService.addVendor('vendor1').then(function(vendorId) {
                res = vendorId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.addVendor).toHaveBeenCalled();
            expect(res).toEqual(1);
            expect(err).toBeUndefined();
        });

        it('should call parse backend to add a vendor', function() {
            spyOn(Parse.Object.prototype, 'set');
            deferred.resolve({ id: 1 });
            spyOn(Parse.Object.prototype, 'save').and.returnValue(deferred.promise);
            inventoryService.addVendor('VENDOR1');

            expect(Parse.Object.prototype.set).toHaveBeenCalledWith('name', 'vendor1');

            expect(Parse.Object.prototype.save).toHaveBeenCalled();
            expect(deferred.promise.$$state.value).toEqual({ id: 1 });
        });

        it('should return error if add vendor fails', function() {
            var res, err;
            deferred.reject(0);
            spyOn(inventoryService, 'addVendor').and.returnValue(deferred.promise);
            inventoryService.addVendor('VENDOR1').then(function(vendorId) {
                res = vendorId;
            }, function(error) {
                err = error;
            });
            scope.$digest();
            expect(inventoryService.addVendor).toHaveBeenCalled();
            expect(res).toBeUndefined();
            expect(err).toEqual(0);
        });
    });*/

});
