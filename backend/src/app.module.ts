import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeormConfig } from './database/typeorm/data-source';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomersModule } from './modules/customers/customers.module';
import { ProviderModule } from './modules/providers/provider.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      envFilePath: path.join(
        __dirname,
        'configs',
        `.env-${process.env.NODE_ENV || 'dev'}`,
      ),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModuleOptions,
    }),
    CustomersModule,
    ProviderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
