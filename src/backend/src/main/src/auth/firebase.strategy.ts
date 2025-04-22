import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    try {
      // Verify the Firebase token and get the user record
      const user = await this.authService.verifyToken(token);
      
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      
      // Return the user data that will be available in the Request object
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        customClaims: user.customClaims || {},
        // Store the user record for potential role checks
        userRecord: user,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 