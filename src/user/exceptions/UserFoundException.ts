import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFoundException extends HttpException {
  constructor() {
    super('User exists', HttpStatus.CONFLICT);
  }
}
