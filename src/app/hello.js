module.exports = {
    template: require('./hello.html'),
    controller: function (localStorageService, $http, ENV, $log) {
        this.hello = 'Hello World!';
        if (localStorageService.get('token')) {
            $http.defaults.headers.post['x-access-token'] = localStorageService.get('token');
            $http.defaults.headers.put['x-access-token'] = localStorageService.get('token');
            $http.defaults.headers.common['x-access-token'] = localStorageService.get('token');
        }

        // $log.log(ENV.ProductsDb);
        // var producDb = ENV.ProductsDb;
        // producDb
        // .setItem('some', 'thing')
        // .then(function (value) { $log.log(value); })
        // .catch(function (error) { $log.error(error); });
    }
};
