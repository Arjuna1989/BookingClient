var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var DisplayReservationGridController = /** @class */ (function () {
            function DisplayReservationGridController($scope, $sce, $timeout, $window, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.$window = $window;
                this.BookingService = BookingService;
                this.InitializeCommands = function (agentId, groupId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.GroupId = agentId;
                    _this.DisplayReservations();
                };
                this.DisplayReservations = function () {
                    var request = {};
                    request.GroupId = _this.$scope.GroupId;
                    _this.BookingService.GetAllReservationByGroupId(request).then(function (result) {
                        if (result.length > 0) {
                            var items = [];
                            for (var i = 0; i < result.length; i++) {
                                var Item = {};
                                Item.Id = result[i].Id;
                                Item.AgentName = result[i].AgentName;
                                Item.AgentImg = result[i].AgentImg;
                                Item.StartTime = new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                Item.EndTime = new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                Item.StartDate = result[i].StartDate;
                                Item.EndDate = result[i].EndDate;
                                Item.TimeRangeId = result[i].TimeRangeId;
                                Item.DateRangeId = result[i].DateRangeId;
                                Item.ReservationId = result[i].ReservationId;
                                Item.ResCategoryId = result[i].ResCategoryId;
                                Item.ResItemId = result[i].ResItemId;
                                Item.UserID = result[i].UserID;
                                Item.IsReserved = result[i].IsReserved;
                                Item.CategoryName = result[i].CategoryName;
                                Item.ResItemName = result[i].ResItemName;
                                Item.className = result[i].className;
                                Item.icon = result[i].icon;
                                items.push(Item);
                            }
                            _this.$scope.ReservationCollection = items;
                            if ($.fn.DataTable.isDataTable("#datatable_col_reorder")) {
                                $('#datatable_col_reorder').DataTable().clear().destroy();
                            }
                            _this.$timeout(function () {
                                $('#datatable_col_reorder').dataTable({
                                    "order": [[0, 'asc']],
                                    "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs column-filter'lC>r><'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'pr>" +
                                        "t" +
                                        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                                    "autoWidth": true,
                                    "oLanguage": {
                                        "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
                                    }
                                });
                            }, 1000);
                            console.log(items);
                            $('#loader').fadeOut();
                        }
                        else {
                            _this.$scope.ReservationCollection = null;
                            $('#loader').hide();
                        }
                    });
                };
                this.DeleteReservedItem = function (Id) {
                    if (confirm("Are you sure want to delete this booking?")) {
                        var request = {};
                        request.Id = Id;
                        _this.BookingService.DeleteReservedItem(request).then(function (result) {
                            _this.DisplayReservations();
                            if (!result.IsDeleted) {
                            }
                            else {
                                _this.$window.DeleteSuccess();
                            }
                        });
                    }
                };
                $scope.Service = BookingService;
                $('#loader').show();
                this.$scope.Init = this.InitializeCommands;
                this.$scope.DisplayReservations = this.DisplayReservations;
                this.$scope.DeleteReservedItem = this.DeleteReservedItem;
            }
            DisplayReservationGridController.$inject = ['$scope', '$sce', '$timeout', '$window', 'BookingService'];
            return DisplayReservationGridController;
        }());
        bookingclient.DisplayReservationGridController = DisplayReservationGridController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclient.displayReservation.controller.js.map