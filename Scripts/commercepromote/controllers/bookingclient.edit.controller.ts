module controllers.bookingclient {
    'use strict';

    export interface IEditBookingScope {
        Service: any;
        Init(agentId: number, groupId: number, ReservationId: number);
        AgentId: number;
        GroupId: number;
        ReservationId: number;
        ReservationItem: model.booking.IGetReservationItemResponse;
        Categories: services.IResponseArray<model.booking.IGetReservationCategoryResponse>;
        Category: model.booking.ICreateReservationCategoryRequest;
        AttachmentList: services.IResponseArray<model.booking.IGetAttachmentPath>
        isdeleteClicked: boolean;
        isSaveClicked: boolean;
        IsSuccessfullyDeleted: boolean;
        isSuccess: boolean;
        Files: Array<any>;
        TimeRange: any;
        $on(eventName: string, func: Function): void;
        UpdateReservation(arg: model.booking.IGetReservationItemResponse): void;
        DeleteAttachment(Id: number): void;
        RemoveRange(arg: model.booking.ITimeRange, Id: number): void;
        getTime(): void;



        CreateReservationItemCategory(arg: model.booking.ICreateReservationCategoryRequest): void;
    }

    export class EditBookingController {
        static $inject = ['$scope', '$sce', '$timeout', 'BookingService'];

        constructor(private $scope: IEditBookingScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService, private BookingService: services.booking.BookingService) {
            $('#loader').show();
            $scope.Service = BookingService;
            this.$scope.ReservationItem = <model.booking.IGetReservationItemResponse>{};
            this.$scope.Categories = <services.IResponseArray<model.booking.IGetReservationCategoryResponse>>{};
            this.$scope.Category = <model.booking.ICreateReservationCategoryRequest>{};
            this.$scope.AttachmentList = <services.IResponseArray<model.booking.IGetAttachmentPath>>{};
            this.$scope.isdeleteClicked = false;
            this.$scope.IsSuccessfullyDeleted = false;
            this.$scope.isSaveClicked = false;
            this.$scope.isSuccess = false;
            this.$scope.TimeRange = [];
            this.$scope.Init = this.InitializeCommands;

            this.$scope.$on("seletedFile", function (news, args) {
                $scope.Files = args.file;
            })




        }

        private InitializeCommands = (agentId: number, groupId: number, ReservationId: number): void => {
            this.$scope.AgentId = agentId;
            this.$scope.ReservationId = ReservationId;
            this.$scope.GroupId = groupId;

            this.$scope.CreateReservationItemCategory = this.CreateReservationItemCategory;
            this.$scope.UpdateReservation = this.UpdateReservation;
            this.$scope.DeleteAttachment = this.DeleteAttachments;
            this.$scope.RemoveRange = this.RemoveRange;
            this.$scope.getTime = this.getTime;

            this.GetReservationItem();
            this.GetReservationItemCategory();

        }

        private GetReservationItem = (): void => {
            this.$scope.TimeRange = [];
            var request = <model.booking.IGetReservationItemRequest>{};
            request.AgentId = this.$scope.AgentId;
            request.Id = this.$scope.ReservationId;
            this.BookingService.GetReservationItem(request).then((result: model.booking.IGetReservationItemResponse) => {
                if (!result) {

                }
                else {

                    this.$scope.ReservationItem = result;
                   // this.$scope.ReservationItem.ResCategoryId = result.ResCategoryId;
               

                    this.$scope.AttachmentList = result.Attachments;

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
        }

        private GetReservationItemCategory = (): void => {
            var request = <model.booking.IGetReservationCategoryRequest>{};
            request.GroupId = this.$scope.AgentId;
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

        private DeleteAttachments = (ID: number): void => {
           
            this.$scope.isdeleteClicked = true;
            var request = <model.booking.IDeleteAttachmentByIdRequest>{};
            request.Id = ID;
            if (window.confirm("Do you really want to Delete?")) {
                this.BookingService.DeleteAttachmentById(request).then((result: model.booking.IDeleteAttachmentByIdResponse) => {
                    if (!result.IsDeleted) {
                        this.$scope.isdeleteClicked = false;
                    }
                    else {
                        this.$scope.isdeleteClicked = false;
                        this.$scope.IsSuccessfullyDeleted = true;
                        this.$timeout(() => {
                            this.$scope.IsSuccessfullyDeleted = false;
                        }, 5000);
                        this.GetReservationItem();
                    }

                });
            }
        }

        UpdateReservation = (arg: model.booking.IGetReservationItemResponse): void => {
            this.$scope.isSaveClicked = true;
            var reservation = <model.booking.IUpdateReservationItemRequest>{};
            reservation = arg;
            reservation.TimeRange = this.$scope.TimeRange;
            reservation.AgentId = this.$scope.AgentId;

            var updateRequest = <services.IFileUploadRequest>{};
            updateRequest.model = reservation;
            updateRequest.file = !this.$scope.Files ? [] : this.$scope.Files;

            console.log(updateRequest);
            this.BookingService.UpdateReservation(updateRequest).then((result: model.booking.IUpdateReservationItemResponse) => {
                if (!result.IsUpdated) {


                }
                else {
                    this.$scope.TimeRange = [];
                    this.GetReservationItem();
                    this.$scope.isSaveClicked = false;
                    this.$scope.isSuccess = true;
                    this.$timeout(() => {
                        this.$scope.isSuccess = false;
                    }, 5000);

                   
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

                if (arg.Id > 0 || arg.Id != null) {
             
                    var request = <model.booking.IDeleteTimeRangeRequest>{};
                    request.Id = arg.Id
                    this.BookingService.RemoveRange(request).then((result: model.booking.IDeleteTimeRangeResponse) => {
                        if (!result) {

                        }
                        else {
                            this.GetReservationItem();
                        }



                    });

                }
            }
        }

       
   
    }
}