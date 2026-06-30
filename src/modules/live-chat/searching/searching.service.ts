import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSearchingDto } from './dto/create-searching.dto';
import { ScholarshipPackageService } from '../../scholarship/scholarship-package/scholarship-package.service';
import { MedicalPackageService } from '../../medical/medical-package/medical-package.service';
import { TouristPackageService } from '../../tourist/tourist-package/tourist-package.service';
import { BusinessPackageService } from '../../business/business-package/business-package.service';
import { UmrahService } from '../../umrah-hajj/umrah-pkg/umrah-pkg.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly scholarshipService: ScholarshipPackageService,
    private readonly medicalService: MedicalPackageService,
    private readonly touristService: TouristPackageService,
    private readonly businessService: BusinessPackageService,
    // private readonly visaService: VisaService,
    private readonly umrahHajjService: UmrahService,
  ) {}

  async search(dto: CreateSearchingDto) {
    const { service, query } = dto;

    const handlers = {
      Scholarship: () => this.scholarshipService.search(query),
      Medical: () => this.medicalService.search(query),
      Tourist: () => this.touristService.search(query),
      Business: () => this.businessService.search(query),
      // Visa: () => this.visaService.search(query),
      'Umrah Hajj': () => this.umrahHajjService.search(query),
    };

    const handler = handlers[service];

    if (!handler) {
      throw new BadRequestException(`Unsupported service type: ${service}`);
    }

    return handler();
  }
}
