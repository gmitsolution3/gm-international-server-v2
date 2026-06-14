import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsArray,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class ApplicantInfoDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() fatherName: string;
  @IsString() @IsNotEmpty() motherName: string;
  @IsEnum(['male', 'female']) gender: string;
  @IsString() @IsNotEmpty() dateOfBirth: string;
  @IsEnum(['single', 'married', 'widowed']) maritalStatus: string;
  @IsString() @IsNotEmpty() nationality: string;
  @IsString() @IsOptional() nidNumber?: string;
  @IsString() @IsOptional() profession?: string;
  @IsString() @MinLength(10) phone: string;
  @IsString() @IsOptional() whatsapp?: string;
  @IsEmail() email: string;
  @IsString() @MinLength(5) presentAddress: string;
  @IsString() @MinLength(5) permanentAddress: string;
}

class MedicalInfoDto {
  @IsString() @IsOptional() bloodGroup?: string;
  @IsBoolean() @IsOptional() hasDiabetes?: boolean;
  @IsBoolean() @IsOptional() hasHighBloodPressure?: boolean;
  @IsBoolean() @IsOptional() hasHeartDisease?: boolean;
  @IsBoolean() @IsOptional() usesWheelchair?: boolean;
  @IsString() @IsOptional() allergies?: string;
  @IsString() @IsOptional() otherMedicalIssues?: string;
}

class TravelInfoDto {
  @IsEnum(['umrah', 'hajj']) packageType: string;
  @IsString() @IsNotEmpty() travelMonth: string;
  @IsString() @IsOptional() departureDate?: string;
  @IsString() @IsOptional() returnDate?: string;
  @IsString() @IsNotEmpty() departureAirport: string;
  @IsEnum(['3-star', '4-star', '5-star']) makkahHotelCategory: string;
  @IsEnum(['3-star', '4-star', '5-star']) madinahHotelCategory: string;
  @IsEnum(['single', 'double', 'triple', 'quad']) roomSharing: string;
  @IsBoolean() airTicketIncluded: boolean;
  @IsBoolean() transportationIncluded: boolean;
}

class EmergencyContactDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() relation: string;
  @IsString() @MinLength(10) phone: string;
  @IsString() @IsOptional() address?: string;
}

class NidDocumentDto {
  @IsString() @IsNotEmpty() frontSide: string;
  @IsString() @IsNotEmpty() backSide: string;
}

class DocumentsDto {
  @IsString() @MinLength(5) passportNumber: string;
  @IsString() @IsNotEmpty() passportIssueDate: string;
  @IsString() @IsNotEmpty() passportExpiryDate: string;
  @IsString() @IsNotEmpty() passportImage: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NidDocumentDto)
  nid?: NidDocumentDto;

  @IsString() @IsOptional() visaImage?: string;

  @IsArray() @IsString({ each: true }) passportSizePhoto: string[];
  @IsString() @IsOptional() vaccinationCertificate?: string;
  @IsString() @IsOptional() covidCertificate?: string;
}

class CompanionDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() relation: string;
  @IsString() @IsOptional() passportNumber?: string;
  @IsString() @IsNotEmpty() passportImage: string;
  @IsString() @IsOptional() phone?: string;
}

class PaymentDto {
  @IsEnum(['bkash', 'nagad', 'bank', 'cash']) paymentMethod: string;
  @IsString() @IsOptional() trxId?: string;
  @IsString() @IsOptional() image?: string;
  @IsEnum(['pending', 'partial', 'paid']) paymentStatus: string;
}

class PackageInfoDto {
  @IsString()
  @IsNotEmpty()
  pkgId: string;

  @IsString()
  @IsNotEmpty()
  pkgName: string;

  @IsNotEmpty()
  pkgPrice: number | string;

  @IsString()
  @IsOptional()
  pkgDepartureDate?: string;

  @IsString()
  @IsOptional()
  pkgReturnDate?: string;
}

export class CreateUmrahHajjBookingDto {
  @ValidateNested()
  @Type(() => ApplicantInfoDto)
  applicantInfo: ApplicantInfoDto;
  @ValidateNested() @Type(() => MedicalInfoDto) medicalInfo: MedicalInfoDto;
  @ValidateNested() @Type(() => TravelInfoDto) travelInfo: TravelInfoDto;
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact: EmergencyContactDto;
  @ValidateNested() @Type(() => DocumentsDto) documents: DocumentsDto;

  @ValidateNested()
  @Type(() => PackageInfoDto)
  pkgInfo: PackageInfoDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CompanionDto)
  companions?: CompanionDto[];

  @ValidateNested() @Type(() => PaymentDto) payment: PaymentDto;

  @IsEnum(['pending', 'approved', 'rejected'])
  @IsOptional()
  applicationStatus?: string;
}
