import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {EntriesService} from './entries.service';
import {CreateEntriesDto} from './dto/create-entries.dto';
import {UpdateEntryDto} from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {
    }

    @Post('create')
    create(@Body() createEntriesDto: CreateEntriesDto) {
        return this.entriesService.create(createEntriesDto);
    }

    // @Post('validate')
    // validateDescription(@Body() createEntryDto: CreateEntriesDto) {
    //     return this.entriesService.validateDescription(createEntryDto);
    // }
}
