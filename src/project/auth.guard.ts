import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index'
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRepository(UserRepository)
  private readonly userRepo: UserRepository) { }
  canActivate(context: ExecutionContext ): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
          return false
        } try {
          this.userRepo.findOne({
            where: { user_name: payload.user_name }
          })
        } catch (err) {
          return false
        }
      })
    }
    if (req.session && req.session.userId) {

      return true;
    }
    return false;
  }
}