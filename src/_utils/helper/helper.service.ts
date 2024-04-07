import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class HelperService {
  constructor(private jwtService: JwtService) {}

  async isAdmin(req: Request) {
    const token = this.extractTokenFromHeader(req);

    if (!token) return false;

    try {
      const { isAdmin } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return !!isAdmin;
    } catch {}

    return false;
  }

  async getUserId(req: Request) {
    const token = this.extractTokenFromHeader(req);

    if (!token) return undefined;

    try {
      const { id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return id;
    } catch {}

    return undefined;
  }

  private extractTokenFromHeader = (request: Request) => {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}
