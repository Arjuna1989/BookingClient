module controllers.bookingclient {
    'use strict';

    export interface IIndexScope {
        Service: any;
        Init(companyId: number, agentId: number, eventId: number);
        AgentId: number;
        GroupId: number;
        ReservationItems: services.IResponseArray<model.booking.IGetReservationItemResponse>;
    
    }

    export class BookingDetailsController {
        static $inject = ['$scope', '$sce','$timeout', 'BookingService'];

        constructor(private $scope: IIndexScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService, private BookingService: services.booking.BookingService) {
            $('#loader').show();
            $scope.Service = BookingService;
            this.$scope.Init = this.InitializeCommands;
        }

        private InitializeCommands = (agentId: number): void => {

            var date = new Date();
           


            this.$scope.AgentId = agentId;

            this.$scope.ReservationItems = <services.IResponseArray<model.booking.IGetReservationItemResponse>>{};
            this.GetReservationItems(this.$scope.AgentId);
         
        }

        private GetReservationItems = (AgentId: number): void => {

            var request = <model.booking.IGetReservationItemRequest>{};
            request.AgentId = this.$scope.AgentId;
            this.BookingService.GetReservationItems(request).then((result: services.IResponseArray<model.booking.IGetReservationItemResponse>) => {
                if (!result) {

                }
                else {

                

                    for (var i = 0; i < result. length; i++) {

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

                    this.$scope.ReservationItems = result;
                    
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

                    $('#loader').fadeOut();
                }
            });
        }
    }
}