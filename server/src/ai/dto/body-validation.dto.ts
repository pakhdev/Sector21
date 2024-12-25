import {IsInt, IsString} from "class-validator";

export class BodyValidationDto {
    @IsInt()
    id: number;

    @IsString()
    body: string;
}
