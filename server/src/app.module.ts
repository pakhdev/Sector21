import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AiModule} from './ai/ai.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // позволяет использовать ConfigService в любом модуле
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('MYSQL_HOST'),
                port: parseInt(configService.get<string>('MYSQL_PORT') || '3306', 10),
                username: configService.get<string>('MYSQL_USER'),
                password: configService.get<string>('MYSQL_PASSWORD'),
                database: configService.get<string>('MYSQL_DB_NAME'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
    ],
})
export class AppModule {
}
