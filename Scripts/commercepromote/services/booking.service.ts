module services.booking {

    'use strict';
    export interface IBookingService {
        GetReservationItems(request: model.booking.IGetReservationItemRequest): ng.IPromise<void | services.IResponseArray<model.booking.IGetReservationItemResponse>>;
        GetReservationItem(request: model.booking.IGetReservationItemRequest): ng.IPromise<void | model.booking.IGetReservationItemResponse>;
        GetReservationItemCategory(request: model.booking.IGetReservationCategoryRequest): ng.IPromise<void | services.IResponseArray<model.booking.IGetReservationCategoryResponse>>;
        CreateReservationItemCategory(request: model.booking.ICreateReservationCategoryRequest): ng.IPromise<void | model.booking.ICreateReservationCategoryResponse>;
        DeleteAttachmentById(request: model.booking.IDeleteAttachmentByIdRequest): ng.IPromise<void | model.booking.IDeleteAttachmentByIdResponse>;
        UpdateReservation(request: IFileUploadRequest): ng.IPromise<void | model.booking.IUpdateReservationItemResponse>;
        CreateReservation(request: IFileUploadRequest): ng.IPromise<void | model.booking.ICreateReservationItemResponse>;
        RemoveRange(request: model.booking.IDeleteTimeRangeRequest): ng.IPromise<void | model.booking.IDeleteTimeRangeResponse>;
        GetReservationItemByCategoryId(request: model.booking.GetReservationItemByCategoryIdRequest): ng.IPromise<void | services.IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>>;
        GetReservationTimeRangeById(request: model.booking.GetReservationTimeRangeByIdRequest): ng.IPromise<void | services.IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>>;
        CreateBooking(request: model.booking.ICreateReservationRequest): angular.IPromise<void | model.booking.ICreateReservationResponse>;
        GetReservedItems(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | services.IResponseArray<model.booking.IGetReservedItemResponse>>;
        GetAgentsReservedItems(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservedItemResponse>>;

        DeleteReservedItem(request: model.booking.IDeleteReservedItemRequest): angular.IPromise<void | model.booking.IDeleteReservedItemResponse>;

        FilterReservations(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | services.IResponseArray<model.booking.IGetReservedItemResponse>>;

        GetAllReservationByGroupId(request: model.booking.IGetReservationsByGroupIdRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservationsByGroupIdResponse>>;
        GetAgent(request: model.booking.IGetAgentByAgentIdRequest): angular.IPromise<void | model.booking.IGetAgentByAgentIdResponse>;
        SendMailToAgent(request: model.booking.ISendEmailToAgentRequest): angular.IPromise<void | model.booking.ISendEmailToAgentResponse>;

    }

    export class BookingService extends services.BaseService implements IBookingService {

        
     
        static $inject = ['$http'];

        constructor($http: ng.IHttpService) {
            super($http);
            this.executeQueryServiceUrl = 'api/booking/';
        }

        GetReservationItems(request: model.booking.IGetReservationItemRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservationItemResponse>> {
            return this.ServiceRequest<model.booking.IGetReservationItemRequest, IResponseArray<model.booking.IGetReservationItemResponse>>('/api/booking/GetReservationItemByAgentId', request);
        }

        GetReservationItem(request: model.booking.IGetReservationItemRequest): angular.IPromise<void | model.booking.IGetReservationItemResponse> {
            return this.ServiceRequest<model.booking.IGetReservationItemRequest, model.booking.IGetReservationItemResponse>('/api/booking/GetReservationItemsById', request);
        }


        GetReservationItemCategory(request: model.booking.IGetReservationCategoryRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservationCategoryResponse>> {
            return this.ServiceRequest<model.booking.IGetReservationCategoryRequest, IResponseArray<model.booking.IGetReservationCategoryResponse>>('/api/booking/GetReservationCategories', request);
        }

        CreateReservationItemCategory(request: model.booking.ICreateReservationCategoryRequest): angular.IPromise<void | model.booking.ICreateReservationCategoryResponse> {
            return this.ServiceRequest<model.booking.ICreateReservationCategoryRequest, model.booking.ICreateReservationCategoryResponse>('/api/booking/CreateReservationCategory', request);
        }


        DeleteAttachmentById(request: model.booking.IDeleteAttachmentByIdRequest): angular.IPromise<void | model.booking.IDeleteAttachmentByIdResponse> {
            return this.ServiceRequest<model.booking.IDeleteAttachmentByIdRequest, model.booking.IDeleteAttachmentByIdResponse>('/api/booking/DeleteReservationItemImg', request);
        }

        UpdateReservation(request: IFileUploadRequest): angular.IPromise<void | model.booking.IUpdateReservationItemResponse> {
            return this.ServiceFileRequest<IFileUploadRequest, model.booking.IUpdateReservationItemResponse>('/api/booking/UpdateReservationItem', request);

        }

        CreateReservation(request: IFileUploadRequest): angular.IPromise<void | model.booking.ICreateReservationItemResponse> {
            return this.ServiceFileRequest<IFileUploadRequest, model.booking.ICreateReservationItemResponse>('/api/booking/CreateReservationItem', request);
        }

        RemoveRange(request: model.booking.IDeleteTimeRangeRequest): angular.IPromise<void | model.booking.IDeleteTimeRangeResponse> {
            return this.ServiceRequest<model.booking.IDeleteTimeRangeRequest, model.booking.IDeleteTimeRangeResponse>('/api/booking/DeleteReservationTimeById', request);
        }

        GetReservationItemByCategoryId(request: model.booking.GetReservationItemByCategoryIdRequest): angular.IPromise<void | IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>> {
            return this.ServiceRequest<model.booking.GetReservationItemByCategoryIdRequest, IResponseArray<model.booking.GetReservationItemByCategoryIdResponse>>('/api/booking/GetAllReservationItemsByCategoryId', request);
        }


        GetReservationTimeRangeById(request: model.booking.GetReservationTimeRangeByIdRequest): angular.IPromise<void | IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>> {
            return this.ServiceRequest<model.booking.GetReservationTimeRangeByIdRequest, IResponseArray<model.booking.GetReservationTimeRangeByIdResponse>>('/api/booking/GetReservationTimeRangeById', request);
        }

        CreateBooking(request: model.booking.ICreateReservationRequest): angular.IPromise<void | model.booking.ICreateReservationResponse> {
            return this.ServiceJsonRequest<model.booking.ICreateReservationRequest, model.booking.ICreateReservationResponse>('/api/booking/CreateReservation', request);

        }

        GetReservedItems(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservedItemResponse>> {
            return this.ServiceRequest<model.booking.IGetReservedItemRequest, IResponseArray<model.booking.IGetReservedItemResponse>>('/api/booking/GetAllReservationByGroupId', request);
        }

        GetAgentsReservedItems(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservedItemResponse>> {
            return this.ServiceRequest<model.booking.IGetReservedItemRequest, IResponseArray<model.booking.IGetReservedItemResponse>>('/api/booking/GetAllReservationByUserId', request);
        }


        DeleteReservedItem(request: model.booking.IDeleteReservedItemRequest): angular.IPromise<void | model.booking.IDeleteReservedItemResponse> {
            return this.ServiceRequest<model.booking.IDeleteReservedItemRequest, model.booking.IDeleteReservedItemResponse>('/api/booking/DeleteResDateTimeRangeById', request);
        }

        FilterReservations(request: model.booking.IGetReservedItemRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservedItemResponse>> {
            return this.ServiceRequest<model.booking.IGetReservedItemRequest, IResponseArray<model.booking.IGetReservedItemResponse>>('/api/booking/FilterReservations', request);
        }

        GetAllReservationByGroupId(request: model.booking.IGetReservationsByGroupIdRequest): angular.IPromise<void | IResponseArray<model.booking.IGetReservationsByGroupIdResponse>> {
            return this.ServiceRequest<model.booking.IGetReservationsByGroupIdRequest, IResponseArray<model.booking.IGetReservationsByGroupIdResponse>>('/api/booking/GetAllReservationByGroupId', request);
        }

        GetAgent(request: model.booking.IGetAgentByAgentIdRequest): angular.IPromise<void | model.booking.IGetAgentByAgentIdResponse> {
            return this.ServiceRequest<model.booking.IGetAgentByAgentIdRequest,model.booking.IGetAgentByAgentIdResponse>('/api/booking/GetAgentByAgentId', request);
        }

        SendMailToAgent(request: model.booking.ISendEmailToAgentRequest): angular.IPromise<void | model.booking.ISendEmailToAgentResponse> {
            return this.ServiceRequest<model.booking.ISendEmailToAgentRequest, model.booking.ISendEmailToAgentResponse>('/api/booking/SendMailToAgent', request);
        }
    }
}