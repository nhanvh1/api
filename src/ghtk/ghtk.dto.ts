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
