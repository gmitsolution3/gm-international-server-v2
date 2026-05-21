import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ScholarshipPackage } from './scholarship.schema';

export type ScholarshipApplicationDocument = ScholarshipApplication & Document;

// document sub schema
@Schema({ _id: false })
class Documents {
  @Prop() profilePicture: string;
  @Prop() passport: string;
  @Prop() nidFront: string;
  @Prop() nidBack: string;
  @Prop() studentSignature: string;
  @Prop() ssc: string;
  @Prop() hsc: string;
  @Prop() diploma: string;
  @Prop() honours: string;
  @Prop() transcript: string;
  @Prop() testimonial: string;
  @Prop() englishProfficiency: string;
  @Prop() extraSkills: string;
  @Prop() jobLetter: string;
  @Prop() cv: string;
}
const DocumentsSchema = SchemaFactory.createForClass(Documents);

// main schema
@Schema({
  timestamps: true,
  collection: 'scholarship_application',
  versionKey: false,
})
export class ScholarshipApplication {
  @Prop({ required: true })
  applicantId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  nidNumber: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  university: string;

  @Prop({ required: true })
  admissionSemester: string;

  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  coverage: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true, default: 'Pending' })
  paymentStatus: string;

  @Prop({ required: true, default: 'Pending' })
  applicationStatus: string;

  @Prop()
  workExperience: string;

  @Prop({ default: false })
  jobLetterAvailable: boolean;

  @Prop()
  studyPurpose: string;

  @Prop()
  additionalInfo: string;

  @Prop({ required: true })
  highestQualification: string;

  @Prop({ required: true })
  passingYear: string;

  @Prop({ required: true })
  instituteName: string;

  @Prop({ required: true })
  gradeOrGPA: string;

  @Prop({ required: true })
  majorSubject: string;

  @Prop()
  createdBy: string;

  @Prop({ default: 'user' })
  source: string;

  @Prop({ required: true })
  applicationFee: string;
  @Prop({ required: true })
  location: string;

  @Prop({ type: DocumentsSchema, required: true })
  documents: Documents;

  @Prop()
  submittedAt: Date;

  // packageId যদি অন্য কালেকশনের সাথে রেফারেন্স (Join) করতে চান
  @Prop({ type: Types.ObjectId, ref: ScholarshipPackage.name })
  packageId: Types.ObjectId;

  //   packageId: .populate('packageId')  eiita used kore scholarship package er data query 
}

export const ScholarshipApplicationSchema = SchemaFactory.createForClass(
  ScholarshipApplication,
);
