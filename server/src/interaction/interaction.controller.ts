import {Controller, Get, Post, Body} from '@nestjs/common';
import {InteractionService} from './interaction.service';
import {CoordinatesDto} from './dto/coordinates.dto';
import {MouseScrollDto} from "./dto/mouse-scroll.dto";
import {SaveOffsetDto} from "./dto/save-offset.dto";

@Controller('interaction')
export class InteractionController {
    constructor(private readonly interactionService: InteractionService) {
    }

    @Post('mouse-click')
    mouseClick(@Body() coordinatesDto: CoordinatesDto): Promise<string> {
        return this.interactionService.mouseClick(coordinatesDto);
    }

    @Post('mouse-scroll')
    mouseScroll(@Body() mouseScrollDto: MouseScrollDto): Promise<string> {
        return this.interactionService.mouseScroll(mouseScrollDto);
    }

    @Post('mouse-move')
    mouseMove(@Body() coordinatesDto: CoordinatesDto): Promise<string> {
        return this.interactionService.mouseMove(coordinatesDto);
    }

    @Post('save-offset')
    saveOffset(@Body() saveOffsetDto: SaveOffsetDto): Promise<string> {
        return this.interactionService.saveOffset(saveOffsetDto);
    }
}
