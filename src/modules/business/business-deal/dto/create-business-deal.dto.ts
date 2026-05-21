// {
//   "_id": {
//     "$oid": "69940fdce4bbbb04a588707a"
//   },
//   "f_name": "Tariqul Islam Khan",
//   "phone": "+8801817247388",
//   "c_name": "e-Commerce",
//   "c_email": "dev.tariqulislam88@gmail.com",
//   "c_address": "Mohakhali",
//   "payment_gateway": "1",
//   "select_advise_time": "1_hour",
//   "select_adviser": "lawer",
//   "payment_proof_type": "p_photo",
//   "transaction_id": "",
//   "payment_photo": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771311146/ii3oguefofxkdwz5y30i.jpg",
//   "p_photo": "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771311113/hmgooqbbrfouqy6lauz9.jpg",
//   "service": "legal-advice",
//   "serviceTitle": "Legal Advice -Service charge 1 hour - 300CNY, 2 hour-500CNY, 3 hour - 700CNY",
//   "createdBy": "sabbir@gmail.com",
//   "createdAt": "2026-02-17T06:51:08.414Z",
//   "applicationStatus": "pending"
// }


import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateBusinessDealDto {
  @IsString()
  @IsNotEmpty()
  f_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  c_name: string;

  @IsEmail()
  @IsNotEmpty()
  c_email: string;

  @IsString()
  @IsNotEmpty()
  c_address: string;

  @IsString()
  @IsNotEmpty()
  payment_gateway: string;

  @IsString()
  @IsNotEmpty()
  select_advise_time: string;

  @IsString()
  @IsNotEmpty()
  select_adviser: string;

  @IsString()
  @IsNotEmpty()
  payment_proof_type: string;

  @IsString()
  @IsOptional()
  transaction_id?: string;

  @IsString()
  @IsNotEmpty()
  payment_photo: string;

  @IsString()
  @IsNotEmpty()
  p_photo: string;

  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  serviceTitle: string;

  @IsEmail()
  @IsNotEmpty()
  createdBy: string;
}
