/// <reference path="../../scripts/reference.ts" />
var StorageWebClient;
(function (StorageWebClient) {
    var StorageWebClientHandler = /** @class */ (function () {
        function StorageWebClientHandler(token) {
            this.Initialize(token);
        }
        StorageWebClientHandler.prototype.Initialize = function (token) {
            try {
                this.StorageApp = angular.module('StorageApp', [])
                    .directive('dateFormat', directives.storage.DateFormat.Factory())
                    .directive('uploadFiles', directives.storage.UploadFiles.Factory())
                    .directive('imageUpload', directives.storage.ImageUpload.Factory())
                    .service('StorageService', services.storage.StorageService)
                    .controller('RepositoryController', controllers.storage.RepositoryController)
                    .controller('SharedController', controllers.storage.SharedController);
                //this location provider helps to read query string
                this.StorageApp.config(['$locationProvider', function ($locationProvider) {
                        $locationProvider.html5Mode({
                            enabled: true,
                            requireBase: false
                        });
                    }]);
                this.StorageApp.config(function ($httpProvider) {
                    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                });
            }
            catch (exception) {
                console.log(exception);
            }
        };
        return StorageWebClientHandler;
    }());
    StorageWebClient.StorageWebClientHandler = StorageWebClientHandler;
})(StorageWebClient || (StorageWebClient = {}));
//# sourceMappingURL=storage.handlar.js.map