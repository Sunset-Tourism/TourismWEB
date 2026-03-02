import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ChatRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}
