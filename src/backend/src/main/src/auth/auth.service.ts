import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  constructor() {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      // Try to use service account from environment variable
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp();
      } else {
        // Fallback to direct configuration if needed
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
      }
    }
  }

  /**
   * Verify Firebase ID token and get user record
   */
  async verifyToken(token: string): Promise<UserRecord> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      return await admin.auth().getUser(uid);
    } catch (error) {
      throw new Error(`Error verifying token: ${error.message}`);
    }
  }

  /**
   * Check if user has the required role
   */
  async hasRole(userRecord: UserRecord, requiredRole: string): Promise<boolean> {
    try {
      // Get custom claims which contain roles
      const customClaims = userRecord.customClaims || {};
      const roles = customClaims.roles || [];
      
      // Check if user has the required role
      return roles.includes(requiredRole) || roles.includes('admin');
    } catch (error) {
      return false;
    }
  }

  /**
   * Set roles for a user
   */
  async setRoles(uid: string, roles: string[]): Promise<void> {
    try {
      await admin.auth().setCustomUserClaims(uid, { roles });
    } catch (error) {
      throw new Error(`Error setting roles: ${error.message}`);
    }
  }
} 