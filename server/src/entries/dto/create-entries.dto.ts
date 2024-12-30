import {IsInt, IsString, MinLength, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class SingleEntryDto {
    @IsInt()
    remoteId: number;

    @MinLength(1)
    @IsString()
    name: string;

    @MinLength(1)
    @IsString()
    url: string;

    @MinLength(1)
    @IsString()
    company: string;

    @MinLength(1)
    @IsString()
    location: string;
}

export class CreateEntriesDto {
    @ValidateNested({each: true})
    @Type(() => SingleEntryDto)
    entries: SingleEntryDto[];
}
