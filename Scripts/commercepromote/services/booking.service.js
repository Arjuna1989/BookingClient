var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var services;
(function (services) {
    var booking;
    (function (booking) {
        'use strict';
        var BookingService = /** @class */ (function (_super) {
            __extends(BookingService, _super);
            function BookingService($http) {
                var _this = _super.call(this, $http) || this;
                _this.executeQueryServiceUrl = 'api/booking/';
                return _this;
            }
            BookingService.prototype.GetReservationItems = function (request) {
                return this.ServiceRequest('/api/booking/GetReservationItemByAgentId', request);
            };
            BookingService.prototype.GetReservationItem = function (request) {
                return this.ServiceRequest('/api/booking/GetReservationItemsById', request);
            };
            BookingService.prototype.GetReservationItemCategory = function (request) {
                return this.ServiceRequest('/api/booking/GetReservationCategories', request);
            };
            BookingService.prototype.CreateReservationItemCategory = function (request) {
                return this.ServiceRequest('/api/booking/CreateReservationCategory', request);
            };
            BookingService.prototype.DeleteAttachmentById = function (request) {
                return this.ServiceRequest('/api/booking/DeleteReservationItemImg', request);
            };
            BookingService.prototype.UpdateReservation = function (request) {
                return this.ServiceFileRequest('/api/booking/UpdateReservationItem', request);
            };
            BookingService.prototype.CreateReservation = function (request) {
                return this.ServiceFileRequest('/api/booking/CreateReservationItem', request);
            };
            BookingService.prototype.RemoveRange = function (request) {
                return this.ServiceRequest('/api/booking/DeleteReservationTimeById', request);
            };
            BookingService.prototype.GetReservationItemByCategoryId = function (request) {
                return this.ServiceRequest('/api/booking/GetAllReservationItemsByCategoryId', request);
            };
            BookingService.prototype.GetReservationTimeRangeById = function (request) {
                return this.ServiceRequest('/api/booking/GetReservationTimeRangeById', request);
            };
            BookingService.prototype.CreateBooking = function (request) {
                return this.ServiceJsonRequest('/api/booking/CreateReservation', request);
            };
            BookingService.prototype.GetReservedItems = function (request) {
                return this.ServiceRequest('/api/booking/GetAllReservationByGroupId', request);
            };
            BookingService.prototype.GetAgentsReservedItems = function (request) {
                return this.ServiceRequest('/api/booking/GetAllReservationByUserId', request);
            };
            BookingService.prototype.DeleteReservedItem = function (request) {
                return this.ServiceRequest('/api/booking/DeleteResDateTimeRangeById', request);
            };
            BookingService.prototype.FilterReservations = function (request) {
                return this.ServiceRequest('/api/booking/FilterReservations', request);
            };
            BookingService.prototype.GetAllReservationByGroupId = function (request) {
                return this.ServiceRequest('/api/booking/GetAllReservationByGroupId', request);
            };
            BookingService.prototype.GetAgent = function (request) {
                return this.ServiceRequest('/api/booking/GetAgentByAgentId', request);
            };
            BookingService.prototype.SendMailToAgent = function (request) {
                return this.ServiceRequest('/api/booking/SendMailToAgent', request);
            };
            BookingService.$inject = ['$http'];
            return BookingService;
        }(services.BaseService));
        booking.BookingService = BookingService;
    })(booking = services.booking || (services.booking = {}));
})(services || (services = {}));
//# sourceMappingURL=booking.service.js.map