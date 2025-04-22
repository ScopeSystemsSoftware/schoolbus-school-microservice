import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    // Configuration for TypeORM - database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'schoolbus_schools',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Only true for development
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    
    // Import application modules
    ConfigModule,
    SharedModule,
    AuthModule,
    SchoolsModule,
    StudentsModule,
  ],
})
export class AppModule {} 