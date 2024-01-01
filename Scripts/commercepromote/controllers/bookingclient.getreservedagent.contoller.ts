

module controllers.bookingclient {
    'use strict';

    export interface IGetReservedAgentScope {
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
        DeleteReservedItem(Id: number,_id:string): void;


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




        Files: Array<any>;
        $on(eventName: string, func: Function): void;
        getTime(): void;
        RemoveRange(arg: model.booking.ITimeRange, Id: number): void;
        TimeRange: any;
        eventId: number;
    }

    export class GetReservedAgentController {
        static $inject = ['$scope', '$sce', '$timeout', '$window',  'BookingService'];


        constructor(private $scope: IGetReservedAgentScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService,private $window: ng.IWindowService, private BookingService: services.booking.BookingService) {
            $scope.Service = BookingService;
            $('#loader').show();
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

            this.$scope.ReservedItem = <model.booking.IGetReservation>{};
            this.$scope.ReservedItems = <Array<model.booking.IGetReservation>>[];
            this.$scope.UpdatedReservedItem = [];

            this.$scope.eventId = 0;



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
            this.$scope.DeleteReservedItem = this.DeleteReservedItem;

            this.$scope.isSuccess = false;
            this.$scope.isSaveClicked = false;
            this.$scope.isSuccess = false;
           

            var ref = this;
            $(document).ready(function () {

                "use strict";

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                var count = 0;

                var hdr = {
                    left: 'title',
                    center: 'month,agendaWeek',
                    right: 'prev,today,next'
                };



                var initDrag = function (e) {
                    // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                    // it doesn't need to have a start or end


                    ref.$scope.class = $.trim(e.children('span').attr('class'));
                    ref.$scope.icon = $.trim(e.children('span').attr('data-icon'));






                    var eventObject = {

                        title: $.trim(e.children().text()), // use the element's text as the event title
                        description: $.trim(e.children('span').attr('data-description')),
                        icon: $.trim(e.children('span').attr('data-icon')),
                        className: $.trim(e.children('span').attr('class')),
                        id: 0,
                        color: '#' + ref.$scope.SelectedReservationItem.ColorCode,
                        ResItemId: ref.$scope.SelectedReservationItem.Id,
                        ResCategoryId: ref.$scope.SelectedCategory.Id,
                        TimeRangeId: ref.$scope.Time.Id,
                        imageurl: '',
                        ownerName: '',
                        // use the element's children as the event class
                    };
                    // store the Event Object in the DOM element so we can get to it later
                    e.data('eventObject', eventObject);

                    // make the event draggable using jQuery UI
                    e.draggable({
                        zIndex: 999,
                        revert: true, // will cause the event to go back to its
                        revertDuration: 0, //  original position after the drag

                    });
                    e.resizable({

                    })
                };

                var addEvent = function (event, title, color, description, icon, start, end) {



                    title = title.length === 0 ? "Untitled Event" : title;
                    description = description.length === 0 ? "No Description" : description;
                    icon = icon.length === 0 ? " " : icon;
                    color = color.length === 0 ? " " : color;

                    var html = $('<li><span style="background-color:#'+color+'" data-description="' + description + '" data-icon="' +
                        icon + '">' + title + '</span></li>').prependTo('ul#external-events').hide().fadeIn();

                    $("#event-container").effect("highlight", 800);

                    initDrag(html);


                };

                /* initialize the external events
                 -----------------------------------------------------------------*/

                $('#external-events > li').each(function () {
                    initDrag($(this));
                });

                $('#add-event').click(function () {


                    var title = /*$('#reservationItem:selected').text()*/ ref.$scope.SelectedReservationItem.Name + "(" + ref.$scope.Time.StartTime + " - " + ref.$scope.Time.EndTime + ")",
                        color = !ref.$scope.SelectedReservationItem.ColorCode ? '#808000' : ref.$scope.SelectedReservationItem.ColorCode,
                        description = /*$('#category:selected').text()*/ref.$scope.SelectedCategory.Name,
                        icon = $('input:radio[name=iconselect]:checked').val(),
                        start = !ref.$scope.Time.StartTime ? '' : ref.$scope.Time.StartTime,
                        end = !ref.$scope.Time.EndTime ? '' : ref.$scope.Time.EndTime;




                    addEvent(event, title, color, description, icon, start, end);
                });

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
                        element.append('<td class="w3-center"><button class="delete-button">Delete</button></td>');
                        element.find(".w3-center").on("click", function () {
                        
                              
                                if (event.ID != null) {
                                    ref.$window.DeleteConfirmation(event.ID, event._id);

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


           
            this.GetReservedItems();


            //this.GetReservationItem(this.$scope.AgentId);

        }


   

        private GetReservedItems = (): void => {
            var request = <model.booking.IGetReservedItemRequest>{};
            request.UserID = this.$scope.AgentId;
            request.GroupID = this.$scope.GroupId;


            this.BookingService.GetAgentsReservedItems(request).then((result: services.IResponseArray<model.booking.IGetReservedItemResponse>) => {

                var items = [];

                for (var i = 0; i < result.length; i++) {
                    var Item = <model.booking.IGetReservation>{};

                    Item.ID = result[i].Id;
                    Item.title =  result[i].ResItemName + "(" + new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + " - " + new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
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

                $('#loader').fadeOut();
            });

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