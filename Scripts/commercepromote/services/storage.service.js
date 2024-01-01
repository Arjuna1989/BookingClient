var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var services;
(function (services) {
    var storage;
    (function (storage) {
        'use strict';
        var StorageService = /** @class */ (function (_super) {
            __extends(StorageService, _super);
            function StorageService($http) {
                var _this = _super.call(this, $http) || this;
                _this.executeQueryServiceUrl = 'api/storage/';
                return _this;
            }
            StorageService.prototype.CreateUserFolder = function (request) {
                return this.ServiceRequest('api/storage/CreateUserFolder', request);
            };
            StorageService.prototype.RenameUserFolder = function (request) {
                return this.ServiceRequest('api/storage/RenameUserFolder', request);
            };
            StorageService.prototype.MoveUserFolder = function (request) {
                return this.ServiceRequest('api/storage/MoveUserFolder', request);
            };
            StorageService.prototype.DeleteUserFolder = function (request) {
                return this.ServiceRequest('api/storage/DeleteUserFolder', request);
            };
            StorageService.prototype.DeleteUserFile = function (request) {
                return this.ServiceRequest('api/storage/DeleteUserFile', request);
            };
            StorageService.prototype.CreateUserFiles = function (request) {
                return this.ServiceFileRequest('/api/storage/CreateUserFiles', request);
            };
            StorageService.prototype.GetOnlyFolderHierarchy = function (request) {
                return this.ServiceRequest('api/storage/GetOnlyFolderHierarchy', request);
            };
            StorageService.prototype.GetOnlySharedFolderHierarchy = function (request) {
                return this.ServiceRequest('api/storage/GetOnlySharedFolderHierarchy', request);
            };
            StorageService.prototype.GetAllFiles = function (request) {
                return this.ServiceRequest('api/storage/GetAllFiles', request);
            };
            StorageService.prototype.GetAllUserSharedFiles = function (request) {
                return this.ServiceRequest('api/storage/GetAllUserSharedFiles', request);
            };
            StorageService.prototype.DownloadZippedFolder = function (request) {
                return this.ServiceRequest('api/storage/DownloadZipFile', request);
            };
            StorageService.prototype.DownloadZippedSharedFolder = function (request) {
                return this.ServiceRequest('api/storage/DownloadZippedSharedFolder', request);
            };
            StorageService.prototype.DeleteZipFile = function (request) {
                return this.ServiceRequest('api/storage/DeleteZipFile', request);
            };
            StorageService.prototype.GetAllHrmUsers = function (request) {
                return this.ServiceRequest('api/hrm/GetAllHrmUsers', request);
            };
            StorageService.prototype.GetHrmGroups = function (request) {
                return this.ServiceRequest('api/hrm/GetHrmGroups', request);
            };
            StorageService.prototype.ShareFolder = function (request) {
                return this.ServiceJsonRequest('api/storage/ShareFolder', request);
            };
            StorageService.$inject = ['$http'];
            return StorageService;
        }(services.BaseService));
        storage.StorageService = StorageService;
    })(storage = services.storage || (services.storage = {}));
})(services || (services = {}));
//# sourceMappingURL=storage.service.js.map