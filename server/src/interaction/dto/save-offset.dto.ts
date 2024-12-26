import {IsInt} from "class-validator";

export class SaveOffsetDto {
    @IsInt()
    offset: number;
}