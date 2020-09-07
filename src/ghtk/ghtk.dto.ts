import { IsNotEmpty } from 'class-validator';

export class GhtkFeeRequestDto {
    pick_province: string;
    pick_district: string;
    weight: number;
    value: number;

    @IsNotEmpty()
    province: string;
    district: string;
}

export class GhtkAddress4RequestDto {
    province: string;
    district: string;
    ward_street: string;
}

export class GhTkOrderCreateDto {
    orderId: string;
    pick_name: string;
    pick_address: string;
    pick_province: string;
    pick_district: string;
    pick_ward: string;
    pick_tel: string;
    tel: string;
    name: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    hamlet: string;
    is_freeship: number;
    pick_date: Date;
    pick_money: number;
    note: string;
    value: number;
}

/*
{
    "orderId": "123456",
    "pick_name": "nhan",
    "pick_address": "hoa binh",
    "pick_province": "can tho",
    "pick_district": "ninh kieu",
    "pick_ward": "tan an",
    "pick_tel": "090897897",
    "tel": "090897897",
    "name": "Thi",
    "address": "nguyen trai",
    "province": "can tho",
    "district": "ninh kieu",
    "ward": "cai khe",
    "hamlet": "khác",
    "pick_money": 10000
}


 */