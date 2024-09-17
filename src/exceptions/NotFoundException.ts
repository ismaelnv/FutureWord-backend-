import { HttpStatus } from "@nestjs/common";
import { CustomHttpException } from "./CustomHttpException";

export class NotFoundException extends CustomHttpException {

  constructor(message: string) {
        
   super(message, HttpStatus.NOT_FOUND);
  }
}