import {
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
   })
  };
}

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  // @IsDefined() // null 또는 undefined가 아닌지 검사
  // @IsOptional()
  // @Equals('test')
  // @NotEquals('test')
  // @IsEmpty()
  // @IsNotEmpty()

  // Array 타입 검사
  // @IsIn(["action", "comedy", "drama"])
  // @IsNotIn(['action', 'comedy', 'drama'])

  // @IsBoolean()
  // @IsString()
  // @IsNumber()
  // @IsInt()
  // @IsArray()
  // @IsEnum(MovieGenre)
  // @IsDateString() // ISO 8601 포맷인지 검사

  // @IsDivisibleBy(2) // 숫자가 2로 나누어 떨어지는지 검사
  // @IsPositive() // 양수인지 검사
  // @IsNegative() // 음수인지 검사
  // @Min(0) // 최소값 검사
  // @Max(10) // 최대값 검사

  // @Contains('test') // 문자열에 'test'가 포함되어 있는지 검사
  // @NotContains('test') // 문자열에 'test'가 포함되어 있지 않은지 검사
  // @IsAlphanumeric() // 문자열이 알파벳 또는 숫자로만 이루어져 있는지 검사
  // @IsCreditCard() // 신용카드 번호인지 검사
  // @IsHexColor() // 16진수 색상 코드인지 검사
  // @MaxLength(10) // 최대 길이 검사
  // @MinLength(2) // 최소 길이 검사
  // @IsUUID() // UUID 포맷인지 검사
  // @IsLatLong() // 위도, 경도 포맷인지 검사
  // @Validate(PasswordValidation)
  // @isPasswodValid()
  test: string;
}
