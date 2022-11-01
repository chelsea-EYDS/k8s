import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class Logger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.log(`${message} ${stack} ${context}`);
  }
  warn(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.log(`${message} ${stack} ${context}`);
  }
  log(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.log(`${message} ${stack} ${context}`);
  }
}
