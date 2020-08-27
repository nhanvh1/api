import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import express from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse() as express.Response;
        // console.log('exception ', exception);
        const statusCode = exception.getStatus();
        const res = exception.getResponse();
        let message = Array.isArray(res.message) ? res.message[0] : res;
        message = typeof message === 'object' ? message.message : message;
        response.status(statusCode).json({
            statusCode,
            message
        });
    }
}
