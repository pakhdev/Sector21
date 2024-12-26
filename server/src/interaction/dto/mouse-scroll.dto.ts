import {IsInt} from "class-validator";
import {CoordinatesDto} from "./coordinates.dto";

export class MouseScrollDto extends CoordinatesDto {
    @IsInt()
    offset: number;
}
