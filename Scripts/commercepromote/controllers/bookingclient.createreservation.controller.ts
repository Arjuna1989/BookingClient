

module controllers.bookingclient {
    'use strict';

    export interface ICreateReservationScope {
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
        ReservationItemDisplay: model.booking.IGetReservationItemResponse;
        AttachmentList: services.IResponseArray<model.booking.IGetAttachmentPath>
        SelectedReservationItem: model.booking.GetReservationItemByCategoryIdResponse;

        isSaveClicked: boolean;
        isSuccess: boolean;

        CreateReservationItemCategory(arg: model.booking.ICreateReservationCategoryRequest): void;
        CreateReservation(arg: model.booking.ICreateReservationItemRequest): void;
        GetReservationTimeRangeById(arg: model.booking.GetReservationItemByCategoryIdResponse): void;
        GetReservationItemByCategoryId(arg: model.booking.IGetReservationCategoryResponse): void;
        CreateBooking(arg: any): void;
        GetReservedItems(): void;
        DeleteReservedItem(Id: number): void;
        GetAgent(AgentId: number): void;
        GetReservationItem(): void;
        SendMailToAgent(Mail: model.booking.ISendEmailToAgentRequest): void;


        Time: model.booking.ITimeRange;
        Reservation: Array<model.booking.IReservation>;
        DateRange: model.booking.IDateRange;
        ReservedItem: model.booking.IGetReservation;
        ReservedItems: any;
        UpdatedReservedItem: Array<model.booking.IReservation>;

        Agent: model.booking.IGetAgentByAgentIdResponse;
        SendMail: model.booking.ISendEmailToAgentRequest;

        ResItemId: number;
        ResCategoryId: number;
        ReservationId: number;
        TimeRangeId: number;
        UserID: number;
        class: string;
        icon: string;
        IsSendingEmail: boolean;
        IsSent: boolean;




        Files: Array<any>;
        $on(eventName: string, func: Function): void;
        getTime(): void;
        RemoveRange(arg: model.booking.ITimeRange, Id: number): void;
        TimeRange: any;
        eventId: number;
        close(): void;
    }

    export class CreateReservationController {
        static $inject = ['$scope', '$sce', '$timeout', '$window', 'BookingService'];


        constructor(private $scope: ICreateReservationScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService, private BookingService: services.booking.BookingService) {
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
            this.$scope.ReservationItemDisplay = <model.booking.IGetReservationItemResponse>{};
            this.$scope.AttachmentList = <services.IResponseArray<model.booking.IGetAttachmentPath>>{};
            this.$scope.Reservation = [];
            this.$scope.DateRange = <model.booking.IDateRange>{};
            this.$scope.DateRange.StartDate = new Date();
            this.$scope.DateRange.EndDate = new Date();
            this.$scope.Time = <model.booking.ITimeRange>{};
            this.$scope.SendMail = <model.booking.ISendEmailToAgentRequest>{};

            this.$scope.ReservedItem = <model.booking.IGetReservation>{};
            this.$scope.ReservedItems = <Array<model.booking.IGetReservation>>[];
            this.$scope.UpdatedReservedItem = [];
            this.$scope.IsSendingEmail = false;
            this.$scope.IsSent = false;

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

            this.$scope.isSuccess = false;
            this.$scope.isSaveClicked = false;
            this.$scope.isSuccess = false;
            this.$scope.GetReservationTimeRangeById = this.GetReservationTimeRangeById;
            this.$scope.GetReservationItemByCategoryId = this.GetReservationItemByCategoryId;

            this.$scope.CreateBooking = this.CreateBooking;
            this.$scope.CreateReservationItemCategory = this.CreateReservationItemCategory;
            this.$scope.getTime = this.getTime;
            this.$scope.RemoveRange = this.RemoveRange;
            this.$scope.GetReservedItems = this.GetReservedItems;
            this.$scope.DeleteReservedItem = this.DeleteReservedItem;
            this.$scope.GetAgent = this.GetAgent;
            this.$scope.SendMailToAgent = this.SendMailToAgent;
            this.$scope.close = this.close;
            this.$scope.GetReservationItem = this.GetReservationItem;

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

                    var html = $('<li ><span style="background-color:#' + color + '" data-description="' + description + '" data-icon="' +
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
                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar !!!
                    selectable: true,
                    eventOverlap: false,
                    hdr: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek'
                    },

                    events: ref.$scope.ReservedItems,

                    //dayClick: function (date) {
                    //    alert('clicked ' + date.format());
                    //},
                    //select: function (startDate, endDate) {
                    //    alert('selected ' + startDate.format() + ' to ' + endDate.format());
                    //},

                    select: function (start, end) {
                        if (start.isBefore(new Date())) {
                            $('#calendar').fullCalendar('unselect');
                            return false;
                        }
                    },

                    drop: function (date, resource, allDay) { // this function is called when something is dropped


                        ref.$scope.eventId = ref.$scope.eventId + 1;

                        // retrieve the dropped element's stored Event Object
                        var originalEventObject = $(this).data('eventObject');

                        // we need to copy it, so that multiple events don't have a reference to the same object
                        var copiedEventObject = $.extend({}, originalEventObject);

                        // assign it the date that was reported
                        copiedEventObject.start = date;

                        copiedEventObject.id = ref.$scope.eventId;
                        console.log(copiedEventObject.Id);

                        var isPastDate = false;
                        if (date.isBefore(new Date())) {
                            $('#calendar').fullCalendar('unselect');
                            isPastDate = true;
                        }

                        if (!isPastDate) {

                            var istempoverlaped = false;

                            if (originalEventObject.id === 0) {

                                for (var i = 0; i < ref.$scope.Reservation.length; i++) {

                                    //alert(new Date(ref.$scope.ReservedItems[i].start) + "SD and and" + ref.$scope.DateRange.StartDate);
                                    //alert(new Date(end.toLocaleDateString()) + "ED and and" + ref.$scope.DateRange.EndDate);

                                    var sd = new Date(ref.$scope.Reservation[i].StartDate).getDate();
                                    var sy = new Date(ref.$scope.Reservation[i].StartDate).getFullYear();
                                    var sm = new Date(ref.$scope.Reservation[i].StartDate).getMonth();


                                    var esy = new Date(date).getFullYear();
                                    var esm = new Date(date).getMonth();
                                    var esd = new Date(date).getDate();

                                    var eed = new Date(date).getDate();
                                    var eem = new Date(date).getMonth();
                                    var eey = new Date(date).getFullYear();

                                    var ed = new Date(ref.$scope.Reservation[i].EndDate).getDate();
                                    var em = new Date(ref.$scope.Reservation[i].EndDate).getMonth();
                                    var ey = new Date(ref.$scope.Reservation[i].EndDate).getFullYear();

                                    var startDate = new Date(sy, sm, sd);
                                    var existingStartDate = new Date(esy, esm, esd);
                                    var endDate = new Date(ey, em, ed);
                                    var existingEndDate = new Date(eey, eem, eed);


                                    var unsavedItemId = ref.$scope.Reservation[i].ResItemId;
                                    var unsavedCategoryId = ref.$scope.Reservation[i].ResCategoryId;
                                    var unsavedTimeRangeId = ref.$scope.Reservation[i].TimeRangeId;
                                    var iscomplete = ref.$scope.Reservation[i].iscomplete;


                                    if ((unsavedItemId == copiedEventObject.ResItemId && unsavedCategoryId == copiedEventObject.ResCategoryId && unsavedTimeRangeId == copiedEventObject.TimeRangeId)) {

                                        if ((existingStartDate <= endDate && existingStartDate >= startDate)) {

                                            if (iscomplete) {

                                                ref.$window._alert();

                                                istempoverlaped = true;
                                                break;
                                            }

                                        }
                                    }



                                }


                            }


                            var isoverlaped = false;


                            for (var i = 0; i < ref.$scope.ReservedItems.length; i++) {

                                var end = new Date(new Date(ref.$scope.ReservedItems[i].end).setDate(new Date(ref.$scope.ReservedItems[i].end).getDate() - 1));

                                //alert(new Date(ref.$scope.ReservedItems[i].start) + "SD and and" + ref.$scope.DateRange.StartDate);
                                //alert(new Date(end.toLocaleDateString()) + "ED and and" + ref.$scope.DateRange.EndDate);

                                var sd = new Date(ref.$scope.ReservedItems[i].start).getDate();
                                var sy = new Date(ref.$scope.ReservedItems[i].start).getFullYear();
                                var sm = new Date(ref.$scope.ReservedItems[i].start).getMonth();


                                var esy = new Date(date).getFullYear();
                                var esm = new Date(date).getMonth();
                                var esd = new Date(date).getDate();

                                var eed = ref.$scope.DateRange.EndDate.getDate();
                                var eem = ref.$scope.DateRange.EndDate.getMonth();
                                var eey = ref.$scope.DateRange.EndDate.getFullYear();

                                var ed = new Date(end.toLocaleDateString()).getDate();
                                var em = new Date(end.toLocaleDateString()).getMonth();
                                var ey = new Date(end.toLocaleDateString()).getFullYear();

                                var startDate = new Date(sy, sm, sd);
                                var existingStartDate = new Date(esy, esm, esd);
                                var endDate = new Date(ey, em, ed);
                                var existingEndDate = new Date(eey, eem, eed);


                                var ResItemId = ref.$scope.ReservedItems[i].ResItemId;
                                var ResCategoryId = ref.$scope.ReservedItems[i].ResCategoryId;
                                var TimeRangeId = ref.$scope.ReservedItems[i].TimeRangeId;



                                if ((ResItemId == copiedEventObject.ResItemId && ResCategoryId == copiedEventObject.ResCategoryId && TimeRangeId == copiedEventObject.TimeRangeId)) {



                                    if ((existingStartDate <= endDate && existingStartDate >= startDate)) {

                                        ref.$window._alert();




                                        for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                            if (ref.$scope.Reservation[i].Id == copiedEventObject.id) {

                                                ref.$scope.Reservation[i].iscomplete = false;
                                            }
                                        }

                                        isoverlaped = true;
                                        break;

                                    }
                                }

                            }



                            if (!istempoverlaped && !isoverlaped) {

                                if (ref.$scope.SelectedCategory.Id != null || ref.$scope.SelectedReservationItem.Id != null || ref.$scope.Time.Id != null) {



                                    //creater reservation object
                                    var reservation = <model.booking.IReservation>{};
                                    reservation.UserID = ref.$scope.AgentId;
                                    reservation.ResItemId = copiedEventObject.ResItemId;
                                    reservation.ResCategoryId = copiedEventObject.ResCategoryId;
                                    reservation.TimeRangeId = copiedEventObject.TimeRangeId;
                                    reservation.StartDate = ref.$scope.DateRange.StartDate.toLocaleDateString();
                                    reservation.EndDate = ref.$scope.DateRange.EndDate.toLocaleDateString();
                                    reservation.Id = ref.$scope.eventId;
                                    reservation.className = copiedEventObject.color;
                                    reservation.icon = copiedEventObject.icon;
                                    ref.$scope.Reservation.push(reservation);

                                    console.log(ref.$scope.Reservation);

                                    //icon: $.trim(e.children('span').attr('data-icon')),
                                    //    className: $.trim(e.children('span').attr('class')),
                                    //        id: 0,
                                    //            ResItemId: ref.$scope.SelectedReservationItem.Id,
                                    //                ResCategoryId: ref.$scope.SelectedCategory.Id,
                                    //                    TimeRangeId: ref.$scope.Time.Id

                                    copiedEventObject.allDay = allDay;
                                    //console.log(originalEventObject);

                                    //console.log(ref.$scope.Reservation);

                                    // render the event on the calendar
                                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                                    // is the "remove after drop" checkbox checked?
                                    if ($('#drop-remove').is(':checked')) {
                                        // if so, remove the element from the "Draggable Events" list
                                        $(this).remove();
                                    }
                                }

                            }

                            if (!isoverlaped) {


                                for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                    if (ref.$scope.Reservation[i].Id == copiedEventObject.id) {

                                        ref.$scope.Reservation[i].iscomplete = true;

                                        ref.$scope.Reservation[i].StartDate = new Date(copiedEventObject.start).toLocaleDateString();
                                        ref.$scope.Reservation[i].EndDate = new Date(copiedEventObject.start).toLocaleDateString();
                                    }
                                }



                            }
                            //$(this).remove();
                        }
                        else {
                            ref.$window._oldDays();
                        }

                    },

                    eventDrop: function (event, delta, revertFunc) {
                        //var myResource = $('#calendar').fullCalendar('getResourceById', event.ID);


                        var isoverlapped = false;

                        // setting the new times after reizing

                        ref.$scope.DateRange = <model.booking.IDateRange>{};
                        ref.$scope.DateRange.StartDate = new Date(event.start);
                        ref.$scope.DateRange.EndDate = new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1));

                        var isPastDate = false;
                        if (event.start.isBefore(new Date())) {
                            $('#calendar').fullCalendar('unselect');
                            isPastDate = true;
                        }

                        if (!isPastDate) {
                            for (var i = 0; i < ref.$scope.Reservation.length; i++) {

                                if (ref.$scope.Reservation[i].Id === event.id) continue;




                                var sd = new Date(ref.$scope.Reservation[i].StartDate).getDate();
                                var sy = new Date(ref.$scope.Reservation[i].StartDate).getFullYear();
                                var sm = new Date(ref.$scope.Reservation[i].StartDate).getMonth();


                                var esy = ref.$scope.DateRange.StartDate.getFullYear();
                                var esm = ref.$scope.DateRange.StartDate.getMonth();
                                var esd = ref.$scope.DateRange.StartDate.getDate();

                                var eed = ref.$scope.DateRange.EndDate.getDate();
                                var eem = ref.$scope.DateRange.EndDate.getMonth();
                                var eey = ref.$scope.DateRange.EndDate.getFullYear();

                                var ed = new Date(ref.$scope.Reservation[i].EndDate).getDate();
                                var em = new Date(ref.$scope.Reservation[i].EndDate).getMonth();
                                var ey = new Date(ref.$scope.Reservation[i].EndDate).getFullYear();

                                var startDate = new Date(sy, sm, sd);
                                var existingStartDate = new Date(esy, esm, esd);
                                var endDate = new Date(ey, em, ed);
                                var existingEndDate = new Date(eey, eem, eed);


                                var TempResItemId = ref.$scope.Reservation[i].ResItemId;
                                var TempResCategoryId = ref.$scope.Reservation[i].ResCategoryId;
                                var TempTimeRangeId = ref.$scope.Reservation[i].TimeRangeId;

                                var soverlap = false;
                                var eoverlap = false;

                                //alert(" TempResItemId  " + TempResItemId + " , " + event.ResItemId + " , TempResCategoryId = " + TempResCategoryId + " , " + event.ResCategoryId + " , TempTimeRangeId = " + TempTimeRangeId + " ,  "+ event.TimeRangeId)

                                if ((TempResItemId == event.ResItemId && TempResCategoryId == event.ResCategoryId && TempTimeRangeId == event.TimeRangeId)) {

                                    if ((existingStartDate <= endDate && existingStartDate >= startDate) || (existingEndDate <= endDate && existingEndDate >= startDate) || (existingStartDate <= startDate && startDate <= existingEndDate) || (existingStartDate <= endDate && endDate <= existingEndDate)) {
                                        //alert("existingStartDate = " + existingStartDate + " , comparedStartDate = " + startDate + " , existingEndDate = " + existingEndDate + " , comparedendDate" + endDate);
                                        ref.$window._alert();
                                        revertFunc();
                                        isoverlapped = true;


                                        break;
                                    }


                                }


                            }


                            if (!isoverlapped) {

                                for (var i = 0; i < ref.$scope.UpdatedReservedItem.length; i++) {

                                    if (ref.$scope.UpdatedReservedItem[i].Id === event.id) continue;


                                    
                                    var sd = new Date(ref.$scope.UpdatedReservedItem[i].StartDate).getDate();
                                    var sy = new Date(ref.$scope.UpdatedReservedItem[i].StartDate).getFullYear();
                                    var sm = new Date(ref.$scope.UpdatedReservedItem[i].StartDate).getMonth();


                                    var esy = ref.$scope.DateRange.StartDate.getFullYear();
                                    var esm = ref.$scope.DateRange.StartDate.getMonth();
                                    var esd = ref.$scope.DateRange.StartDate.getDate();

                                    var eed = ref.$scope.DateRange.EndDate.getDate();
                                    var eem = ref.$scope.DateRange.EndDate.getMonth();
                                    var eey = ref.$scope.DateRange.EndDate.getFullYear();

                                    var ed = new Date(ref.$scope.UpdatedReservedItem[i].EndDate).getDate();
                                    var em = new Date(ref.$scope.UpdatedReservedItem[i].EndDate).getMonth();
                                    var ey = new Date(ref.$scope.UpdatedReservedItem[i].EndDate).getFullYear();

                                    var startDate = new Date(sy, sm, sd);
                                    var existingStartDate = new Date(esy, esm, esd);
                                    var endDate = new Date(ey, em, ed);
                                    var existingEndDate = new Date(eey, eem, eed);


                                    var TempResItemId = ref.$scope.UpdatedReservedItem[i].ResItemId;
                                    var TempResCategoryId = ref.$scope.UpdatedReservedItem[i].ResCategoryId;
                                    var TempTimeRangeId = ref.$scope.UpdatedReservedItem[i].TimeRangeId;

                                    var soverlap = false;
                                    var eoverlap = false;

                                    //alert(" TempResItemId  " + TempResItemId + " , " + event.ResItemId + " , TempResCategoryId = " + TempResCategoryId + " , " + event.ResCategoryId + " , TempTimeRangeId = " + TempTimeRangeId + " ,  "+ event.TimeRangeId)

                                    if ((TempResItemId == event.ResItemId && TempResCategoryId == event.ResCategoryId && TempTimeRangeId == event.TimeRangeId)) {
                                        
                                        if ((existingStartDate <= endDate && existingStartDate >= startDate) || (existingEndDate <= endDate && existingEndDate >= startDate) || (existingStartDate <= startDate && startDate <= existingEndDate) || (existingStartDate <= endDate && endDate <= existingEndDate)) {
                                            //alert("existingStartDate = " + existingStartDate + " , comparedStartDate = " + startDate + " , existingEndDate = " + existingEndDate + " , comparedendDate" + endDate);
                                            ref.$window._alert();
                                            revertFunc();
                                            isoverlapped = true;


                                            break;
                                        }


                                    }


                                }

                            }


                            //Checking for overlap
                            if (!isoverlapped) {
                                for (var i = 0; i < ref.$scope.ReservedItems.length; i++) {

                                    if (ref.$scope.ReservedItems[i].ID === event.ID) continue;

                                    var end = new Date(new Date(ref.$scope.ReservedItems[i].end).setDate(new Date(ref.$scope.ReservedItems[i].end).getDate() - 1));


                                    var sd = new Date(ref.$scope.ReservedItems[i].start).getDate();
                                    var sy = new Date(ref.$scope.ReservedItems[i].start).getFullYear();
                                    var sm = new Date(ref.$scope.ReservedItems[i].start).getMonth();


                                    var esy = ref.$scope.DateRange.StartDate.getFullYear();
                                    var esm = ref.$scope.DateRange.StartDate.getMonth();
                                    var esd = ref.$scope.DateRange.StartDate.getDate();

                                    var eed = ref.$scope.DateRange.EndDate.getDate();
                                    var eem = ref.$scope.DateRange.EndDate.getMonth();
                                    var eey = ref.$scope.DateRange.EndDate.getFullYear();

                                    var ed = new Date(end.toLocaleDateString()).getDate();
                                    var em = new Date(end.toLocaleDateString()).getMonth();
                                    var ey = new Date(end.toLocaleDateString()).getFullYear();

                                    var startDate = new Date(sy, sm, sd);
                                    var existingStartDate = new Date(esy, esm, esd);
                                    var endDate = new Date(ey, em, ed);
                                    var existingEndDate = new Date(eey, eem, eed);


                                    var ResItemId = ref.$scope.ReservedItems[i].ResItemId;
                                    var ResCategoryId = ref.$scope.ReservedItems[i].ResCategoryId;
                                    var TimeRangeId = ref.$scope.ReservedItems[i].TimeRangeId;

                                    var soverlap = false;
                                    var eoverlap = false;


                                    if ((ResItemId == event.ResItemId && ResCategoryId == event.ResCategoryId && TimeRangeId == event.TimeRangeId)) {

                                        //alert("existingStartDate = " + existingStartDate + " , comparedStartDate = " + startDate + " , existingEndDate = " + existingEndDate + " , comparedendDate" + endDate )
                                        if ((existingStartDate <= endDate && existingStartDate >= startDate) || (existingEndDate <= endDate && existingEndDate >= startDate) || (existingStartDate <= startDate && startDate <= existingEndDate) || (existingStartDate <= endDate && endDate <= existingEndDate)) {

                                            ref.$window._alert();

                                            isoverlapped = true;
                                            for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                                if (ref.$scope.Reservation[i].Id == event.id) {

                                                    ref.$scope.Reservation[i].iscomplete = false;
                                                }
                                            }
                                            if (event.ID == 0 || event.ID == null) {
                                                $('#calendar').fullCalendar('removeEvents', event._id);
                                            }
                                            else {
                                                revertFunc();

                                            }

                                            break;
                                        }


                                    }


                                }
                            }
                            if (event.ID == 0 || event.ID == null) {


                                if (!isoverlapped) {

                                    isoverlapped = false;

                                    for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                        if (ref.$scope.Reservation[i].Id == event.id) {

                                            ref.$scope.Reservation[i].StartDate = ref.$scope.DateRange.StartDate.toLocaleDateString();
                                            ref.$scope.Reservation[i].EndDate = ref.$scope.DateRange.EndDate.toLocaleDateString();
                                            ref.$scope.Reservation[i].iscomplete = true;
                                        }
                                    }

                                }
                            }
                            else {

                                if (!isoverlapped) {
                                    isoverlapped = false;
                                    ref.$scope.DateRange = <model.booking.IDateRange>{};
                                    ref.$scope.DateRange.StartDate = new Date(event.start);
                                    ref.$scope.DateRange.EndDate = new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1));


                                    for (var i = 0; i < ref.$scope.ReservedItems.length; i++) {
                                        if (ref.$scope.ReservedItems[i].ID == event.ID) {

                                            //alert(event.ID);
                                            //alert("start = " + new Date(event.start) + " Current = " + ref.$scope.ReservedItems[i].start + " , End = " + new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1)));


                                            var reservation = <model.booking.IReservation>{};
                                            reservation.UserID = ref.$scope.ReservedItems[i].UserID;
                                            reservation.ResItemId = ref.$scope.ReservedItems[i].ResItemId;
                                            reservation.ResCategoryId = ref.$scope.ReservedItems[i].ResCategoryId;
                                            reservation.TimeRangeId = ref.$scope.ReservedItems[i].TimeRangeId;
                                            reservation.StartDate = ref.$scope.DateRange.StartDate.toLocaleDateString();
                                            reservation.EndDate = ref.$scope.DateRange.EndDate.toLocaleDateString();
                                            reservation.Id = ref.$scope.ReservedItems[i].ID;
                                            reservation.icon = ref.$scope.ReservedItems[i].icon;
                                            reservation.iscomplete = true;
                                            reservation.ReservationId = ref.$scope.ReservedItems[i].ReservationId;
                                            ref.$scope.UpdatedReservedItem.push(reservation);
                                            console.log(ref.$scope.UpdatedReservedItem);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            ref.$window._oldDays();
                            revertFunc();
                        }
                    },

                    eventAllow: function (dropLocation, draggedEvent) {
                        alert(draggedEvent.ID);

                        //if (draggedEvent.id === '999') {
                        //    return dropLocation.start.isAfter('2016-01-01'); // a boolean
                        //}
                        //else {
                        //    return true;
                        //}
                    },

                    eventResize: function (event, delta, revertFunc) {


                        var isoverlapped = false;

                        // setting the new times after reizing

                        ref.$scope.DateRange = <model.booking.IDateRange>{};
                        ref.$scope.DateRange.StartDate = new Date(event.start);
                        ref.$scope.DateRange.EndDate = new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1));


                        for (var i = 0; i < ref.$scope.Reservation.length; i++) {

                            if (ref.$scope.Reservation[i].Id === event.id) continue;




                            var sd = new Date(ref.$scope.Reservation[i].StartDate).getDate();
                            var sy = new Date(ref.$scope.Reservation[i].StartDate).getFullYear();
                            var sm = new Date(ref.$scope.Reservation[i].StartDate).getMonth();


                            var esy = ref.$scope.DateRange.StartDate.getFullYear();
                            var esm = ref.$scope.DateRange.StartDate.getMonth();
                            var esd = ref.$scope.DateRange.StartDate.getDate();

                            var eed = ref.$scope.DateRange.EndDate.getDate();
                            var eem = ref.$scope.DateRange.EndDate.getMonth();
                            var eey = ref.$scope.DateRange.EndDate.getFullYear();

                            var ed = new Date(ref.$scope.Reservation[i].EndDate).getDate();
                            var em = new Date(ref.$scope.Reservation[i].EndDate).getMonth();
                            var ey = new Date(ref.$scope.Reservation[i].EndDate).getFullYear();

                            var startDate = new Date(sy, sm, sd);
                            var existingStartDate = new Date(esy, esm, esd);
                            var endDate = new Date(ey, em, ed);
                            var existingEndDate = new Date(eey, eem, eed);


                            var TempResItemId = ref.$scope.Reservation[i].ResItemId;
                            var TempResCategoryId = ref.$scope.Reservation[i].ResCategoryId;
                            var TempTimeRangeId = ref.$scope.Reservation[i].TimeRangeId;

                            var soverlap = false;
                            var eoverlap = false;

                            //alert(" TempResItemId  " + TempResItemId + " , " + event.ResItemId + " , TempResCategoryId = " + TempResCategoryId + " , " + event.ResCategoryId + " , TempTimeRangeId = " + TempTimeRangeId + " ,  "+ event.TimeRangeId)

                            if ((TempResItemId == event.ResItemId && TempResCategoryId == event.ResCategoryId && TempTimeRangeId == event.TimeRangeId)) {

                                //alert("Ok");
                                // alert("existingStartDate = " + existingStartDate + " , comparedStartDate = " + startDate + " , existingEndDate = " + existingEndDate + " , comparedendDate" + endDate);
                                //if (((existingStartDate <= endDate && existingStartDate >= startDate) || (existingEndDate <= endDate && existingEndDate >= startDate)) || ((endDate <= existingStartDate && startDate >= existingStartDate) || (endDate <= existingEndDate && startDate >= existingEndDate )) ) {

                                //    ref.$window._alert();
                                //    revertFunc();
                                //    isoverlapped = true;
                                //    //for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                //    //    if (ref.$scope.Reservation[i].Id == event.id) {

                                //    //        ref.$scope.Reservation[i].iscomplete = false;
                                //    //    }
                                //    //}
                                //    //if (event.ID == 0 || event.ID == null) {
                                //    //    $('#calendar').fullCalendar('removeEvents', event._id);
                                //    //}
                                //    //else {
                                //    //    revertFunc();

                                //    //}

                                //    break;
                                //}

                                if (((existingEndDate >= startDate && existingEndDate <= endDate) && (existingStartDate <= startDate && existingStartDate <= endDate)) || ((startDate >= existingStartDate && startDate <= existingEndDate) && (endDate >= existingStartDate && endDate <= existingEndDate))) {

                                    ref.$window._alert();

                                    isoverlapped = true;
                                    revertFunc();
                                    //for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                    //    if (ref.$scope.Reservation[i].Id == event.id) {

                                    //        ref.$scope.Reservation[i].iscomplete = false;
                                    //    }
                                    //}
                                    //if (event.ID == 0 || event.ID == null) {
                                    //    $('#calendar').fullCalendar('removeEvents', event._id);
                                    //}
                                    //else {
                                    //    revertFunc();

                                    //}

                                    break;
                                }


                            }
                        }




                        //Checking for overlap
                        if (!isoverlapped) {
                            for (var i = 0; i < ref.$scope.ReservedItems.length; i++) {

                                if (ref.$scope.ReservedItems[i].ID === event.ID) continue;

                                var end = new Date(new Date(ref.$scope.ReservedItems[i].end).setDate(new Date(ref.$scope.ReservedItems[i].end).getDate() - 1));


                                var sd = new Date(ref.$scope.ReservedItems[i].start).getDate();
                                var sy = new Date(ref.$scope.ReservedItems[i].start).getFullYear();
                                var sm = new Date(ref.$scope.ReservedItems[i].start).getMonth();


                                var esy = ref.$scope.DateRange.StartDate.getFullYear();
                                var esm = ref.$scope.DateRange.StartDate.getMonth();
                                var esd = ref.$scope.DateRange.StartDate.getDate();

                                var eed = ref.$scope.DateRange.EndDate.getDate();
                                var eem = ref.$scope.DateRange.EndDate.getMonth();
                                var eey = ref.$scope.DateRange.EndDate.getFullYear();

                                var ed = new Date(end.toLocaleDateString()).getDate();
                                var em = new Date(end.toLocaleDateString()).getMonth();
                                var ey = new Date(end.toLocaleDateString()).getFullYear();

                                var startDate = new Date(sy, sm, sd);
                                var existingStartDate = new Date(esy, esm, esd);
                                var endDate = new Date(ey, em, ed);
                                var existingEndDate = new Date(eey, eem, eed);


                                var ResItemId = ref.$scope.ReservedItems[i].ResItemId;
                                var ResCategoryId = ref.$scope.ReservedItems[i].ResCategoryId;
                                var TimeRangeId = ref.$scope.ReservedItems[i].TimeRangeId;

                                var soverlap = false;
                                var eoverlap = false;


                                if ((ResItemId == event.ResItemId && ResCategoryId == event.ResCategoryId && TimeRangeId == event.TimeRangeId)) {

                                    // alert("existingStartDate = " + existingStartDate + " , comparedStartDate = " + startDate + " , existingEndDate = " + existingEndDate + " , comparedendDate" + endDate);


                                    if (((existingEndDate >= startDate && existingEndDate <= endDate) && (existingStartDate <= startDate && existingStartDate <= endDate)) || ((startDate >= existingStartDate && startDate <= existingEndDate) && (endDate >= existingStartDate && endDate <= existingEndDate))) {

                                        ref.$window._alert();

                                        isoverlapped = true;
                                        revertFunc();
                                        //for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                        //    if (ref.$scope.Reservation[i].Id == event.id) {

                                        //        ref.$scope.Reservation[i].iscomplete = false;
                                        //    }
                                        //}
                                        //if (event.ID == 0 || event.ID == null) {
                                        //    $('#calendar').fullCalendar('removeEvents', event._id);
                                        //}
                                        //else {
                                        //    revertFunc();

                                        //}

                                        break;
                                    }


                                    //if (((startDate >= existingStartDate && startDate <= existingEndDate) && (endDate >= existingStartDate && endDate <= existingEndDate))) {

                                    //    alert("2nd happen");
                                    //    ref.$window._alert();

                                    //    isoverlapped = true;
                                    //    revertFunc();
                                    //    //for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                    //    //    if (ref.$scope.Reservation[i].Id == event.id) {

                                    //    //        ref.$scope.Reservation[i].iscomplete = false;
                                    //    //    }
                                    //    //}
                                    //    //if (event.ID == 0 || event.ID == null) {
                                    //    //    $('#calendar').fullCalendar('removeEvents', event._id);
                                    //    //}
                                    //    //else {
                                    //    //    revertFunc();

                                    //    //}

                                    //    break;
                                    //}



                                }


                            }

                            if (event.ID == 0 || event.ID == null) {


                                if (!isoverlapped) {

                                    isoverlapped = false;

                                    for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                        if (ref.$scope.Reservation[i].Id == event.id) {

                                            ref.$scope.Reservation[i].StartDate = ref.$scope.DateRange.StartDate.toLocaleDateString();
                                            ref.$scope.Reservation[i].EndDate = ref.$scope.DateRange.EndDate.toLocaleDateString();
                                            ref.$scope.Reservation[i].iscomplete = true;
                                        }
                                    }

                                }
                            }
                            else {

                                if (!isoverlapped) {
                                    isoverlapped = false;
                                    ref.$scope.DateRange = <model.booking.IDateRange>{};
                                    ref.$scope.DateRange.StartDate = new Date(event.start);
                                    ref.$scope.DateRange.EndDate = new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1));


                                    for (var i = 0; i < ref.$scope.ReservedItems.length; i++) {
                                        if (ref.$scope.ReservedItems[i].ID == event.ID) {

                                            //alert(event.ID);
                                            //alert("start = " + new Date(event.start) + " Current = " + ref.$scope.ReservedItems[i].start + " , End = " + new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1)));


                                            var reservation = <model.booking.IReservation>{};
                                            reservation.UserID = ref.$scope.ReservedItems[i].UserID;
                                            reservation.ResItemId = ref.$scope.ReservedItems[i].ResItemId;
                                            reservation.ResCategoryId = ref.$scope.ReservedItems[i].ResCategoryId;
                                            reservation.TimeRangeId = ref.$scope.ReservedItems[i].TimeRangeId;
                                            reservation.StartDate = ref.$scope.DateRange.StartDate.toLocaleDateString();
                                            reservation.EndDate = ref.$scope.DateRange.EndDate.toLocaleDateString();
                                            reservation.Id = ref.$scope.ReservedItems[i].ID;
                                            reservation.icon = ref.$scope.ReservedItems[i].icon;
                                            reservation.iscomplete = true;
                                            reservation.ReservationId = ref.$scope.ReservedItems[i].ReservationId;
                                            ref.$scope.UpdatedReservedItem.push(reservation);
                                            console.log(ref.$scope.UpdatedReservedItem);


                                        }
                                    }
                                }
                            }

                            //if (!confirm("is this okay?")) {
                            //    revertFunc();
                            //}
                        }

                    },

                    viewRender: function (view) {
                        $('.cal2 .fc-toolbar').css({
                            'display': 'none',
                        });
                        $(".fc-list-table .fc-list-heading .fc-widget-header").attr('colspan', 4);
                    },

                    eventRender: function (event, element, icon) {

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
            this.GetReservedItems();
            $('#loader').fadeOut();

            //this.GetReservationItem(this.$scope.AgentId);

        }


        private getload = (doc: HTMLDocument): void => {

            doc.onload = function () {
                alert('Common code here');
            }
        }
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

        private CreateReservationItemCategory = (arg: model.booking.ICreateReservationCategoryRequest): void => {

            this.BookingService.CreateReservationItemCategory(arg).then((result: model.booking.ICreateReservationCategoryResponse) => {
                if (!result) {

                }
                else {
                    $('#createCategory').modal('hide');
                    this.GetReservationItemCategory();
                }
            });
        }


        private CreateBooking = (arg: any): void => {
            $('#loader').show();
            var request = <model.booking.ICreateReservationRequest>{};
            request.ReservationCollection = <Array<model.booking.IReservation>>{};
            request.UpdatedReservationCollection = <Array<model.booking.IReservation>>{};
            var array = [];
            var UpdatedReservationArray = [];

            if (this.$scope.Reservation != null) {

                for (var i = 0; i < this.$scope.Reservation.length; i++) {
                    if (this.$scope.Reservation[i].iscomplete == true) {
                        array.push(this.$scope.Reservation[i]);

                    }
                }
            }


            if (this.$scope.UpdatedReservedItem != null) {

                for (var i = 0; i < this.$scope.UpdatedReservedItem.length; i++) {
                    if (this.$scope.UpdatedReservedItem[i].iscomplete == true) {
                        UpdatedReservationArray.push(this.$scope.UpdatedReservedItem[i]);

                    }
                }
            }

            request.ReservationCollection = array;
            request.UpdatedReservationCollection = UpdatedReservationArray;

            this.$scope.isSaveClicked = true;

            console.log(request);

            this.BookingService.CreateBooking(request).then((result: model.booking.ICreateReservationItemResponse) => {
                if (!result.IsCreated) {


                }
                else {
                    $('#external-events > li').remove();

                    this.GetReservedItems();
                    this.$scope.Reservation = [];
                    this.$scope.UpdatedReservedItem = [];
                    this.$scope.isSaveClicked = false;
                    this.$scope.isSuccess = true;
                    this.$timeout(() => {
                        this.$scope.isSuccess = false;
                    }, 5000);

                    //  this.GetReservationItem();
                }
            });

        }

        private getTime = (): void => {



            var timepickers = $('.timepicker').wickedpicker();

            // if (!this.$scope.TimeRange) this.$scope.TimeRange = <services.IResponseArray<model.booking.ITimeRange>>{};

            var TimeValue = <model.booking.ITimeRange>{};
            TimeValue.StartTime = timepickers.wickedpicker('time', 0);
            TimeValue.EndTime = timepickers.wickedpicker('time', 1);
            this.$scope.TimeRange.push(TimeValue);
        }

        private RemoveRange = (arg: model.booking.ITimeRange, Id: number): void => {

            if (window.confirm("Do you really want to Delete this range?")) {
                this.$scope.TimeRange.splice(Id, 1);

                if (arg.Id != null) {

                    var request = <model.booking.IDeleteTimeRangeRequest>{};
                    request.Id = arg.Id
                    this.BookingService.RemoveRange(request).then((result: model.booking.IDeleteTimeRangeResponse) => {


                    });

                }
            }
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


        private GetReservedItems = (): void => {
            var request = <model.booking.IGetReservedItemRequest>{};
            request.UserID = this.$scope.AgentId;
            request.GroupID = this.$scope.GroupId;


            this.BookingService.GetReservedItems(request).then((result: services.IResponseArray<model.booking.IGetReservedItemResponse>) => {

                var items = [];

                for (var i = 0; i < result.length; i++) {
                    var Item = <model.booking.IGetReservation>{};

                    Item.ID = result[i].Id;
                    Item.title = "Done By :" + result[i].AgentName + "," + result[i].ResItemName + "(" + new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + " - " + new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
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


        private DeleteReservedItem = (Id: number): void => {
            var request = <model.booking.IDeleteReservedItemRequest>{};
            request.Id = Id;
            this.BookingService.DeleteReservedItem(request).then((result: model.booking.IDeleteReservedItemResponse) => {


                if (!result.IsDeleted) {

                }
                else {

                }

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
                    this.$scope.SendMail.email = "devapriyadil@gmail.com";

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
            this.$scope.IsSent = false;

        }

        private GetReservationItem = (): void => {
            this.$scope.TimeRange = [];
            var request = <model.booking.IGetReservationItemRequest>{};
            request.AgentId = this.$scope.GroupId;
            request.Id = this.$scope.SelectedReservationItem.Id;
            this.BookingService.GetReservationItem(request).then((result: model.booking.IGetReservationItemResponse) => {
                if (!result) {

                }
                else {

                    this.$scope.ReservationItemDisplay = result;
                    // this.$scope.ReservationItem.ResCategoryId = result.ResCategoryId;


                    this.$scope.AttachmentList = result.Attachments;
                    //this.$timeout(() => {
                      

                    //    $('#booking-carousel').owlCarousel({
                    //        loop: true,
                    //        margin: 0,
                    //        autoplay: true,
                    //        autoplayTimeout: 1000,
                    //        autoplayHoverPause: true,
                    //        nav: true,
                    //        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
                    //        responsive: {
                    //            0: {
                    //                items: 1,
                    //            }
                    //        }
                    //    });
                    //}, 400);

        
                   

                    if (result.TimeRange != null) {
                        for (var i = 0; i < result.TimeRange.length; i++) {
                            var time = <model.booking.ITimeRange>{};
                            time.Id = result.TimeRange[i].Id;
                            time.StartTime = new Date(result.TimeRange[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            time.EndTime = new Date(result.TimeRange[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                            this.$scope.TimeRange.push(time);
                        }

                        $('#loader').fadeOut();
                    }


                }


            });

            $('#ShowReservationItem').modal('show');
            
        }


    }
}