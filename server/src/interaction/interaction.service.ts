import * as path from 'path';
import {CoordinatesDto} from './dto/coordinates.dto';
import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {MouseScrollDto} from "./dto/mouse-scroll.dto";
import {SaveOffsetDto} from "./dto/save-offset.dto";
import {exec} from 'child_process';

@Injectable()
export class InteractionService {
    private exePath = path.resolve(__dirname, '../../../InteractionHandler/InteractionHandler.exe');

    async mouseMove(coordinatesDto: CoordinatesDto): Promise<string> {
        const {x, y} = coordinatesDto;
        return new Promise((resolve, reject) => {
            exec(`${this.exePath} move ${x} ${y}`, (error, _, stderr) => {
                if (error || stderr)
                    return reject(new HttpException('Error: mouseMove', HttpStatus.INTERNAL_SERVER_ERROR));
                return resolve(`Mouse moved to X=${x}, Y=${y}`);
            });
        });
    }

    async mouseScroll(mouseScrollDto: MouseScrollDto): Promise<string> {
        await this.mouseMove(mouseScrollDto);
        return new Promise((resolve, reject) => {
            exec(`${this.exePath} scroll ${mouseScrollDto.offset}`, (error, _, stderr) => {
                if (error || stderr)
                    return reject(new HttpException('Error: mouseScroll', HttpStatus.INTERNAL_SERVER_ERROR));
                return resolve(`Mouse scrolled, offset ${mouseScrollDto.offset}`);
            });
        });
    }

    async mouseClick(coordinatesDto: CoordinatesDto): Promise<string> {
        await this.mouseMove(coordinatesDto);
        return new Promise((resolve, reject) => {
            exec(`${this.exePath} click`, (error, _, stderr) => {
                if (error || stderr)
                    return reject(new HttpException('Error: mouseClick', HttpStatus.INTERNAL_SERVER_ERROR));
                return resolve('Mouse clicked');
            });
        });
    }

    saveOffset(saveOffsetDto: SaveOffsetDto): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(`${this.exePath} saveoffset ${saveOffsetDto.offset}`, (error, _, stderr) => {
                if (error || stderr)
                    return reject(new HttpException('Error: saveOffset', HttpStatus.INTERNAL_SERVER_ERROR));
                return resolve('Offset saved');
            });
        });
    }
}
