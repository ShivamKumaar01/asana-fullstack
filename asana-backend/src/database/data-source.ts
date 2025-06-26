import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Team } from 'src/team/entities/team.entity';
import { Project } from 'src/project/entities/project.entity';

dotenv.config();


// const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'team-managment',
  synchronize: true,
  logging:true,
  entities: [Organization,User,Team,Project],
  // migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],

});