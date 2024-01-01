var controllers;
(function (controllers) {
    var bookingclient;
    (function (bookingclient) {
        'use strict';
        var SeeAllReservationController = /** @class */ (function () {
            function SeeAllReservationController($scope, $sce, $timeout, $window, BookingService) {
                var _this = this;
                this.$scope = $scope;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.$window = $window;
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
                    _this.$scope.IsSendingEmail = false;
                    _this.$scope.GetReservationTimeRangeById = _this.GetReservationTimeRangeById;
                    _this.$scope.GetReservationItemByCategoryId = _this.GetReservationItemByCategoryId;
                    _this.$scope.GetReservedItems = _this.GetReservedItems;
                    _this.$scope.Close = _this.Close;
                    _this.$scope.SendMailToAgent = _this.SendMailToAgent;
                    _this.$scope.GetAgent = _this.GetAgent;
                    _this.$scope.DeleteReservedItem = _this.DeleteReservedItem;
                    var ref = _this;
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
                            droppable: false,
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
                    _this.GetReservationItemCategory();
                    //this.GetReservationItem(this.$scope.AgentId);
                };
                this.GetReservedItems = function () {
                    _this.RemoveEvents();
                    _this.$scope.isClicked = true;
                    $('#loader').show();
                    var request = {};
                    request.UserID = _this.$scope.AgentId;
                    request.GroupID = _this.$scope.GroupId;
                    request.SelectedReservationItemId = _this.$scope.SelectedReservationItem.Id;
                    request.SelectedCategoryId = _this.$scope.SelectedCategory.Id;
                    request.TimeId = !_this.$scope.Time ? 0 : _this.$scope.Time.Id;
                    _this.BookingService.FilterReservations(request).then(function (result) {
                        if (!result.length) {
                            _this.$window.NoReservation();
                            _this.$scope.isClicked = false;
                        }
                        else {
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
                            _this.$scope.isClicked = false;
                            $('#loader').fadeOut();
                        }
                    });
                };
                this.Close = function () {
                    $('#noreservation').modal('hide');
                };
                this.GetReservationItemCategory = function () {
                    var request = {};
                    request.GroupId = _this.$scope.GroupId;
                    _this.BookingService.GetReservationItemCategory(request).then(function (result) {
                        if (!result) {
                        }
                        else {
                            _this.$scope.Categories = result;
                        }
                    });
                };
                this.GetReservationItemByCategoryId = function (arg) {
                    _this.$scope.SelectedCategory = arg;
                    var request = {};
                    request.Id = arg.Id;
                    _this.BookingService.GetReservationItemByCategoryId(request).then(function (result) {
                        _this.$scope.ReservationItems = result;
                    });
                };
                this.GetReservationTimeRangeById = function (arg) {
                    if (!arg) {
                    }
                    else {
                        _this.$scope.TimeRange = [];
                        _this.$scope.SelectedReservationItem = arg;
                        var request = {};
                        request.Id = arg.Id;
                        _this.BookingService.GetReservationTimeRangeById(request).then(function (result) {
                            _this.$scope.ReservationTimeRange = result;
                            if (result != null) {
                                for (var i = 0; i < result.length; i++) {
                                    var time = {};
                                    time.Id = result[i].Id;
                                    time.StartTime = new Date(result[i].StartTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                    time.EndTime = new Date(result[i].EndTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                                    _this.$scope.TimeRange.push(time);
                                }
                            }
                        });
                    }
                };
                this.GetReservedTime = function (arg) {
                    _this.$scope.Time = {};
                    _this.$scope.Time = arg;
                };
                this.RemoveEvents = function () {
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
                        };
                        // finish setting up calendar
                        CAL.refresh();
                    });
                };
                this.GetAgent = function (AgentId) {
                    _this.$scope.SendMail = {};
                    var request = {};
                    request.AgentId = AgentId;
                    _this.BookingService.GetAgent(request).then(function (result) {
                        if (!result) {
                        }
                        else {
                            _this.$scope.SendMail = result;
                            $('#createMail').modal('show');
                        }
                    });
                };
                this.SendMailToAgent = function (Mail) {
                    _this.$scope.IsSendingEmail = true;
                    _this.BookingService.SendMailToAgent(Mail).then(function (result) {
                        _this.$scope.IsSendingEmail = false;
                        _this.$scope.SendMail = {};
                        $('#createMail').modal('hide');
                        if (!result) {
                            _this.$window._emailSendingError();
                        }
                        else {
                            _this.$window._emailSuccess();
                        }
                    });
                };
                this.close = function () {
                    _this.$scope.IsSendingEmail = false;
                };
                this.DeleteReservedItem = function (Id, _id) {
                    var request = {};
                    request.Id = Id;
                    _this.BookingService.DeleteReservedItem(request).then(function (result) {
                        if (!result.IsDeleted) {
                            _this.$window.DeleteError();
                        }
                        else {
                            _this.$window.DeleteSuccess();
                            $('#calendar').fullCalendar('removeEvents', _id);
                        }
                    });
                };
                $scope.Service = BookingService;
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
                this.$scope.SendMail = {};
                this.$scope.ReservedItem = {};
                this.$scope.ReservedItems = [];
                this.$scope.UpdatedReservedItem = [];
                this.$scope.eventId = 0;
                this.$scope.isClicked = false;
                this.$scope.Init = this.InitializeCommands;
                this.$scope.$on("seletedFile", function (news, args) {
                    $scope.Files = args.file;
                });
            }
            SeeAllReservationController.$inject = ['$scope', '$sce', '$timeout', '$window', 'BookingService'];
            return SeeAllReservationController;
        }());
        bookingclient.SeeAllReservationController = SeeAllReservationController;
    })(bookingclient = controllers.bookingclient || (controllers.bookingclient = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=bookingclient.seeallreservation.controller.js.map