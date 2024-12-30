import {Module} from '@nestjs/common';
import {EntriesService} from './entries.service';
import {EntriesController} from './entries.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Entry} from "./entities/entry.entity";
import {AiModule} from "../ai/ai.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Entry]),
        AiModule,
    ],
    controllers: [EntriesController],
    providers: [EntriesService],
})
export class EntriesModule {
}
