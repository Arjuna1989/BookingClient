/// <reference path="../../scripts/reference.ts" />
var BookingWebClient;
(function (BookingWebClient) {
    var BookingWebClientHandler = /** @class */ (function () {
        function BookingWebClientHandler(token) {
            this.Initialize(token);
        }
        BookingWebClientHandler.prototype.Initialize = function (token) {
            try {
                this.BookingApp = angular.module('BookingApp', [])
                    .directive('dateFormat', directives.support.DateFormat.Factory())
                    .directive('imageUpload', directives.support.ImageUpload.Factory())
                    .service('BookingService', services.booking.BookingService)
                    .controller('BookingDetailsController', controllers.bookingclient.BookingDetailsController)
                    .controller('EditBookingController', controllers.bookingclient.EditBookingController)
                    .controller('CreateBookingController', controllers.bookingclient.CreateBookingController)
                    .controller('CreateReservationController', controllers.bookingclient.CreateReservationController)
                    .controller('GetReservedAgentController', controllers.bookingclient.GetReservedAgentController)
                    .controller('SeeAllReservationController', controllers.bookingclient.SeeAllReservationController)
                    .controller('DisplayReservationGridController', controllers.bookingclient.DisplayReservationGridController);
                //this location provider helps to read query string
                this.BookingApp.config(['$locationProvider', function ($locationProvider) {
                        $locationProvider.html5Mode({
                            enabled: true,
                            requireBase: false
                        });
                    }]);
                this.BookingApp.config(function ($httpProvider) {
                    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                });
            }
            catch (exception) {
                console.log(exception);
            }
        };
        return BookingWebClientHandler;
    }());
    BookingWebClient.BookingWebClientHandler = BookingWebClientHandler;
})(BookingWebClient || (BookingWebClient = {}));
//# sourceMappingURL=bookinge.handlar.js.map