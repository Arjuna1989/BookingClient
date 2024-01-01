

module controllers.bookingclient {
    'use strict';

    export interface ISeeAllReservationScope {
        Service: any;
        Init(agentId: number, groupId: number);
        AgentId: number;
        GroupId: number;
        ReservationItem: model.booking.ICreateReservationItemRequest;
        Categories: services.IResponseArray<model.booking.IGetReservationCategoryResponse>;
        Category: model.booking.ICreateReservationCategoryRequest;
        ReservationTimeRange: services.IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>;

        SelectedCategory: model.booking.IGetReservationCategoryResponse;

        ReservationItems: services.IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>;
        SelectedReservationItem: model.booking.GetReservationItemByCategoryIdResponse;

        isSaveClicked: boolean;
        isSuccess: boolean;

        CreateReservationItemCategory(arg: model.booking.ICreateReservationCategoryRequest): void;
        CreateReservation(arg: model.booking.ICreateReservationItemRequest): void;
        GetReservationTimeRangeById(arg: model.booking.GetReservationItemByCategoryIdResponse): void;
        GetReservationItemByCategoryId(arg: model.booking.IGetReservationCategoryResponse): void;
        CreateBooking(arg: any): void;
        GetReservedItems(): void;

        Agent: model.booking.IGetAgentByAgentIdResponse;
        SendMail: model.booking.ISendEmailToAgentRequest;
        SendMailToAgent(Mail: model.booking.ISendEmailToAgentRequest): void;
        GetAgent(AgentId: number): void;
        DeleteReservedItem(Id: number, _id:string): void;

        Close(): void;


        Time: model.booking.ITimeRange;
        Reservation: Array<model.booking.IReservation>;
        DateRange: model.booking.IDateRange;

        ReservedItem: model.booking.IGetReservation;
        ReservedItems: any;
        UpdatedReservedItem: Array<model.booking.IReservation>;

        ResItemId: number;
        ResCategoryId: number;
        ReservationId: number;
        TimeRangeId: number;
        UserID: number;
        class: string;
        icon: string;
        isClicked: boolean;



        Files: Array<any>;
        $on(eventName: string, func: Function): void;
        getTime(): void;
        RemoveRange(arg: model.booking.ITimeRange, Id: number): void;
        TimeRange: any;
        eventId: number;
        IsSendingEmail: boolean;
    }

    export class SeeAllReservationController {
        static $inject = ['$scope', '$sce', '$timeout','$window', 'BookingService'];


        constructor(private $scope: ISeeAllReservationScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService, private BookingService: services.booking.BookingService) {
            $scope.Service = BookingService;
           
            this.$scope.ReservationItem = <model.booking.ICreateReservationItemRequest>{};
            this.$scope.Categories = <services.IResponseArray<model.booking.IGetReservationCategoryResponse>>{};
            this.$scope.Category = <model.booking.ICreateReservationCategoryRequest>{};
            this.$scope.ReservationTimeRange = <services.IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>>{};
            this.$scope.ReservationItems = <services.IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>>{};
            this.$scope.TimeRange = [];
            this.$scope.SelectedCategory = <model.booking.IGetReservationCategoryResponse>{};
            this.$scope.SelectedReservationItem = <model.booking.GetReservationItemByCategoryIdResponse>{};
            this.$scope.Reservation = [];
            this.$scope.DateRange = <model.booking.IDateRange>{};
            this.$scope.DateRange.StartDate = new Date();
            this.$scope.DateRange.EndDate = new Date();
            this.$scope.Time = <model.booking.ITimeRange>{};
            this.$scope.SendMail = <model.booking.ISendEmailToAgentRequest>{};

            this.$scope.ReservedItem = <model.booking.IGetReservation>{};
            this.$scope.ReservedItems = <Array<model.booking.IGetReservation>>[];
            this.$scope.UpdatedReservedItem = [];

            this.$scope.eventId = 0;
            this.$scope.isClicked = false;



            this.$scope.Init = this.InitializeCommands;

            this.$scope.$on("seletedFile", function (news, args) {
                $scope.Files = args.file;
            })




        }

        private InitializeCommands = (agentId: number, groupId: number): void => {


            this.$scope.AgentId = agentId;
            this.$scope.GroupId = groupId > 0 ? groupId : agentId;
            this.$scope.ResItemId = 0;
            this.$scope.ResCategoryId = 0;
            this.$scope.ReservationId = 0;
            this.$scope.TimeRangeId = 0;
            this.$scope.UserID = agentId;

            this.$scope.isSuccess = false;
            this.$scope.isSaveClicked = false;
            this.$scope.isSuccess = false;
            this.$scope.IsSendingEmail = false;
      

            this.$scope.GetReservationTimeRangeById = this.GetReservationTimeRangeById;
            this.$scope.GetReservationItemByCategoryId = this.GetReservationItemByCategoryId;
            this.$scope.GetReservedItems = this.GetReservedItems;
            this.$scope.Close = this.Close;
            this.$scope.SendMailToAgent   =this. SendMailToAgent    ;
            this.$scope.GetAgent = this.GetAgent;
            this.$scope.DeleteReservedItem = this.DeleteReservedItem;

            var ref = this;
            $(document).ready(function () {

                "use strict";

         

                var hdr = {
                    left: 'title',
                    center: 'month,agendaWeek',
                    right: 'prev,today,next'
                };




                /* initialize the calendar
                 -----------------------------------------------------------------*/

                //
                //

                $('#calendar').fullCalendar({

                    header: hdr,
                    editable: false,
                    droppable: false, // this allows things to be dropped onto the calendar !!!
                    selectable: false,
                    eventOverlap: false,
                    hdr: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek'
                    },

                    events: ref.$scope.ReservedItems,




                    viewRender: function (view) {
                        $('.cal2 .fc-toolbar').css({
                            'display': 'none',
                        });
                        $(".fc-list-table .fc-list-heading .fc-widget-header").attr('colspan', 4);
                    },

                    eventRender: function (event, element, icon) {



                        //event.start = ref.$scope.DateRange.StartDate;
                        //event.end = ref.$scope.DateRange.EndDate;
                        //element.append('<td class="w3-center"><button class="fc-delete-item ">Delete</button></td>');
                        //element.find(".w3-center").on("click", function () {
                        //    var result = confirm("Delete Event");
                        //    if (result) {
                        //        console.log(event);



                        //        localStorage.setItem("delete_id", event.id);
                        //        $('#calendar').fullCalendar('removeEvents', event._id);
                        //        if (event.ID != null) {

                        //            ref.$scope.DeleteReservedItem(event.ID);


                        //        }
                        //        else {
                        //            for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                        //                if (ref.$scope.Reservation[i].Id == event.id) {
                        //                    ref.$scope.Reservation[i].iscomplete = false;
                        //                }
                        //            }
                        //        }
                        //    }
                        //});

                        element.append('<td class="w3-center1"><button class="emai-button"> <i class="fa fa-envelope-o" aria-hidden="true"></i> Send Mail</button></td>');
                        element.find(".w3-center1").on("click", function () {
                            ref.$scope.GetAgent(event.UserID);
                        });

                        element.append('<td class="w3-center"><button class="delete-button">Delete</button></td>');
                        element.find(".w3-center").on("click", function () {
                            

                           
                            if (event.ID != null) {
                                ref.$window.DeleteConfirmation(event.ID, event._id );

                            }
                            else {
                                for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                    if (ref.$scope.Reservation[i].Id == event.id) {
                                        ref.$scope.Reservation[i].iscomplete = false;
                                    }
                                }
                            }


                          

                        });


                        if (event.description != "") {
                            element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description +
                                "</span>");
                        }
                        if (event.icon != "") {
                            element.find('.fc-title').append("<i class='air air-top-right fa " + event.icon +
                                " '></i>");
                        }

                        if (event.imageurl != "") {
                            element.find(".fc-title").prepend("<img src='" + event.imageurl + "' width='16' height='16'>");
                        }
                    },

                    windowResize: function (event, ui) {
                        $('#calendar').fullCalendar('render');
                    }
                });

                /* hide default buttons */
                $('.fc-right, .fc-center').hide();


                $('#calendar-buttons #btn-prev').click(function () {
                    $('.fc-prev-button').click();
                    return false;
                });

                $('#calendar-buttons #btn-next').click(function () {
                    $('.fc-next-button').click();
                    return false;
                });

                $('#calendar-buttons #btn-today').click(function () {
                    $('.fc-today-button').click();
                    return false;
                });

                $('#mt').click(function () {
                    $('#calendar').fullCalendar('changeView', 'month');
                });

                $('#ag').click(function () {
                    $('#calendar').fullCalendar('changeView', 'agendaWeek');
                });

                $('#td').click(function () {
                    $('#calendar').fullCalendar('changeView', 'agendaDay');
                });

            });


            this.GetReservationItemCategory();
         


            //this.GetReservationItem(this.$scope.AgentId);

        }




        private GetReservedItems = (): void => {
            this.RemoveEvents();
            this.$scope.isClicked = true;
            $('#loader').show();
            var request = <model.booking.IGetReservedItemRequest>{};
            request.UserID = this.$scope.AgentId;
            request.GroupID = this.$scope.GroupId;
            request.SelectedReservationItemId = this.$scope.SelectedReservationItem.Id;
            request.SelectedCategoryId = this.$scope.SelectedCategory.Id;
            request.TimeId = !this.$scope.Time ?0:this.$scope.Time.Id;

                this.BookingService.FilterReservations(request).then((result: services.IResponseArray<model.booking.IGetReservedItemResponse>) => {

               

                if (!result.length) {

                    this.$window.NoReservation();
                    this.$scope.isClicked = false;
                }
                else {


                    var items = [];

                    for (var i = 0; i < result.length; i++) {
                        var Item = <model.booking.IGetReservation>{};

                        Item.ID = result[i].Id;
                        Item.title = "Reserved By : " + result[i].AgentName + " , " + result[i].ResItemName + "(" + new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + " - " + new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
                        Item.start = new Date(Date.parse(result[i].StartDate));

                        var end = new Date(new Date(result[i].EndDate).setDate(new Date(result[i].EndDate).getDate() + 1));
                        Item.end = new Date(Date.parse(end.toLocaleDateString()));


                        Item.allDay = true;
                        Item.description = result[i].CategoryName;
                        //var _class = result[i].className != "" ? result[i].className : "bg-color-greenLight";
                        Item.color = result[i].className != "" ? result[i].className : "#58d68d";
                        Item.icon = result[i].icon;
                        Item.ResCategoryId = result[i].ResCategoryId;
                        Item.ResItemId = result[i].ResItemId;
                        Item.TimeRangeId = result[i].TimeRangeId;
                        Item.UserID = result[i].UserID;
                        Item.ReservationId = result[i].ReservationId;
                        Item.imageurl = result[i].AgentImg;
                        Item.ownerName = result[i].AgentName;
                        items.push(Item);

                        //    title: 'All Day Event 1',
                        //    start: new Date(y, m, 1),
                        //    end: null,
                        //    description: 'long description',
                        //    className: ["event", "bg-color-greenLight"],
                        //    icon: 'fa-check'
                    }
                    console.log(items);
                    this.$scope.ReservedItems = items;

                    var CAL, EVENTS;

                    $(document).ready(function () {
                        // set up calendar with an EventSource (in this case an array)
                        EVENTS = items;
                        $('#calendar').fullCalendar();

                        // calendar object
                        CAL = $('#calendar').fullCalendar('getCalendar');
                        // extend object (could be its own function, etc.)
                        CAL.refresh = function () {
                            CAL.removeEvents();
                            CAL.addEventSource(EVENTS);
                        }

                        // finish setting up calendar
                        CAL.refresh();
                    });
                    this.$scope.isClicked = false;
                    $('#loader').fadeOut();
                }
                    



                });

        }

        private Close = (): void => {

            $('#noreservation').modal('hide');
        }

        private GetReservationItemCategory = (): void => {
        
            var request = <model.booking.IGetReservationCategoryRequest>{};
            request.GroupId = this.$scope.GroupId;
            this.BookingService.GetReservationItemCategory(request).then((result: services.IResponseArray<model.booking.IGetReservationCategoryResponse>) => {
                if (!result) {

                }
                else {

                    this.$scope.Categories = result;
                }
            });
        }


        private GetReservationItemByCategoryId = (arg: model.booking.IGetReservationCategoryResponse): void => {
           
            this.$scope.SelectedCategory = arg as model.booking.IGetReservationCategoryResponse;
            var request = <model.booking.GetReservationItemByCategoryIdRequest>{};
            request.Id = arg.Id;
            this.BookingService.GetReservationItemByCategoryId(request).then((result: services.IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>) => {
              

                this.$scope.ReservationItems = result;
                

            });
        }


        private GetReservationTimeRangeById = (arg: model.booking.GetReservationItemByCategoryIdResponse): void => {

            if (!arg) {

            }
            else {
                this.$scope.TimeRange = [];
                this.$scope.SelectedReservationItem = arg as model.booking.GetReservationItemByCategoryIdResponse;

                var request = <model.booking.GetReservationTimeRangeByIdRequest>{};
                request.Id = arg.Id;
                this.BookingService.GetReservationTimeRangeById(request).then((result: services.IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>) => {

                    this.$scope.ReservationTimeRange = result;

                    if (result != null) {
                        for (var i = 0; i < result.length; i++) {
                            var time = <model.booking.ITimeRange>{};
                            time.Id = result[i].Id;
                            time.StartTime = new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            time.EndTime = new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            this.$scope.TimeRange.push(time);
                        }

                    }



                });
            }

        }

        private GetReservedTime = (arg: model.booking.ITimeRange): void => {

            this.$scope.Time = <model.booking.ITimeRange>{};
            this.$scope.Time = arg as model.booking.ITimeRange;


        }


        private RemoveEvents = (): void => {

            var CAL, EVENTS;

            $(document).ready(function () {
                // set up calendar with an EventSource (in this case an array)
                EVENTS = [];
                $('#calendar').fullCalendar();

                // calendar object
                CAL = $('#calendar').fullCalendar('getCalendar');
                // extend object (could be its own function, etc.)
                CAL.refresh = function () {
                    CAL.removeEvents();
                    CAL.addEventSource(EVENTS);
                }

                // finish setting up calendar
                CAL.refresh();
            });
        }




        private GetAgent = (AgentId: number): void => {

            this.$scope.SendMail = <model.booking.ISendEmailToAgentRequest>{};
            var request = <model.booking.IGetAgentByAgentIdRequest>{};
            request.AgentId = AgentId;
            this.BookingService.GetAgent(request).then((result: model.booking.IGetAgentByAgentIdResponse) => {

                if (!result) {

                }
                else {
                    this.$scope.SendMail = result as model.booking.ISendEmailToAgentRequest;
                    $('#createMail').modal('show');

                }
            });


        }


        private SendMailToAgent = (Mail: model.booking.ISendEmailToAgentRequest): void => {

            this.$scope.IsSendingEmail = true;

            this.BookingService.SendMailToAgent(Mail).then((result: model.booking.ISendEmailToAgentResponse) => {
                this.$scope.IsSendingEmail = false;
                this.$scope.SendMail = <model.booking.ISendEmailToAgentRequest>{};
                $('#createMail').modal('hide');

                if (!result) {


                    this.$window._emailSendingError();


                }
                else {

                    this.$window._emailSuccess();


                }



            });


        }

        private close = (): void => {

            this.$scope.IsSendingEmail = false;
            

        }


        private DeleteReservedItem = (Id: number,_id:string): void => {
            var request = <model.booking.IDeleteReservedItemRequest>{};
            request.Id = Id;
            this.BookingService.DeleteReservedItem(request).then((result: model.booking.IDeleteReservedItemResponse) => {
                
                if (!result.IsDeleted) {

                    this.$window.DeleteError();
                }
                else {
                    this.$window.DeleteSuccess();
                    $('#calendar').fullCalendar('removeEvents', _id);
                }

            });
        }

    }
}