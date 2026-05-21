// {
//   "_id": {
//     "$oid": "692ebdd22f9c46e1f0859e6a"
//   },
//   "country": "China",
//   "companyName": "EverBright International Trading Co.",
//   "passport": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1764670862/n7ydlrtbprla2uccih56.jpg",
//   "visitingCard": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1764670869/xxxbki04pvglxshybwvs.jpg",
//   "firstName": "Sabbir",
//   "lastName": "Hossain",
//   "phone": "01856789012",
//   "gender": "Male",
//   "dateOfBirth": "2005-06-15",
//   "designation": "Business Development Manager",
//   "companyType": "Import & Export",
//   "officeLocation": "Banani, Dhaka",
//   "travelPurpose": "Business",
//   "email": "sabbir.biz@example.com",
//   "travelPlan": "Partial",
//   "paymentMethod": "Bkash",
//   "createdAt": "2025-12-02T10:20:11.283Z",
//   "createdBy": "sabbir@gmail.com",
//   "paymentStatus": "pending",
//   "applicationStatus": "pending",
//   "updatedAt": {
//     "$date": "2025-12-03T13:11:49.784Z"
//   }
// }

import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateBusinessApplicationDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  passport: string;

  @IsString()
  @IsNotEmpty()
  visitingCard: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  companyType: string;

  @IsString()
  @IsNotEmpty()
  officeLocation: string;

  @IsString()
  @IsNotEmpty()
  travelPurpose: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  travelPlan: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsEmail()
  @IsNotEmpty()
  createdBy: string;
}
