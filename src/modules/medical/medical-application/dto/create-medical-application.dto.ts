// {
//   "_id": {
//     "$oid": "69cb7ed30fbf47b94eeef99d"
//   },
//   "country": "bangladesh",
//   "hospital_name": "Shijiazhuang Hetaicheng Hospital",
//   "department": "Blood Purification & Dialysis Services",
//   "patientName": "Tariqul Islam Khan",
//   "patient_age": "24",
//   "patient_gender": "male",
//   "patient_disease": "fiver",
//   "disease_duration": "1_3_month",
//   "contactNumber": "+8801817247388",
//   "email": "dev.tariqulislam88@gmail.com",
//   "medical_report": [
//     "https://res.cloudinary.com/dqyfwfeed/image/upload/v1774944075/gfyey4tr2lpylxz7suzx.jpg"
//   ],
//   "recent_photo": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1774944082/tvounhs2tiqml0cjhtgc.jpg",
//   "passport_copy": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1774944089/fxvxqdeip0pyzo4qdi5z.jpg",
//   "payment": "bKash",
//   "destinationCountry": "China",
//   "destinationCity": "Shijiazhuang",
//   "createdBy": "sabbir@gmail.com",
//   "createdAt": {
//     "$date": "2026-03-31T07:59:15.847Z"
//   },
//   "paymentStatus": "Delivered",
//   "appointmentStatus": "pending",
//   "package_id": "69a0272850c15830aa6abe21",
//   "paidAt": "2026-03-31T08:00:08.832Z",
//   "paymentMethod": "Bkash",
//   "paymentScreenshot": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1774944145/g3lua7xy6nwpstdbm700.jpg",
//   "transactionId": "454rfstrt",
//   "updatedAt": {
//     "$date": "2026-03-31T08:00:08.840Z"
//   }
// }

import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateMedicalApplicationDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  hospital_name: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  patient_age: string;

  @IsString()
  @IsNotEmpty()
  patient_gender: string;

  @IsString()
  @IsNotEmpty()
  patient_disease: string;

  @IsString()
  @IsNotEmpty()
  disease_duration: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsString({ each: true })
  medical_report: string[];

  @IsString()
  @IsNotEmpty()
  recent_photo: string;

  @IsString()
  @IsNotEmpty()
  passport_copy: string;

  @IsString()
  @IsNotEmpty()
  payment: string;

  @IsString()
  @IsNotEmpty()
  destinationCountry: string;

  @IsString()
  @IsNotEmpty()
  destinationCity: string;

  @IsEmail()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  package_id: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  paymentScreenshot: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
