module services {
    export interface IRequestBase {
        ClientToken: string;
        SessionToken: string;

    }

    export interface IResponseBase {
        ClientToken: string;
        SessionToken: string;
        IsError: boolean;
        ErrorMessage: string;
        Headers: any;
        IsNull: boolean;
    }

    export interface IFileUploadRequest {
        model: any;
        file: any;
    };


    export interface IRequestArray<T> extends services.IRequestBase, Array<T> {
        /** the promise of the original server interaction that created this collection. **/
        $promise: angular.IPromise<IRequestArray<T>>;
        $resolved: boolean;
    }

    export interface IResponseArray<T> extends services.IResponseBase, Array<T> {
        /** the promise of the original server interaction that created this collection. **/
        $promise: angular.IPromise<IResponseArray<T>>;
        $resolved: boolean;
    }

    export interface IBaseService {
        ExecuteQuery(request: IRequestBase): angular.IPromise<void | IResponseBase>;
    }

    export class BaseService implements IBaseService {
        public httpService: angular.IHttpService;

        protected executeQueryServiceUrl: string;

        private clientToken: string;
        private sessionToken: string;

        constructor($http: angular.IHttpService) {
            this.httpService = $http;

        }

        public ServiceRequest<TRequest extends IRequestBase, TResponse extends IResponseBase>(serviceUrl: string, obj: TRequest): angular.IPromise<void | TResponse> {
            //request.ClientToken = ConfigurationProvider.GetClientToken();
            //request.SessionToken = ConfigurationProvider.GetSessionToken();

                var serviceHostUrl = "http://api.commercepromote.net/";
             // var serviceHostUrl = "http://localhost:58613/";
            //var serviceHostUrl = "http://localhost:82/";

            //Config structure
            var config: angular.IRequestShortcutConfig = {
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
            }

            return this.httpService
                .post<TResponse>(serviceHostUrl + serviceUrl, obj, config)
                .then(
                    (result) => {
                        if (result.data != null && result.data.IsError)
                            alert(result.data.ErrorMessage);
                        else {
                            var response = <TResponse>result.data;
                            if (response == null) {
                                response = <TResponse>{};
                                response.IsNull = true;
                            }
                            response.Headers = result.headers;
                            return response;
                        }

                    },
                    (exception) => {
                        console.log(exception);
                    });
        }

        public ServiceJsonRequest<TRequest extends IRequestBase, TResponse extends IResponseBase>(serviceUrl: string, request: TRequest): angular.IPromise<void | TResponse> {
            //request.ClientToken = ConfigurationProvider.GetClientToken();
            //request.SessionToken = ConfigurationProvider.GetSessionToken();

                var serviceHostUrl = "http://api.commercepromote.net/";
             // var serviceHostUrl = "http://localhost:58613/";
            //var serviceHostUrl = "http://localhost:82/";

            //Example of config structure
            var config: angular.IRequestShortcutConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            var response = this.httpService
                .post<TResponse>(serviceHostUrl + serviceUrl, JSON.stringify(request), config)
                .then(
                    (result) => {
                        if (result.data.IsError)
                            alert(result.data.ErrorMessage);
                        else {
                            var response = <TResponse>result.data;
                            response.Headers = result.headers;
                            return response;
                        }

                    },
                    (exception) => {
                        alert("Connection Error");
                    });
            return response;
        }

        public ServiceFileRequest<TRequest extends IFileUploadRequest, TResponse extends IResponseBase>(serviceUrl: string, obj: TRequest): angular.IPromise<void | TResponse> {
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
            var config: angular.IRequestShortcutConfig = {
                headers: {
                    'Content-Type': undefined
                }
            }

            return this.httpService
                .post<TResponse>(serviceHostUrl + serviceUrl, formData, config)
                .then(
                    (result) => {
                        if (result.data.IsError)
                            alert(result.data.ErrorMessage);
                        else
                            return <TResponse>result.data;
                    },
                    (exception) => {
                        alert("Connection Error");
                    });

        }

        ExecuteQuery(request: IRequestBase): angular.IPromise<void | IResponseBase> {
            return this.ServiceRequest<IRequestBase, IResponseBase>(this.executeQueryServiceUrl, request);
        }
    }
}