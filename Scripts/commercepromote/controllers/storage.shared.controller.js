var controllers;
(function (controllers) {
    var storage;
    (function (storage) {
        'use strict';
        var SharedController = /** @class */ (function () {
            function SharedController($scope, $filter, $timeout, $window, StorageService) {
                var _this = this;
                this.$scope = $scope;
                this.$filter = $filter;
                this.$timeout = $timeout;
                this.$window = $window;
                this.StorageService = StorageService;
                this.Initialize = function (agentId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.isExist = false;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                    _this.GetOnlySharedFolderHierarchy();
                };
                this.DownloadZippedSharedFolder = function (folderid) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = folderid;
                    _this.StorageService.DownloadZippedSharedFolder(request).then(function (result) {
                        _this.$scope.ZipPath = result.ZipFilePath;
                        _this.$window.open(_this.$scope.ZipPath);
                        _this.$timeout(function () {
                            _this.DeleteZipFile(result.ZipName);
                        }, 10000);
                    });
                };
                this.DeleteZipFile = function (ZipFileName) {
                    var request = {};
                    request.ZipFileName = ZipFileName;
                    _this.StorageService.DeleteZipFile(request).then(function (result) {
                    });
                };
                this.GetAllUserSharedFiles = function () {
                    if (_this.$scope.userFolderId != null || _this.$scope.userFolderId != undefined) {
                        var request = {};
                        request.AgentId = _this.$scope.AgentId;
                        request.UserFolderId = _this.$scope.userFolderId;
                        _this.StorageService.GetAllUserSharedFiles(request).then(function (result) {
                            _this.$scope.FileCollection = result;
                            _this.$scope.isExist = result.IsNull;
                        });
                    }
                };
                this.GetOnlySharedFolderHierarchy = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.StorageService.GetOnlySharedFolderHierarchy(request).then(function (result) {
                        _this.$scope.FolderTree = result;
                        var datacollection = [];
                        for (var i = 0; i < result.length; i++) {
                            var obj = {};
                            obj.id = result[i].id;
                            obj.text = result[i].text;
                            obj.children = result[i].children;
                            datacollection.push(obj);
                        }
                        _this.OnLoadFoldertree(datacollection);
                    });
                };
                this.OnLoadFoldertree = function (datacollection) {
                    var self = _this;
                    $('#repository-tree').jstree({
                        'core': {
                            'data': datacollection,
                            "check_callback": true,
                        },
                        "plugins": [
                            "dnd", "contextmenu",
                        ],
                        "contextmenu": {
                            "items": function ($node) {
                                var tree = $("#repository-tree").jstree(true);
                                return {
                                    "Download": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Download",
                                        "action": function (obj) {
                                            self.DownloadZippedSharedFolder(self.$scope.userFolderId);
                                        }
                                    }
                                };
                            }
                        }
                    });
                    $('#repository-tree').on("changed.jstree", function (e, data) {
                        var i, j, r = [], userFolderId;
                        for (i = 0, j = data.selected.length; i < j; i++) {
                            r.push(data.instance.get_node(data.selected[i]).text);
                            userFolderId = data.instance.get_node(data.selected[i]).id;
                        }
                        $('#event_result').html('Selected Folder: ' + r.join(', '));
                        self.$scope.userFolderId = userFolderId;
                        self.GetAllUserSharedFiles();
                        console.log(self.$scope.userFolderId);
                    });
                };
                $('#loader').show();
                $scope.Init = this.Initialize;
            }
            SharedController.$inject = ['$scope', '$filter', '$timeout', '$window', 'StorageService'];
            return SharedController;
        }());
        storage.SharedController = SharedController;
    })(storage = controllers.storage || (controllers.storage = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=storage.shared.controller.js.map