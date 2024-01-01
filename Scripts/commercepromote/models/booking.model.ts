module model.booking {

    export interface IGetReservationItemRequest extends services.IRequestBase {

        AgentId: number;
        Id: number;

    };

    export interface IGetReservationItemResponse extends services.IResponseBase {

        Id: number;
        AgentId: number;
        ResCategoryId: number;
        Name: string;
        IsMultiple: boolean;
        MaxItemCount: number;
        MinItemCount: number;
        price: number;
        TimeRange: Array<ITimeRange>;
        IsReserved: boolean;
        ReservedBy: number;
        ReservationHours: number;
        Address: string;
        Location: string;
        ColorCode: string;
        Attachments: services.IResponseArray<IGetAttachmentPath>;

    };



    export interface ICreateReservationItemRequest extends services.IRequestBase {

        Id: number;
        ResCategoryId: number;
        Name: string;
        IsMultiple: boolean;
        MaxItemCount: number;
        MinItemCount: number;
        price: number;
        TimeRange: Array<ITimeRange>;
        IsReserved: boolean;
        ReservationHours: number;
        Address: string;
        Location: string;
        ColorCode: string;
    };
    export interface ICreateReservationItemResponse extends services.IResponseBase {
        IsCreated: boolean;

    };
    export interface ICreateReservationCategoryRequest extends services.IRequestBase {

        Id: number;
        GroupId: number;
        Name: string;

    };
    export interface ICreateReservationCategoryResponse extends services.IResponseBase {

        IsCreated: boolean;

    };

    export interface ICreateReservationItemimgRequest extends services.IRequestBase {

        Id: number;
        ResItemId: number;
        Name: string;

    };

    export interface ICreateReservationItemimgResponse extends services.IResponseBase {

        IsCreated: boolean;

    };

    export interface IGetReservationCategoryRequest extends services.IRequestBase {

        GroupId: number;
    };
   
    export interface IGetReservationCategoryResponse extends services.IResponseBase {

        Id: number;
        Name: string;
        GroupId: number;
    };

    export interface IGetReservationCategoryRequest extends services.IRequestBase {

    };

    export interface ICreateReservationCategoryRequest extends services.IRequestBase {
        
        Name: string;
    };

    export interface ICreateReservationCategoryResponse extends services.IRequestBase {
        IsCreated: boolean;
    };

    export interface IGetAttachmentPath extends services.IResponseBase {
        AttachmentId: number;
        AttachmentURL: string;
        AttachmentName: string;
    }

    export interface IDeleteAttachmentByIdRequest extends services.IRequestBase {
        Id: number;
    };

    export interface IDeleteAttachmentByIdResponse extends services.IResponseBase {
        IsDeleted: boolean;
    };

    export interface IUpdateReservationItemRequest extends services.IRequestBase {

        Id: number;
        AgentId: number;
        ResCategoryId: number;
        Name: string;
        IsMultiple: boolean;
        MaxItemCount: number;
        MinItemCount: number;
        price: number;
        TimeRange: Array<ITimeRange>;
        IsReserved: boolean;
        ReservedBy: number;
        ReservationHours: number;
        Address: string;
        Location: string;
        Attachments: services.IResponseArray<IGetAttachmentPath>;

    };

    export interface IUpdateReservationItemResponse extends services.IResponseBase {

        IsUpdated: boolean;
    }

    export interface ICreateReservationItemRequest extends services.IRequestBase {

        Id: number;
        AgentId: number;
        ResCategoryId: number;
        Name: string;
        IsMultiple: boolean;
        MaxItemCount: number;
        MinItemCount: number;
        price: number;
        StartTime: Date;
        EndTime: Date;
        IsReserved: boolean;
        ReservedBy: number;
        ReservationHours: number;
        Address: string;
        Location: string;
        Attachments: services.IResponseArray<IGetAttachmentPath>;

    };

    export interface ICreateReservationItemResponse extends services.IResponseBase {

        IsCreated: boolean;
    }

 

    export interface IDeleteTimeRangeRequest extends services.IRequestBase {

        Id: number;
    }

    export interface IDeleteTimeRangeResponse extends services.IResponseBase {

        IsDeleted: boolean;
    }

    export interface GetReservationItemByCategoryIdRequest extends services.IRequestBase {

        Id: number;
    }

    export interface GetReservationItemByCategoryIdResponse extends services.IResponseBase {

        Id: number;
        ResCategoryId: number;
        AgentId: number;
        Name: string;
        Price: number;
        IsReserved: boolean;
        ReservedBy: number;
        Address: string;
        Location: string;
        ColorCode: string;
    }

    export interface GetReservationItemByCategoryIdRequest extends services.IRequestBase {

        Id: number;
    }

    export interface GetReservationTimeRangeByIdRequest extends services.IRequestBase {

        Id: number;
    }

    export interface GetReservationTimeRangeByIdResponse extends services.IResponseBase {
    
        Id: number;
        ResId: number;
        StartTime: string;
        EndTime: string;
        IsAvailable: boolean;
    }

    export interface ICreateReservationRequest extends services.IRequestBase {

        ReservationCollection: Array<IReservation>;
        UpdatedReservationCollection: Array<IReservation>;


    }

    export interface ICreateReservationResponse extends services.IResponseBase {

        IsCreated: boolean;
        
    }


    export interface IGetReservedItemRequest extends services.IRequestBase {

        UserID: number;
        GroupID: number;
        SelectedReservationItemId: number;
        SelectedCategoryId: number;
        TimeId: number;



    }

    export interface IGetReservedItemResponse extends services.IResponseBase {


        Id: number;
        CategoryName: string;      
        DateRangeId: number;
        EndDate: string;
        EndTime: string;
        IsReserved: false;
        ResCategoryId: number;
        ResItemId: number;
        ResItemName: number;    
        ReservationId: number;
        StartDate: string;
        StartTime: string;
        TimeRangeId: number;
        UserID: number;
        className: string;
        icon: string;
        AgentName: string;
        AgentImg: string;
    }


    export interface IDeleteReservedItemRequest extends services.IRequestBase {

        Id: number;


    }

    export interface IDeleteReservedItemResponse extends services.IResponseBase {

        IsDeleted: boolean;


    }

    export interface IGetAllReservationCategoryResponse extends services.IResponseBase {

        Id: number;
        Name: string;
    };

    export interface IGetAllReservationCategoryRequest extends services.IRequestBase {

    };

    export interface IGetAgentByAgentIdRequest extends services.IRequestBase {
        AgentId: number
    };

    export interface IGetAgentByAgentIdResponse extends services.IResponseBase {
        agentId: number;
        PreferredName: string;
        email: string;
        body: string;


    };
    
    export interface ISendEmailToAgentRequest extends services.IRequestBase {
        agentId: number;
        email: string;
        body: string;
        PreferredName: string;

    };

    export interface ISendEmailToAgentResponse extends services.IResponseBase {
        IsSent: boolean;

    };

    

}