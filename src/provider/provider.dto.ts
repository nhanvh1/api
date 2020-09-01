import { IsNotEmpty } from 'class-validator';

export class ProviderCreateRequestDto {
    name: string;

    @IsNotEmpty()
    key: string;
    description: string;
    storeId: string;

    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    url: string;

    redirect: string;
}
