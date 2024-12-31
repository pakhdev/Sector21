import {AiService} from './ai.service';
import {Body, Controller, Post} from "@nestjs/common";
import {LabelsValidationDto} from "./dto/labels-validation.dto";
import {LabelsValidationResponseDto} from "./dto/labels-validation-response.dto";
import {BodyValidationDto} from "./dto/body-validation.dto";
import {BodyValidationResponseDto} from "./dto/body-validation-response.dto";

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {
    }

    @Post('validate-labels')
    validateLabels(@Body() labelsValidationDto: LabelsValidationDto): Promise<LabelsValidationResponseDto> {
        return this.aiService.validateLabels(labelsValidationDto);
    }

    @Post('validate-body')
    validateBody(@Body() bodyDto: BodyValidationDto): Promise<BodyValidationResponseDto> {
        return this.aiService.validateBody(bodyDto);
    }
}
