import {IsInt, IsString} from "class-validator";

export class ValidateDescriptionDto  {
    @IsInt()
    remoteId: number;

    @IsString()
    body: string;
}
