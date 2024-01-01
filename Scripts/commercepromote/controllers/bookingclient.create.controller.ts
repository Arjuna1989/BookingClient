module controllers.bookingclient {
    'use strict';

    export interface ICreateBookingScope {
        Service: any;
        Init(agentId: number,groupId:number);
        AgentId: number;
        GroupId: number;
        ReservationId: number;
        ReservationItem: model.booking.ICreateReservationItemRequest;
        Categories: services.IResponseArray<model.booking.IGetReservationCategoryResponse>;
        Category: model.booking.ICreateReservationCategoryRequest;

        isSaveClicked: boolean;
        isSuccess: boolean;

        CreateReservationItemCategory(arg: model.booking.ICreateReservationCategoryRequest): void;
        CreateReservation(arg: model.booking.ICreateReservationItemRequest): void;

        Files: Array<any>;
        $on(eventName: string, func: Function): void;
        getTime(): void;
        RemoveRange(arg: model.booking.ITimeRange, Id: number): void;
        TimeRange: any;
    }

    export class CreateBookingController {
        static $inject = ['$scope', '$sce', '$timeout', 'BookingService'];

        constructor(private $scope: ICreateBookingScope, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService,  private BookingService: services.booking.BookingService) {
            $scope.Service = BookingService;
            $('#loader').show();
            this.$scope.ReservationItem = <model.booking.ICreateReservationItemRequest>{};
            this.$scope.Categories = <services.IResponseArray<model.booking.IGetReservationCategoryResponse>>{};
            this.$scope.Category = <model.booking.ICreateReservationCategoryRequest>{};
            this.$scope.TimeRange =[];

       

            this.$scope.Init = this.InitializeCommands;

            this.$scope.$on("seletedFile", function (news, args) {
                $scope.Files = args.file;
            })




        }

        private InitializeCommands = (agentId: number, groupId: number): void => {
            this.$scope.AgentId = agentId;
            this.$scope.GroupId = groupId;
            this.$scope.isSaveClicked = false;
            this.$scope.isSuccess = false;

            this.$scope.CreateReservation = this.CreateReservation;
            this.$scope.CreateReservationItemCategory = this.CreateReservationItemCategory;
            this.$scope.getTime = this.getTime;
            this.$scope.RemoveRange = this.RemoveRange
            this.GetReservationItemCategory();
            //this.GetReservationItem(this.$scope.AgentId);

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
            request.GroupId = this.$scope.GroupId > 0 ? this.$scope.GroupId : this.$scope.AgentId;

            this.BookingService.GetReservationItemCategory(request).then((result: services.IResponseArray<model.booking.IGetReservationCategoryResponse>) => {
                if (!result) {
                    $('#loader').fadeOut();
                }
                else {
                    $('#loader').fadeOut();
                    this.$scope.Categories = result;
                }
            });
        }

        private CreateReservationItemCategory = (arg: model.booking.ICreateReservationCategoryRequest): void => {
            arg.GroupId = this.$scope.GroupId > 0 ? this.$scope.GroupId : this.$scope.AgentId;

            this.BookingService.CreateReservationItemCategory(arg).then((result: model.booking.ICreateReservationCategoryResponse) => {
                if (!result) {

                }
                else {
                    this.$scope.Category = <model.booking.ICreateReservationCategoryRequest>{};
                    $('#createCategory').modal('hide');
                    this.GetReservationItemCategory();
                }
            });
        }


      private CreateReservation = (arg: model.booking.ICreateReservationItemRequest): void => {
          this.$scope.isSaveClicked = true;
           arg.TimeRange = this.$scope.TimeRange;
           arg.AgentId = this.$scope.AgentId;

            var updateRequest = <services.IFileUploadRequest>{};
            updateRequest.model = arg;
            updateRequest.file = !this.$scope.Files ? [] : this.$scope.Files;

            console.log(updateRequest);
           this.BookingService.CreateReservation(updateRequest).then((result: model.booking.ICreateReservationItemResponse) => {
               if (!result.IsCreated) {

                }
               else {
                   this.$scope.ReservationItem = <model.booking.ICreateReservationItemRequest>{};
                   this.$scope.TimeRange = [];
                   this.$scope.Files = [];
             
                   $('.timepicker').wickedpicker();
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


    }
}