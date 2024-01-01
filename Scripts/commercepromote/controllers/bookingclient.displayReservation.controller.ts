module controllers.bookingclient {
    'use strict';

    export interface IDisplayReservationGridBookingScope {
        Service: any;
        Init(agentId: number, groupId: number);
        AgentId: number;
        GroupId: number;

        ReservationCollection: any;

        DisplayReservations(): void;
        DeleteReservedItem(Id: number): void;
    }

    export class DisplayReservationGridController {
        static $inject = ['$scope', '$sce', '$timeout','$window', 'BookingService'];

        constructor(private $scope: IDisplayReservationGridBookingScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService, private BookingService: services.booking.BookingService) {
            $scope.Service = BookingService;
            $('#loader').show();
            this.$scope.Init = this.InitializeCommands;
            this.$scope.DisplayReservations = this.DisplayReservations;
            this.$scope.DeleteReservedItem = this.DeleteReservedItem;
        }

        private InitializeCommands = (agentId: number, groupId: number): void => {
            this.$scope.AgentId = agentId;
            this.$scope.GroupId = agentId;
            this.DisplayReservations();
        }

        private DisplayReservations = (): void => {

            var request = <model.booking.IGetReservationsByGroupIdRequest>{};
            request.GroupId = this.$scope.GroupId;
            this.BookingService.GetAllReservationByGroupId(request).then((result: services.IResponseArray<model.booking.IGetReservationsByGroupIdResponse>) => {

                
                if (result.length > 0) {

                    var items = [];
                    for (var i = 0; i < result.length; i++) {
                        var Item = <model.booking.IGetReservationsByGroupIdResponse>{};

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
                    this.$scope.ReservationCollection = items;

                    if ($.fn.DataTable.isDataTable("#datatable_col_reorder")) {
                        $('#datatable_col_reorder').DataTable().clear().destroy();
                    }

                    this.$timeout(() => {
                        $('#datatable_col_reorder').dataTable(
                            {
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

                    console.log(items)
                    $('#loader').fadeOut();
                }
                else {
                    this.$scope.ReservationCollection = null;
                    $('#loader').hide();
                }

            });
        }


        private DeleteReservedItem = (Id: number): void => {
            if (confirm("Are you sure want to delete this booking?")) {
                var request = <model.booking.IDeleteReservedItemRequest>{};
                request.Id = Id;
                this.BookingService.DeleteReservedItem(request).then((result: model.booking.IDeleteReservedItemResponse) => {

                    this.DisplayReservations();
                    if (!result.IsDeleted) {

                    }
                    else {
                        this.$window.DeleteSuccess();
                    }

                });
            }
        }
    }
}