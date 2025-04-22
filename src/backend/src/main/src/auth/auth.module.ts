import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [
    AuthService,
    FirebaseStrategy,
    FirebaseAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthService,
    FirebaseAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {} 