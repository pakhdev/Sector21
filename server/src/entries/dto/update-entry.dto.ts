import {PartialType} from '@nestjs/mapped-types';
import {CreateEntriesDto} from './create-entries.dto';

export class UpdateEntryDto extends PartialType(CreateEntriesDto) {
}
