import { HttpStatus } from "@nestjs/common";
import { CustomHttpException } from "./CustomHttpException";

export class BadRequestException extends CustomHttpException {

  constructor(message: string) {
        
    super(message, HttpStatus.BAD_REQUEST);
  }

}