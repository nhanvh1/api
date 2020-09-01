// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class RolesGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const getRequest = context.switchToHttp().getRequest();
//         getRequest.body = {
//             userId: getRequest.headers.userId,
//             ...getRequest.query,
//             ...getRequest.params,
//             ...getRequest.body,
//         };
//         return true;
//     }
// }
