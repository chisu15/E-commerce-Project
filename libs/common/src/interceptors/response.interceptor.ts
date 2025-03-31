import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common'
  import { instanceToPlain, plainToInstance } from 'class-transformer'
  import { map, Observable } from 'rxjs'
import { PaginationResponseDto } from '../dtos/common.dto'

  
  export interface Response<T> {
    message: string
    data: T
    timestamp: number
    path?: string
  }
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, Response<any>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<any>> {
      return next.handle().pipe(
        map((data) => {
          return {
            message: typeof data === 'object' && 'message' in data ? data.message : null,
            data: typeof data === 'object' && 'data' in data ? instanceToPlain(data.data) : instanceToPlain(data),
            timestamp: new Date().getTime(),
            total_count: data?.totalCount || null,
            meta_data: data?.metaData || null,
            pagination: data?.pagination
              ? plainToInstance(PaginationResponseDto, data?.pagination)
              : null,
          }
        }),
      )
    }
  }
  