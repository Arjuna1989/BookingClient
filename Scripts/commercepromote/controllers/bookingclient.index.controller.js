var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var BookingDetailsController = /** @class */ (function () {
            function BookingDetailsController($scope, $sce, $timeout, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.BookingService = BookingService;
                this.InitializeCommands = function (agentId) {
                    var date = new Date();
                    _this.$scope.AgentId = agentId;
                    _this.$scope.ReservationItems = {};
                    _this.GetReservationItems(_this.$scope.AgentId);
                };
                this.GetReservationItems = function (AgentId) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.BookingService.GetReservationItems(request).then(function (result) {
                        if (!result) {
                        }
                        else {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].TimeRange != null) {
                                    for (var j = 0; j < result[i].TimeRange.length; j++) {
                                        result[i].TimeRange[j].StartTime = new Date(result[i].TimeRange[j].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                        result[i].TimeRange[j].EndTime = new Date(result[i].TimeRange[j].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                    }
                                }
                                if (result[i].ColorCode == null) {
                                    result[i].ColorCode = "fbfbfb";
                                }
                            }
                            _this.$scope.ReservationItems = result;
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
                            $('#loader').fadeOut();
                        }
                    });
                };
                $('#loader').show();
                $scope.Service = BookingService;
                this.$scope.Init = this.InitializeCommands;
            }
            BookingDetailsController.$inject = ['$scope', '$sce', '$timeout', 'BookingService'];
            return BookingDetailsController;
        }());
        bookingclient.BookingDetailsController = BookingDetailsController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclient.index.controller.js.map