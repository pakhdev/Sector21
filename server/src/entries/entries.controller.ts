import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {EntriesService} from './entries.service';
import {CreateEntriesDto} from './dto/create-entries.dto';
import {ValidateDescriptionDto} from './dto/validate-description.dto';

@Controller('entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {
    }

    @Post('create')
    create(@Body() createEntriesDto: CreateEntriesDto): Promise<number[]> {
        return this.entriesService.create(createEntriesDto);
    }

    @Post('validate-description')
    validateBody(@Body() validateDescriptionDto: ValidateDescriptionDto): Promise<boolean> {
        return this.entriesService.validateDescription(validateDescriptionDto);
    }
}
