var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var CreateBookingController = /** @class */ (function () {
            function CreateBookingController($scope, $sce, $timeout, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.BookingService = BookingService;
                this.InitializeCommands = function (agentId, groupId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.GroupId = groupId;
                    _this.$scope.isSaveClicked = false;
                    _this.$scope.isSuccess = false;
                    _this.$scope.CreateReservation = _this.CreateReservation;
                    _this.$scope.CreateReservationItemCategory = _this.CreateReservationItemCategory;
                    _this.$scope.getTime = _this.getTime;
                    _this.$scope.RemoveRange = _this.RemoveRange;
                    _this.GetReservationItemCategory();
                    //this.GetReservationItem(this.$scope.AgentId);
                };
                //private GetReservationItem = (Id: number): void => {
                //    var request = <model.booking.IGetReservationItemRequest>{};
                //    request.AgentId = this.$scope.AgentId;
                //    this.BookingService.GetReservationItem(request).then((result: model.booking.IGetReservationItemResponse) => {
                //        if (!result.IsNull) {
                //        }
                //        else {
                //            this.$scope.ReservationItem = result;
                //        }
                //    });
                //}
                this.GetReservationItemCategory = function () {
                    var request = {};
                    request.GroupId = _this.$scope.GroupId > 0 ? _this.$scope.GroupId : _this.$scope.AgentId;
                    _this.BookingService.GetReservationItemCategory(request).then(function (result) {
                        if (!result) {
                            $('#loader').fadeOut();
                        }
                        else {
                            $('#loader').fadeOut();
                            _this.$scope.Categories = result;
                        }
                    });
                };
                this.CreateReservationItemCategory = function (arg) {
                    arg.GroupId = _this.$scope.GroupId > 0 ? _this.$scope.GroupId : _this.$scope.AgentId;
                    _this.BookingService.CreateReservationItemCategory(arg).then(function (result) {
                        if (!result) {
                        }
                        else {
                            _this.$scope.Category = {};
                            $('#createCategory').modal('hide');
                            _this.GetReservationItemCategory();
                        }
                    });
                };
                this.CreateReservation = function (arg) {
                    _this.$scope.isSaveClicked = true;
                    arg.TimeRange = _this.$scope.TimeRange;
                    arg.AgentId = _this.$scope.AgentId;
                    var updateRequest = {};
                    updateRequest.model = arg;
                    updateRequest.file = !_this.$scope.Files ? [] : _this.$scope.Files;
                    console.log(updateRequest);
                    _this.BookingService.CreateReservation(updateRequest).then(function (result) {
                        if (!result.IsCreated) {
                        }
                        else {
                            _this.$scope.ReservationItem = {};
                            _this.$scope.TimeRange = [];
                            _this.$scope.Files = [];
                            $('.timepicker').wickedpicker();
                            _this.$scope.isSaveClicked = false;
                            _this.$scope.isSuccess = true;
                            _this.$timeout(function () {
                                _this.$scope.isSuccess = false;
                            }, 5000);
                            //  this.GetReservationItem();
                        }
                    });
                };
                this.getTime = function () {
                    var timepickers = $('.timepicker').wickedpicker();
                    // if (!this.$scope.TimeRange) this.$scope.TimeRange = <services.IResponseArray<model.booking.ITimeRange>>{};
                    var TimeValue = {};
                    TimeValue.StartTime = timepickers.wickedpicker('time', 0);
                    TimeValue.EndTime = timepickers.wickedpicker('time', 1);
                    _this.$scope.TimeRange.push(TimeValue);
                };
                this.RemoveRange = function (arg, Id) {
                    if (window.confirm("Do you really want to Delete this range?")) {
                        _this.$scope.TimeRange.splice(Id, 1);
                        if (arg.Id != null) {
                            var request = {};
                            request.Id = arg.Id;
                            _this.BookingService.RemoveRange(request).then(function (result) {
                            });
                        }
                    }
                };
                $scope.Service = BookingService;
                $('#loader').show();
                this.$scope.ReservationItem = {};
                this.$scope.Categories = {};
                this.$scope.Category = {};
                this.$scope.TimeRange = [];
                this.$scope.Init = this.InitializeCommands;
                this.$scope.$on("seletedFile", function (news, args) {
                    $scope.Files = args.file;
                });
            }
            CreateBookingController.$inject = ['$scope', '$sce', '$timeout', 'BookingService'];
            return CreateBookingController;
        }());
        bookingclient.CreateBookingController = CreateBookingController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclient.create.controller.js.map