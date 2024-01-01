var directives;
(function (directives) {
    var storage;
    (function (storage) {
        var ImageUpload = /** @class */ (function () {
            function ImageUpload($compile, $http) {
                return {
                    restrict: 'AE',
                    scope: {
                        ngModel: '=',
                    },
                    require: "ngModel",
                    template: '<input class="fileUpload" type="file" multiple />' +
                        '<div class="dropzone">' +
                        '<p class="msg">Click or Drag and Drop files to upload</p>' +
                        '</div>' +
                        '<div class="preview clearfix col-md-12">' +
                        '<div class="previewData clearfix col-md-4 col-sm-12"style="height:161px;" ng-repeat="data in previewData track by $index">' +
                        '<div class="previewDetails">' +
                        '<div class="detail" align="left"><b>Name : </b>{{data.name}}</div>' +
                        '<div class="detail" align="left"><b>Type : </b>{{data.type}}</div>' +
                        '<div class="detail" align="left"><b>Size : </b> {{data.size}}</div>' +
                        '</div>' +
                        '<div class="previewControls">' +
                        '<span ng-click="remove(data)" class="circle remove">' +
                        '<i class="fa fa-close"></i>' +
                        '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                    link: function (scope, elem, attrs, ngModel) {
                        scope.removefiles = function () {
                            scope.fileCollection = [];
                            scope.previewData = [];
                        };
                        scope.$on('removefiles', function (event, data) {
                            scope.removefiles();
                        });
                        var formData = new FormData();
                        scope.previewData = [];
                        scope.fileCollection = [];
                        function previewFile(file) {
                            var reader = new FileReader();
                            scope.fileCollection.push(file);
                            var obj = new FormData().append('file', file);
                            reader.onload = function (data) {
                                var src = data.target.result;
                                var size = ((file.size / (1024 * 1024)) > 1) ? (file.size / (1024 * 1024)).toFixed(2) + ' mB' : (file.size / 1024).toFixed(2) + ' kB';
                                scope.$apply(function () {
                                    scope.previewData.push({
                                        'name': file.name, 'size': size, 'type': file.type,
                                        'src': src, 'data': obj
                                    });
                                    ngModel.$modelValue = scope.previewData;
                                    scope.ngModel = scope.fileCollection;
                                });
                            };
                            reader.readAsDataURL(file);
                        }
                        function uploadFile(e, type) {
                            e.preventDefault();
                            var files = null;
                            if (type == "formControl") {
                                files = e.target.files;
                            }
                            else if (type === "drop") {
                                files = e.originalEvent.dataTransfer.files;
                            }
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];
                                previewFile(file);
                                //file restrictions
                                //if ((file.type.indexOf("text") !== -1) || (file.type.indexOf("image") !== -1) || (file.type.indexOf("pdf") !== -1) || (file.type.indexOf("mp4") !== -1) || (file.type.indexOf("vnd.openxmlformats-officedocument.wordprocessingml.document") !== -1)||(file.type.indexOf("vnd.openxmlformats-officedocument.presentationml.presentation") !== -1)) {
                                //previewFile(file);
                                //} else {
                                //alert(file.name + " is not supported");
                                //}
                            }
                        }
                        elem.find('.fileUpload').bind('change', function (e) {
                            uploadFile(e, 'formControl');
                        });
                        elem.find('.dropzone').bind("click", function (e) {
                            $compile(elem.find('.fileUpload'))(scope).trigger('click');
                        });
                        elem.find('.dropzone').bind("dragover", function (e) {
                            e.preventDefault();
                        });
                        elem.find('.dropzone').bind("drop", function (e) {
                            uploadFile(e, 'drop');
                        });
                        scope.upload = function (obj) {
                            $http({
                                method: scope.method, url: scope.url, data: obj.data,
                                headers: { 'Content-Type': undefined }, transformRequest: angular.identity
                            }).then(function (data) {
                            });
                        };
                        scope.remove = function (data) {
                            var index = scope.previewData.indexOf(data);
                            scope.previewData.splice(index, 1);
                            ngModel.$modelValue = scope.previewData;
                            scope.ngModel = scope.fileCollection.splice(index, 1);
                            ;
                        };
                    }
                };
            }
            ImageUpload.Factory = function () {
                var directive = function ($compile, $http) {
                    return new ImageUpload($compile, $http);
                };
                return directive;
            };
            return ImageUpload;
        }());
        storage.ImageUpload = ImageUpload;
    })(storage = directives.storage || (directives.storage = {}));
})(directives || (directives = {}));
//# sourceMappingURL=storage.directives.imageupload.js.map