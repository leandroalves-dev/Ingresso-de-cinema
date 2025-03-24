export interface SessionPrice {
    days: string;
    fullPrice: number;
    halfPrice: number;
}

export interface SessionTypes {
    weekdays: SessionPrice;
    weekends: SessionPrice;
}

export interface Prices {
    sessions: {
        "2D": SessionTypes;
        "3D": SessionTypes;
        premium: SessionTypes;
    };
}
