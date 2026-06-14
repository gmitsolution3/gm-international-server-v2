import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ScholarshipModule } from './modules/scholarship/scholarship.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { MedicalModule } from './modules/medical/medical.module';
import { BusinessModule } from './modules/business/business.module';
import { TouristModule } from './modules/tourist/tourist.module';
import { SettingModule } from './modules/setting/setting.module';
import { RootUserModules } from './modules/user/user.module';
import { FacebookCapiService } from './common/facebook-capi/facebook-capi.service';
import { UmrahHajjModule } from './modules/umrah-hajj/umrah-hajj.module';
import { LiveChatModule } from './modules/live-chat/liveChat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('DBURL'),
        dbName: 'GM_International',
      }),
    }),
    CoreModule,
    ScholarshipModule,
    MedicalModule,
    BusinessModule,
    TouristModule,
    SettingModule,
    RootUserModules,
    UmrahHajjModule,
    LiveChatModule,
  ],
  providers: [FacebookCapiService],
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
