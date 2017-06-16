module.exports = {
    template: require('./hello.html'),
    controller: function (localStorageService, $http) {
        this.hello = 'Hello World!';

        if (localStorageService.get('token')) {
            $http.defaults.headers.post['x-access-token'] = localStorageService.get('token');
            $http.defaults.headers.put['x-access-token'] = localStorageService.get('token');
            $http.defaults.headers.common['x-access-token'] = localStorageService.get('token');
        }
    }
};
