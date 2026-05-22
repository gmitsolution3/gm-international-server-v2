import { Module } from '@nestjs/common';
import { AboutModule } from './about/about.module';
import { ActivitiesModule } from './activities/activities.module';
import { NoticeManagementModule } from './notice-management/notice-management.module';
import { OfficeAddressModule } from './office-address/office-address.module';

@Module({
  imports: [
    AboutModule,
    ActivitiesModule,
    NoticeManagementModule,
    OfficeAddressModule,
  ],
})
export class SettingModule {}
