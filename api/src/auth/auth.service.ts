import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(private jwtService: JwtService) {
    // const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;
    // const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
    // this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: { userId: string } = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=36000`;
  }

  async authenticate(token: string) {
    // const userInfoClient = google.oauth2('v2').userinfo;

    // this.oauthClient.setCredentials({
    //   access_token: token,
    // });

    // // const userInfoResponse = await userInfoClient.get({
    // //   auth: this.oauthClient,
    // // });
    // const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const tokenInfo = token;
    // console.log('token_info :', tokenInfo, 'user info :', userInfoResponse);
    // const signedToken = this.jwtService.sign({ tokenInfo });
    return { access_token: this.jwtService.sign({ tokenInfo }) };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    this.jwtService.sign(req);

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async getUserFromAuthenticationToken(token: string | any) {
    return token.user;
  }
}
