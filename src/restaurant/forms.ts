import { IsString, IsInt, IsEnum, Min } from 'class-validator';

export class CreateMenuForm {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsEnum(['한식', '중식', '일식'])
  category: '한식' | '중식' | '일식';

  @IsString()
  description: string;
}
