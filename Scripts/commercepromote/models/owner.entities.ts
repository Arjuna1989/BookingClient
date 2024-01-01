module model.booking {
    'use strict';
    export interface ITimeRange {
        Id: number;
        ResId: number;
        StartTime: string;
        EndTime: string;
        IsAvailable: boolean;
    }

    export interface IDateRange{
        Id: number;
        StartDate: Date;
        EndDate: Date;
     
    }

    export interface IReservation {
        Id: number;
        ResItemId: number;
        ResCategoryId: number;
        StartDate: string;
        EndDate: string;
        TimeRangeId: number;
        UserID: number;
        IsReserved: boolean;
        eventId: number;
        className: string;
        icon: string;
        iscomplete: boolean;
        ReservationId: number;

    }

    export interface IGetReservation {
        ID: number;
        UserID: number;
        title: string;
        start: Date;
        end: Date,
        description: string;
        className: any;
        icon: string;
        color: string;
        allDay: boolean;
        ResItemId: number;
        ResCategoryId: number;
        TimeRangeId: number;
        ReservationId: number;
        imageurl: string;
        ownerName: string;

    }
    export interface IGetReservationsByGroupIdRequest extends services.IRequestBase {
        GroupId: number;
    };

    export interface IGetReservationsByGroupIdResponse extends services.IResponseBase {
        Id: number;
        AgentName: string;
        AgentImg: string;
        StartTime: string;
        EndTime: string;
        StartDate: string;
        EndDate: string;
        TimeRangeId: number;
        DateRangeId: number;
        ReservationId: number;
        ResCategoryId: number;
        ResItemId: number;
        UserID: number;
        IsReserved: boolean;
        CategoryName: string;
        ResItemName: string;
        className: string;
        icon: string;
    };

   




}