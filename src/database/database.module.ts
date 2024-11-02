import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return ({
        uri: `mongodb://${configService.get('MONGO_HOST')}/${configService.get('MONGO_DB')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
