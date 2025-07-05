import {
  IsDateString, IsInt, IsPhoneNumber, IsArray, ArrayMinSize, Min
} from 'class-validator';

export class CreateReservationForm {
  @IsInt() restaurantId: number;
  @IsDateString() startTime: string;
  @IsDateString() endTime: string;
  @IsPhoneNumber('KR') phone: string;
  @IsInt() @Min(1) peopleCount: number;
  @IsArray() @ArrayMinSize(1) menus: number[];
}

export class UpdateReservationForm {
  @IsInt() @Min(1) peopleCount: number;
  @IsArray() @ArrayMinSize(1) menus: number[];
}
