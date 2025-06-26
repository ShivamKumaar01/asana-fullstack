import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { TeamModule } from './team/team.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TeamMemberModule } from './team-member/team-member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    OrganizationModule, UserModule, TeamModule, ProjectModule, TaskModule, TeamMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
