export class CreateBusinessDealDto {
  service: string;
  serviceTitle: string;
  createdBy: string;
  createdAt?: Date;
  applicationStatus: string;

  // dynamic form fields
  [key: string]: any;
}
