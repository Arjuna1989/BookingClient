var services;
(function (services) {
    ;
    var BaseService = /** @class */ (function () {
        function BaseService($http) {
            this.httpService = $http;
        }
        BaseService.prototype.ServiceRequest = function (serviceUrl, obj) {
            //request.ClientToken = ConfigurationProvider.GetClientToken();
            //request.SessionToken = ConfigurationProvider.GetSessionToken();
            var serviceHostUrl = "http://api.commercepromote.net/";
            // var serviceHostUrl = "http://localhost:58613/";
            //var serviceHostUrl = "http://localhost:82/";
            //Config structure
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            };
            return this.httpService
                .post(serviceHostUrl + serviceUrl, obj, config)
                .then(function (result) {
                if (result.data != null && result.data.IsError)
                    alert(result.data.ErrorMessage);
                else {
                    var response = result.data;
                    if (response == null) {
                        response = {};
                        response.IsNull = true;
                    }
                    response.Headers = result.headers;
                    return response;
                }
            }, function (exception) {
                console.log(exception);
            });
        };
        BaseService.prototype.ServiceJsonRequest = function (serviceUrl, request) {
            //request.ClientToken = ConfigurationProvider.GetClientToken();
            //request.SessionToken = ConfigurationProvider.GetSessionToken();
            var serviceHostUrl = "http://api.commercepromote.net/";
            // var serviceHostUrl = "http://localhost:58613/";
            //var serviceHostUrl = "http://localhost:82/";
            //Example of config structure
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            var response = this.httpService
                .post(serviceHostUrl + serviceUrl, JSON.stringify(request), config)
                .then(function (result) {
                if (result.data.IsError)
                    alert(result.data.ErrorMessage);
                else {
                    var response = result.data;
                    response.Headers = result.headers;
                    return response;
                }
            }, function (exception) {
                alert("Connection Error");
            });
            return response;
        };
        BaseService.prototype.ServiceFileRequest = function (serviceUrl, obj) {
            //request.ClientToken = ConfigurationProvider.GetClientToken();
            //request.SessionToken = ConfigurationProvider.GetSessionToken();
            var serviceHostUrl = "http://api.commercepromote.net/";
            //  var serviceHostUrl = "http://localhost:58613/";
            //var serviceHostUrl = "http://localhost:82/";
            var formData = new FormData();
            formData.append("model", JSON.stringify(obj.model));
            //formData.append("file", obj.file);
            for (var i = 0; i < obj.file.length; i++) {
                formData.append("file", obj.file[i]);
            }
            //Example of config structure
            var config = {
                headers: {
                    'Content-Type': undefined
                }
            };
            return this.httpService
                .post(serviceHostUrl + serviceUrl, formData, config)
                .then(function (result) {
                if (result.data.IsError)
                    alert(result.data.ErrorMessage);
                else
                    return result.data;
            }, function (exception) {
                alert("Connection Error");
            });
        };
        BaseService.prototype.ExecuteQuery = function (request) {
            return this.ServiceRequest(this.executeQueryServiceUrl, request);
        };
        return BaseService;
    }());
    services.BaseService = BaseService;
})(services || (services = {}));
//# sourceMappingURL=base.service.js.map