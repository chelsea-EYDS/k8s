import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { stringToBool } from '../utils/helpers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: stringToBool(process.env.SYNCHRONIZE) || true,
          autoLoadEntities: stringToBool(process.env.AUTO_LOAD) || true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
