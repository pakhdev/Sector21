import {BodyValidationDto} from "./dto/body-validation.dto";
import {ConfigService} from "@nestjs/config";
import {Injectable} from '@nestjs/common';
import {LabelsValidationDto} from './dto/labels-validation.dto';
import fetch from 'node-fetch';
import {LabelsValidationResponseDto} from "./dto/labels-validation-response.dto";
import {BodyValidationResponseDto} from "./dto/body-validation-response.dto";

@Injectable()
export class AiService {

    constructor(
        private configService: ConfigService
    ) {
    }

    async validateLabels(labelsValidationDto: LabelsValidationDto): Promise<LabelsValidationResponseDto> {
        const prompt = this.configService.getOrThrow<string>('LABEL_QUERY') + ' ' + JSON.stringify(labelsValidationDto.labels);
        const response = await this.askAi(prompt);
        return this.parseJsonInsideBrackets(response);
    }

    async validateBody(bodyValidationDto: BodyValidationDto): Promise<BodyValidationResponseDto> {
        const prompt = this.configService.getOrThrow<string>('BODY_QUERY') + ' ' + bodyValidationDto.body;
        const response = await this.askAi(prompt);
        return this.parseCompactJsonBlock(response);
    }

    private parseJsonInsideBrackets(input: string): LabelsValidationResponseDto {
        const match = input.match(/\[[\s\S]*\]/);
        if (!match) throw new Error('No JSON-like structure found in the input string');
        const jsonText = match[0];
        try {
            return { labels: JSON.parse(jsonText) };
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error}`);
        }
    }

    private parseCompactJsonBlock(input: string): BodyValidationResponseDto {
        const cleaned = input
            .replace(/^`{3}json\s*/i, '')
            .replace(/`{3}$/, '')
            .trim();
        try {
            return JSON.parse(cleaned) as BodyValidationResponseDto;
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error}`);
        }
    }

    private async askAi(prompt: string): Promise<string> {
        const response = await fetch(this.configService.getOrThrow<string>('AI_URL'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                model: 'gemma3:4b',
                prompt,
                stream: true,
            }),
        });

        if (!response.body) {
            throw new Error('Response body is null or undefined');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        for await (const chunk of response.body as AsyncIterable<Uint8Array>) {
            buffer += decoder.decode(chunk, {stream: true});

            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Save incomplete line

            for (const line of lines) {
                if (line.trim() === '') continue;

                try {
                    const json = JSON.parse(line);
                    if (json.response !== undefined) {
                        fullResponse += json.response;
                    }
                } catch (e) {
                    console.warn('Failed to parse JSON line:', line);
                }
            }
        }

        return fullResponse;
    }
}
