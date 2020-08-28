import { Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: Error) {
        return throwError(exception.message);
    }
}
