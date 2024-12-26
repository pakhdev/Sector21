import {IsInt} from "class-validator";

export class CoordinatesDto {
    @IsInt()
    x: number;

    @IsInt()
    y: number;
}
