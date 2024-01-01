var controllers;
(function (controllers) {
    var storage;
    (function (storage) {
        'use strict';
        var RepositoryController = /** @class */ (function () {
            function RepositoryController($scope, $filter, $timeout, $window, StorageService, $rootScope) {
                var _this = this;
                this.$scope = $scope;
                this.$filter = $filter;
                this.$timeout = $timeout;
                this.$window = $window;
                this.StorageService = StorageService;
                this.$rootScope = $rootScope;
                this.Initialize = function (agentId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.CreateUserFolder = _this.CreateUserFolder;
                    _this.$scope.RenameUserFolder = _this.RenameUserFolder;
                    _this.$scope.DeleteUserFolder = _this.DeleteUserFolder;
                    _this.$scope.CreateRootFolder = _this.CreateRootFolder;
                    _this.$scope.CreateUserFiles = _this.CreateUserFiles;
                    _this.$scope.MoveUserFolder = _this.MoveUserFolder;
                    _this.$scope.Selecttree = _this.Selecttree;
                    _this.$scope.Delete = _this.Delete;
                    _this.$scope.ShareFolder = _this.ShareFolder;
                    _this.$scope.CheckBoxChanged = _this.CheckBoxChanged;
                    _this.GetOnlyFolderHierarchy();
                    _this.$scope.RootIncrement = 0;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                };
                this.Selecttree = function (id) {
                    $('#repository-tree').on("ready.jstree", function (e, data) {
                        $('#repository-tree').jstree('select_node', id);
                    });
                };
                this.CreateUserFolder = function (nodeData) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.FolderName = nodeData.node.text;
                    request.Parent = nodeData.node.parent;
                    _this.StorageService.CreateUserFolder(request).then(function (result) {
                        if (result.IsCreated) {
                            $('#repository-tree').jstree('destroy');
                            _this.GetOnlyFolderHierarchy();
                            _this.$scope.Selecttree(result.FolderId);
                        }
                    });
                };
                this.CreateRootFolder = function (nodeData) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.FolderName = nodeData.text;
                    request.Parent = 0;
                    _this.$scope.RootIncrement += 1;
                    if (_this.$scope.RootIncrement < 2) {
                        _this.StorageService.CreateUserFolder(request).then(function (result) {
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                            _this.$scope.RootIncrement = 0;
                            if (result.IsCreated) {
                                $('#repository-tree').jstree('destroy');
                                _this.GetOnlyFolderHierarchy();
                                _this.$scope.Selecttree(result.FolderId);
                            }
                        });
                    }
                };
                this.RenameUserFolder = function (nodeData) {
                    var request = {};
                    request.id = nodeData.node.id;
                    request.FolderName = nodeData.text;
                    _this.StorageService.RenameUserFolder(request).then(function (result) {
                        if (result.IsRenamed) {
                            _this.GetOnlyFolderHierarchy();
                        }
                    });
                };
                this.DeleteUserFolder = function (nodeData) {
                    var request = {};
                    request.id = nodeData.node.id;
                    request.AgentId = _this.$scope.AgentId;
                    _this.StorageService.DeleteUserFolder(request).then(function (result) {
                        if (result.IsDeleted) {
                            $('#repository-tree').jstree('destroy');
                            _this.$scope.userFolderId = request.id;
                            _this.GetOnlyFolderHierarchy();
                        }
                    });
                };
                this.MoveUserFolder = function (nodeData) {
                    var request = {};
                    request.id = nodeData.id;
                    request.parent = nodeData.parent;
                    _this.StorageService.MoveUserFolder(request).then(function (result) {
                        if (result.IsMoved) {
                            $('#repository-tree').jstree('destroy');
                            _this.GetOnlyFolderHierarchy();
                        }
                    });
                };
                this.DownloadZipFile = function (folderid) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = folderid;
                    _this.StorageService.DownloadZippedFolder(request).then(function (result) {
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
                this.GetAgentList = function () {
                    var request = {};
                    request.CompanyID = _this.$scope.AgentId;
                    _this.StorageService.GetAllHrmUsers(request).then(function (result) {
                        _this.$scope.AgentList = result;
                    });
                };
                this.GetAgentGroups = function () {
                    var request = {};
                    request.CompanyID = _this.$scope.AgentId;
                    _this.StorageService.GetHrmGroups(request).then(function (result) {
                        _this.$scope.GroupList = result;
                    });
                };
                this.ShareFolder = function () {
                    _this.$scope.isShareClicked = true;
                    var request = {};
                    if (_this.$scope.Select == 1) {
                        request.AgentId = _this.$scope.SelectedAgent.AgentID;
                        request.UserFolderId = _this.$scope.userFolderId;
                        request.CompanyId = _this.$scope.AgentId;
                        request.Select = _this.$scope.Select;
                    }
                    else if (_this.$scope.Select == 2) {
                        request.GroupIds = _this.$scope.SelectedUserGroups;
                        request.UserFolderId = _this.$scope.userFolderId;
                        request.CompanyId = _this.$scope.AgentId;
                        request.Select = _this.$scope.Select;
                    }
                    else {
                        request.UserFolderId = _this.$scope.userFolderId;
                        request.CompanyId = _this.$scope.AgentId;
                        request.Select = _this.$scope.Select;
                    }
                    _this.StorageService.ShareFolder(request).then(function (result) {
                        if (result.IsShared) {
                            _this.$scope.isShareClicked = false;
                            _this.$scope.isShareSuccess = true;
                            var temp = [];
                            _this.$scope.SelectedGroup = temp;
                            _this.$scope.Select = 1;
                            _this.$timeout(function () {
                                _this.$scope.isShareSuccess = false;
                            }, 5000);
                            $('#shareFolderModal').modal('hide');
                        }
                    });
                };
                this.CheckBoxChanged = function (id) {
                    if (_this.$scope.SelectedGroup[id]) {
                        _this.$scope.SelectedUserGroups.push(id);
                    }
                    else {
                        var index = _this.$scope.SelectedUserGroups.indexOf(id);
                        _this.$scope.SelectedUserGroups.splice(index, 1);
                    }
                };
                this.OpenShareFolderModel = function () {
                    _this.GetAgentList();
                    _this.GetAgentGroups();
                    $('#shareFolderModal').modal('show');
                };
                this.GetOnlyFolderHierarchy = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.StorageService.GetOnlyFolderHierarchy(request).then(function (result) {
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
                                    "Create": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Create",
                                        "action": function (obj) {
                                            $node = tree.create_node($node);
                                        }
                                    },
                                    "Rename": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Rename",
                                        "action": function (obj) {
                                            tree.edit($node);
                                        }
                                    },
                                    "Remove": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Remove",
                                        "action": function (obj) {
                                            tree.delete_node($node);
                                        }
                                    },
                                    "Move": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Move",
                                        "action": function (obj) {
                                            tree.move_node($node);
                                        }
                                    },
                                    "Download": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Download",
                                        "action": function (obj) {
                                            self.DownloadZipFile(self.$scope.userFolderId);
                                        }
                                    },
                                    "Share": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Share",
                                        "action": function (obj) {
                                            self.OpenShareFolderModel();
                                        }
                                    },
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
                        self.GetAllFiles();
                        console.log(self.$scope.userFolderId);
                    });
                    // Create Folder
                    $('#repository-tree').on("create_node.jstree", function (e, data) {
                        if (data.parent != '#') {
                            self.$scope.CreateUserFolder(data);
                        }
                    });
                    // Rename Folder
                    $('#repository-tree').on("rename_node.jstree", function (e, data) {
                        self.$scope.RenameUserFolder(data);
                    });
                    //Delete Folder/Folders
                    $('#repository-tree').on("delete_node.jstree", function (e, data) {
                        self.$scope.DeleteUserFolder(data);
                    });
                    //Create Root Folder
                    $('#addroot').click(function () {
                        $("#repository-tree").jstree("create_node", null, null, "last", function (node) {
                            $('#loader').show();
                            self.$scope.CreateRootFolder(node);
                        });
                    });
                    //Move Folder & Cut Folder
                    $('#repository-tree').on("move_node.jstree", function (e, data) {
                        self.$scope.MoveUserFolder(data.node);
                    });
                    //Download Folder
                    $('#repository-tree').on("get_node", function (e, data) {
                    });
                    //Copy Folder
                    //$('#repository-tree').on("copy_node.jstree", function (e, data) {
                    //	console.log(data.node);
                    //	console.log(data.original);
                    //});
                };
                this.CreateUserFiles = function () {
                    _this.$scope.isSaveClicked = true;
                    if (_this.$scope.userFolderId != null || _this.$scope.userFolderId != undefined) {
                        var fileobj = {};
                        fileobj.AgentId = _this.$scope.AgentId;
                        fileobj.UserFolderId = _this.$scope.userFolderId;
                        var request = {};
                        request.model = fileobj;
                        request.file = _this.$scope.Files;
                        _this.StorageService.CreateUserFiles(request).then(function (result) {
                            if (result.IsCreated) {
                                _this.GetAllFiles();
                                var rootScope = _this.$rootScope;
                                var a = function () {
                                    rootScope.$broadcast('removefiles', {});
                                };
                                a();
                                _this.$scope.isSaveClicked = false;
                                _this.$scope.isSuccess = true;
                                _this.$timeout(function () {
                                    _this.$scope.isSuccess = false;
                                }, 5000);
                            }
                        });
                    }
                    else {
                        alert("Please Select a Folder");
                    }
                };
                this.GetAllFiles = function () {
                    if (_this.$scope.userFolderId != null || _this.$scope.userFolderId != undefined) {
                        var request = {};
                        request.AgentId = _this.$scope.AgentId;
                        request.UserFolderId = _this.$scope.userFolderId;
                        _this.StorageService.GetAllFiles(request).then(function (result) {
                            console.log(result);
                            _this.$scope.FileCollection = result;
                            _this.$scope.isExist = result.IsNull;
                        });
                    }
                };
                this.Delete = function (Id) {
                    var request = {};
                    request.id = Id;
                    _this.StorageService.DeleteUserFile(request).then(function (result) {
                        if (result.IsDeleted) {
                            _this.GetAllFiles();
                            _this.$scope.isdltClicked = false;
                            _this.$scope.isDeleted = true;
                            _this.$timeout(function () {
                                _this.$scope.isDeleted = false;
                            }, 5000);
                        }
                    });
                };
                $('#loader').show();
                $scope.Init = this.Initialize;
                this.$scope.isShareClicked = false;
                this.$scope.isShareSuccess = false;
                this.$scope.isSaveClicked = false;
                this.$scope.isSuccess = false;
                this.$scope.isdltClicked = false;
                this.$scope.isDeleted = false;
                this.$scope.isExist = false;
                $scope.SelectedUserGroups = [];
                $scope.SelectedGroup = [];
                this.$scope.Files = [];
            }
            RepositoryController.$inject = ['$scope', '$filter', '$timeout', '$window', 'StorageService', '$rootScope'];
            return RepositoryController;
        }());
        storage.RepositoryController = RepositoryController;
    })(storage = controllers.storage || (controllers.storage = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=storage.index.controller.js.map