import {ArrayNotEmpty, IsArray, IsInt, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class LabelItemDto {
    @IsInt()
    remoteId: number;

    @IsString()
    name: string;
}

export class LabelsValidationDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => LabelItemDto)
    labels: LabelItemDto[];
}
