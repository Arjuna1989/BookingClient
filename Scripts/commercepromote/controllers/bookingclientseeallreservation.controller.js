var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var SeeAllReservationController = /** @class */ (function () {
            function SeeAllReservationController($scope, $sce, $timeout, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.BookingService = BookingService;
                this.InitializeCommands = function (agentId, groupId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.GroupId = groupId > 0 ? groupId : agentId;
                    _this.$scope.ResItemId = 0;
                    _this.$scope.ResCategoryId = 0;
                    _this.$scope.ReservationId = 0;
                    _this.$scope.TimeRangeId = 0;
                    _this.$scope.UserID = agentId;
                    _this.$scope.isSuccess = false;
                    _this.$scope.isSaveClicked = false;
                    _this.$scope.isSuccess = false;
                    var ref = _this;
                    $(document).ready(function () {
                        "use strict";
                        var date = new Date();
                        var d = date.getDate();
                        var m = date.getMonth();
                        var y = date.getFullYear();
                        var count = 0;
                        var hdr = {
                            left: 'title',
                            center: 'month,agendaWeek,agendaDay',
                            right: 'prev,today,next'
                        };
                        var initDrag = function (e) {
                            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                            // it doesn't need to have a start or end
                            ref.$scope.class = $.trim(e.children('span').attr('class'));
                            ref.$scope.icon = $.trim(e.children('span').attr('data-icon'));
                            var eventObject = {
                                title: $.trim(e.children().text()),
                                description: $.trim(e.children('span').attr('data-description')),
                                icon: $.trim(e.children('span').attr('data-icon')),
                                className: $.trim(e.children('span').attr('class')),
                                id: 0,
                                ResItemId: ref.$scope.SelectedReservationItem.Id,
                                ResCategoryId: ref.$scope.SelectedCategory.Id,
                                TimeRangeId: ref.$scope.Time.Id,
                                imageurl: '',
                                ownerName: '',
                            };
                            // store the Event Object in the DOM element so we can get to it later
                            e.data('eventObject', eventObject);
                            // make the event draggable using jQuery UI
                            e.draggable({
                                zIndex: 999,
                                revert: true,
                                revertDuration: 0,
                            });
                            e.resizable({});
                        };
                        var addEvent = function (event, title, priority, description, icon, start, end) {
                            title = title.length === 0 ? "Untitled Event" : title;
                            description = description.length === 0 ? "No Description" : description;
                            icon = icon.length === 0 ? " " : icon;
                            priority = priority.length === 0 ? "label label-default" : priority;
                            var html = $('<li><span class="' + priority + '" data-description="' + description + '" data-icon="' +
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
                            var title = /*$('#reservationItem:selected').text()*/ ref.$scope.SelectedReservationItem.Name + "(" + ref.$scope.Time.StartTime + " - " + ref.$scope.Time.EndTime + ")", priority = $('input:radio[name=priority]:checked').val(), description = /*$('#category:selected').text()*/ ref.$scope.SelectedCategory.Name, icon = $('input:radio[name=iconselect]:checked').val(), start = !ref.$scope.Time.StartTime ? '' : ref.$scope.Time.StartTime, end = !ref.$scope.Time.EndTime ? '' : ref.$scope.Time.EndTime;
                            addEvent(event, title, priority, description, icon, start, end);
                        });
                        /* initialize the calendar
                         -----------------------------------------------------------------*/
                        //
                        //
                        $('#calendar').fullCalendar({
                            header: hdr,
                            editable: false,
                            droppable: false,
                            selectable: false,
                            eventOverlap: false,
                            hdr: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
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
                                element.append('<td class="w3-center"><button class="fc-delete-item ">Delete</button></td>');
                                element.find(".w3-center").on("click", function () {
                                    var result = confirm("Delete Event");
                                    if (result) {
                                        console.log(event);
                                        localStorage.setItem("delete_id", event.id);
                                        $('#calendar').fullCalendar('removeEvents', event._id);
                                        if (event.ID != null) {
                                            ref.$scope.DeleteReservedItem(event.ID);
                                        }
                                        else {
                                            for (var i = 0; i < ref.$scope.Reservation.length; i++) {
                                                if (ref.$scope.Reservation[i].Id == event.id) {
                                                    ref.$scope.Reservation[i].iscomplete = false;
                                                }
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
                    _this.GetReservedItems();
                    //this.GetReservationItem(this.$scope.AgentId);
                };
                this.GetReservedItems = function () {
                    var request = {};
                    request.UserID = _this.$scope.AgentId;
                    request.GroupID = _this.$scope.GroupId;
                    _this.BookingService.GetReservedItems(request).then(function (result) {
                        var items = [];
                        for (var i = 0; i < result.length; i++) {
                            var Item = {};
                            Item.ID = result[i].Id;
                            Item.title = "Reserved By : " + result[i].AgentName + " , " + result[i].ResItemName + "(" + new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + " - " + new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
                            Item.start = new Date(Date.parse(result[i].StartDate));
                            var end = new Date(new Date(result[i].EndDate).setDate(new Date(result[i].EndDate).getDate() + 1));
                            Item.end = new Date(Date.parse(end.toLocaleDateString()));
                            Item.allDay = true;
                            Item.description = result[i].CategoryName;
                            var _class = result[i].className != "" ? result[i].className : "bg-color-greenLight";
                            Item.className = ["event", _class];
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
                        _this.$scope.ReservedItems = items;
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
                            };
                            // finish setting up calendar
                            CAL.refresh();
                        });
                        $('#loader').fadeOut();
                    });
                };
                $scope.Service = BookingService;
                $('#loader').show();
                this.$scope.ReservationItem = {};
                this.$scope.Categories = {};
                this.$scope.Category = {};
                this.$scope.ReservationTimeRange = {};
                this.$scope.ReservationItems = {};
                this.$scope.TimeRange = [];
                this.$scope.SelectedCategory = {};
                this.$scope.SelectedReservationItem = {};
                this.$scope.Reservation = [];
                this.$scope.DateRange = {};
                this.$scope.DateRange.StartDate = new Date();
                this.$scope.DateRange.EndDate = new Date();
                this.$scope.Time = {};
                this.$scope.ReservedItem = {};
                this.$scope.ReservedItems = [];
                this.$scope.UpdatedReservedItem = [];
                this.$scope.eventId = 0;
                this.$scope.Init = this.InitializeCommands;
                this.$scope.$on("seletedFile", function (news, args) {
                    $scope.Files = args.file;
                });
            }
            SeeAllReservationController.$inject = ['$scope', '$sce', '$timeout', 'BookingService'];
            return SeeAllReservationController;
        }());
        bookingclient.SeeAllReservationController = SeeAllReservationController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclientseeallreservation.controller.js.map