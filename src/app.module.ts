import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ScholarshipModule } from './modules/scholarship/scholarship.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MedicalPackageModule } from './src/modules/medical/medical-package/medical-package.module';
import { MedicalPackageModule } from './modules/medical/medical-package/medical-package.module';
import { MedicalApplicationModule } from './modules/medical/medical-application/medical-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('DBURL'),
        dbName:"GM_International"
      }),
    }),
    CoreModule,
    ScholarshipModule,
    MedicalPackageModule,
    MedicalApplicationModule,
  ],
})
export class AppModule {
  constructor(@InjectConnection() private connection: Connection) {}
  onModuleInit() {
    if (this.connection.readyState === 1) {
      console.log('=== MongoDB Connected Successfully! ===');
    } else {
      console.log('=== MongoDB Connection Failed! ===');
    }
  }
} 
