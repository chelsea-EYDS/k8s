  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class PrivateService {
    async getPrivateRoute() {
      return 'Private Route Accessed';
    }
  }
