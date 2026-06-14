import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Sub-schemas definitions to maintain data structure
@Schema({ _id: false })
class ApplicantInfo {
  @Prop({ required: true, trim: true }) fullName: string;
  @Prop({ required: true, trim: true }) fatherName: string;
  @Prop({ required: true, trim: true }) motherName: string;
  @Prop({ required: true, enum: ['male', 'female'] }) gender: string;
  @Prop({ required: true }) dateOfBirth: string;
  @Prop({ required: true, enum: ['single', 'married', 'widowed'] })
  maritalStatus: string;
  @Prop({ required: true }) nationality: string;
  @Prop() nidNumber?: string;
  @Prop() profession?: string;
  @Prop({ required: true }) phone: string;
  @Prop() whatsapp?: string;
  @Prop({ required: true, lowercase: true, trim: true }) email: string;
  @Prop({ required: true }) presentAddress: string;
  @Prop({ required: true }) permanentAddress: string;
}

@Schema({ _id: false })
class MedicalInfo {
  @Prop() bloodGroup?: string;
  @Prop({ default: false }) hasDiabetes?: boolean;
  @Prop({ default: false }) hasHighBloodPressure?: boolean;
  @Prop({ default: false }) hasHeartDisease?: boolean;
  @Prop({ default: false }) usesWheelchair?: boolean;
  @Prop() allergies?: string;
  @Prop() otherMedicalIssues?: string;
}

@Schema({ _id: false })
class TravelInfo {
  @Prop({ required: true, enum: ['umrah', 'hajj'] }) packageType: string;
  @Prop({ required: true }) travelMonth: string;
  @Prop() departureDate?: string;
  @Prop() returnDate?: string;
  @Prop({ required: true }) departureAirport: string;
  @Prop({ required: true, enum: ['3-star', '4-star', '5-star'] })
  makkahHotelCategory: string;
  @Prop({ required: true, enum: ['3-star', '4-star', '5-star'] })
  madinahHotelCategory: string;
  @Prop({ required: true, enum: ['single', 'double', 'triple', 'quad'] })
  roomSharing: string;
  @Prop({ required: true, default: true }) airTicketIncluded: boolean;
  @Prop({ required: true, default: true }) transportationIncluded: boolean;
}

@Schema({ _id: false })
class EmergencyContact {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) relation: string;
  @Prop({ required: true }) phone: string;
  @Prop() address?: string;
}

@Schema({ _id: false })
class NidDocument {
  @Prop({ required: true }) frontSide: string;
  @Prop({ required: true }) backSide: string;
}

@Schema({ _id: false })
class Documents {
  @Prop({ required: true }) passportNumber: string;
  @Prop({ required: true }) passportIssueDate: string;
  @Prop({ required: true }) passportExpiryDate: string;
  @Prop({ required: true }) passportImage: string;
  @Prop({ type: NidDocument, required: false }) nid?: NidDocument;
  @Prop() visaImage?: string;
  @Prop({ type: [String], required: true }) passportSizePhoto: string[];
  @Prop() vaccinationCertificate?: string;
  @Prop() covidCertificate?: string;
}

@Schema({ _id: false })
class Companion {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true }) relation: string;
  @Prop() passportNumber?: string;
  @Prop({ required: true }) passportImage: string;
  @Prop() phone?: string;
}

@Schema({ _id: false })
class Payment {
  @Prop({ required: true, enum: ['bkash', 'nagad', 'bank', 'cash'] })
  paymentMethod: string;
  @Prop() trxId?: string;
  @Prop() image?: string;
  @Prop({
    required: true,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending',
  })
  paymentStatus: string;
}

@Schema({ _id: false })
class PackageInfo {
  @Prop({ required: true })
  pkgId: string;

  @Prop({ required: true })
  pkgName: string;

  @Prop({ required: true })
  pkgPrice: number;

  @Prop()
  pkgDepartureDate?: string;

  @Prop()
  pkgReturnDate?: string;
}

export type UmrahHajjBookingDocument = UmrahHajjBooking & Document;

@Schema({
  timestamps: true,
  collection: 'umrahHajjApplication',
  versionKey: false,
})
export class UmrahHajjBooking {
  @Prop({ type: SchemaFactory.createForClass(ApplicantInfo), required: true })
  applicantInfo: ApplicantInfo;

  @Prop({ type: SchemaFactory.createForClass(MedicalInfo), default: {} })
  medicalInfo: MedicalInfo;

  @Prop({ type: SchemaFactory.createForClass(TravelInfo), required: true })
  travelInfo: TravelInfo;

  @Prop({
    type: SchemaFactory.createForClass(EmergencyContact),
    required: true,
  })
  emergencyContact: EmergencyContact;

  @Prop({ type: SchemaFactory.createForClass(Documents), required: true })
  documents: Documents;

  @Prop({ type: [SchemaFactory.createForClass(Companion)], default: [] })
  companions?: Companion[];

  @Prop({
    type: SchemaFactory.createForClass(PackageInfo),
    required: true,
  })
  pkgInfo: PackageInfo;

  @Prop({ type: SchemaFactory.createForClass(Payment), required: true })
  payment: Payment;

  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  applicationStatus: string;
}

export const UmrahHajjBookingSchema =
  SchemaFactory.createForClass(UmrahHajjBooking);
