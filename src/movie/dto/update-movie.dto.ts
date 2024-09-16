import {
  ArrayNotEmpty,
  Equals,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsCreditCard,
  IsDateString,
  IsDefined,
  IsDivisibleBy,
  IsEmpty,
  IsEnum,
  IsHexColor,
  IsInt,
  IsLatLong,
  IsNegative,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  NotContains,
  NotEquals,
  registerDecorator,
  Validate,
  ValidationArguments,
  ValidationDecoratorOptions,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

enum MovieGenre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
}

@ValidatorConstraint()
class PasswordValidation implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    // 비밀번호 길이는 4 ~ 8자리
    return value.length >= 4 && value.length <= 8;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '비밀번호는 4 ~ 8자리여야 합니다. ($value)';
  }
}

function isPasswodValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordValidation,
    });
  };
}

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsOptional()
  genreIds?: number[];

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  detail?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  directorId?: number;
}
