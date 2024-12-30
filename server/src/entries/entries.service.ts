import {Injectable} from '@nestjs/common';
import {CreateEntriesDto} from './dto/create-entries.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Entry} from "./entities/entry.entity";
import {In, Repository} from "typeorm";
import {AiService} from "../ai/ai.service";

@Injectable()
export class EntriesService {
    constructor(
        @InjectRepository(Entry) private readonly entriesRepository: Repository<Entry>,
        private readonly aiService: AiService,
    ) {}

    async create(createEntriesDto: CreateEntriesDto): Promise<number[]> {
        const existingEntries = await this.findByRemoteIds(createEntriesDto.entries.map(entry => entry.remoteId));
        const newEntries = await this.validateAndInsert(createEntriesDto, existingEntries.map(entry => entry.remoteId));
        return [
            ...existingEntries,
            ...newEntries,
        ].filter(entry => entry.isValid && !entry.isChecked).map(entry => entry.remoteId);
    }

    async validateAndInsert(createEntriesDto: CreateEntriesDto, excludeRemoteIds: number[]): Promise<Entry[]> {
        console.log('excludeRemoteIds', excludeRemoteIds);
        const entriesToInsert: Entry[] = createEntriesDto.entries
            .filter(entry => !excludeRemoteIds.includes(entry.remoteId))
            .map(entry => {
                return this.entriesRepository.create({
                    ...entry,
                    isValid: false,
                    notValidReason: '',
                    isChecked: false,
                });
        });
        if (!entriesToInsert.length) return [];
        const aiValidationResult = await this.aiService.validateLabels({
            labels: createEntriesDto.entries
                .map(entry => ({name: entry.name, remoteId: entry.remoteId})) });
        aiValidationResult.labels.forEach((label) => {
            const entry = entriesToInsert.find(entry => entry.remoteId === label.remoteId);
            if (entry) {
                entry.isValid = label.isValid;
                if (!label.isValid)
                    entry.notValidReason = label.notValidReason;
            }
        });
        return  await this.entriesRepository.save(entriesToInsert);
    }

    async findByRemoteIds(ids: number[]): Promise<Entry[]> {
        return await this.entriesRepository.find({ where: {remoteId: In(ids)} });
    }
}
