export enum Slottype {
    car = "car",
    bike = "bike",
    ev = "ev"
}

export enum Slotstatus {
    available = "available",
    occupied = "occupied",
    reserved = "reserved"
}


export enum Bookingstatus {
    active = "active",
    completed = "completed",
    cancelled = "cancelled"
}

export enum paymentstatus {
    pending = "pending",
    paid = "paid",
    failed = "failed",
    refunded = "refunded"
}

export enum paymentmethod {
    upi = "upi",
    card = "card",
    cash = "cash"
}

export enum invoicestatus {
    pending = "pending",
    paid = "paid",
}

export enum reservationstatus {
    active = "active",
    expired = "expired",
    cancelled = "cancelled",
}

export enum userrole {
    user = "user",
    admin = "admin"
}