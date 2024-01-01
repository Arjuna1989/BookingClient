var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var EditBookingController = /** @class */ (function () {
            function EditBookingController($scope, $sce, $timeout, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.BookingService = BookingService;
                this.InitializeCommands = function (agentId, groupId, ReservationId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.ReservationId = ReservationId;
                    _this.$scope.GroupId = groupId;
                    _this.$scope.CreateReservationItemCategory = _this.CreateReservationItemCategory;
                    _this.$scope.UpdateReservation = _this.UpdateReservation;
                    _this.$scope.DeleteAttachment = _this.DeleteAttachments;
                    _this.$scope.RemoveRange = _this.RemoveRange;
                    _this.$scope.getTime = _this.getTime;
                    _this.GetReservationItem();
                    _this.GetReservationItemCategory();
                };
                this.GetReservationItem = function () {
                    _this.$scope.TimeRange = [];
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = _this.$scope.ReservationId;
                    _this.BookingService.GetReservationItem(request).then(function (result) {
                        if (!result) {
                        }
                        else {
                            _this.$scope.ReservationItem = result;
                            // this.$scope.ReservationItem.ResCategoryId = result.ResCategoryId;
                            _this.$scope.AttachmentList = result.Attachments;
                            if (result.TimeRange != null) {
                                for (var i = 0; i < result.TimeRange.length; i++) {
                                    var time = {};
                                    time.Id = result.TimeRange[i].Id;
                                    time.StartTime = new Date(result.TimeRange[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                    time.EndTime = new Date(result.TimeRange[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                    _this.$scope.TimeRange.push(time);
                                }
                                $('#loader').fadeOut();
                            }
                        }
                    });
                };
                this.GetReservationItemCategory = function () {
                    var request = {};
                    request.GroupId = _this.$scope.AgentId;
                    _this.BookingService.GetReservationItemCategory(request).then(function (result) {
                        if (!result) {
                        }
                        else {
                            _this.$scope.Categories = result;
                        }
                    });
                };
                this.CreateReservationItemCategory = function (arg) {
                    _this.BookingService.CreateReservationItemCategory(arg).then(function (result) {
                        if (!result) {
                        }
                        else {
                            $('#createCategory').modal('hide');
                            _this.GetReservationItemCategory();
                        }
                    });
                };
                this.DeleteAttachments = function (ID) {
                    _this.$scope.isdeleteClicked = true;
                    var request = {};
                    request.Id = ID;
                    if (window.confirm("Do you really want to Delete?")) {
                        _this.BookingService.DeleteAttachmentById(request).then(function (result) {
                            if (!result.IsDeleted) {
                                _this.$scope.isdeleteClicked = false;
                            }
                            else {
                                _this.$scope.isdeleteClicked = false;
                                _this.$scope.IsSuccessfullyDeleted = true;
                                _this.$timeout(function () {
                                    _this.$scope.IsSuccessfullyDeleted = false;
                                }, 5000);
                                _this.GetReservationItem();
                            }
                        });
                    }
                };
                this.UpdateReservation = function (arg) {
                    _this.$scope.isSaveClicked = true;
                    var reservation = {};
                    reservation = arg;
                    reservation.TimeRange = _this.$scope.TimeRange;
                    reservation.AgentId = _this.$scope.AgentId;
                    var updateRequest = {};
                    updateRequest.model = reservation;
                    updateRequest.file = !_this.$scope.Files ? [] : _this.$scope.Files;
                    console.log(updateRequest);
                    _this.BookingService.UpdateReservation(updateRequest).then(function (result) {
                        if (!result.IsUpdated) {
                        }
                        else {
                            _this.$scope.TimeRange = [];
                            _this.GetReservationItem();
                            _this.$scope.isSaveClicked = false;
                            _this.$scope.isSuccess = true;
                            _this.$timeout(function () {
                                _this.$scope.isSuccess = false;
                            }, 5000);
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
                        if (arg.Id > 0 || arg.Id != null) {
                            var request = {};
                            request.Id = arg.Id;
                            _this.BookingService.RemoveRange(request).then(function (result) {
                                if (!result) {
                                }
                                else {
                                    _this.GetReservationItem();
                                }
                            });
                        }
                    }
                };
                $('#loader').show();
                $scope.Service = BookingService;
                this.$scope.ReservationItem = {};
                this.$scope.Categories = {};
                this.$scope.Category = {};
                this.$scope.AttachmentList = {};
                this.$scope.isdeleteClicked = false;
                this.$scope.IsSuccessfullyDeleted = false;
                this.$scope.isSaveClicked = false;
                this.$scope.isSuccess = false;
                this.$scope.TimeRange = [];
                this.$scope.Init = this.InitializeCommands;
                this.$scope.$on("seletedFile", function (news, args) {
                    $scope.Files = args.file;
                });
            }
            EditBookingController.$inject = ['$scope', '$sce', '$timeout', 'BookingService'];
            return EditBookingController;
        }());
        bookingclient.EditBookingController = EditBookingController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclient.edit.controller.js.map