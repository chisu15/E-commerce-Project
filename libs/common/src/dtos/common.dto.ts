import { Expose, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationResponseDto {
  @Expose()
  @IsInt()
  @Min(1)
  page: number;

  @Expose()
  @IsInt()
  @Min(1)
  size: number;

  @Expose()
  @IsInt()
  @Min(0)
  total: number;
}
