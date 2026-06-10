// facebook-capi.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class FacebookCapiService {
  private hashSha256(value: string): string {
    return crypto
      .createHash('sha256')
      .update(value.trim().toLowerCase())
      .digest('hex');
  }

  async sendBusinessLeadPixel(application: any) {
    try {
      const payload = {
        data: [
          {
            event_name: 'Lead',

            event_time: Math.floor(Date.now() / 1000),

            action_source: 'website',

            user_data: {
              ...(application.email && {
                em: this.hashSha256(application.email),
              }),

              ...(application.phone && {
                ph: this.hashSha256(application.phone),
              }),
            },

            custom_data: {
              currency: 'BDT',

              content_type: 'business',

              content_ids: [application._id.toString()],

              package_name: application.packageName,

              country: application.country,
            },
          },
        ],
      };

      await axios.post(
        `https://graph.facebook.com/v23.0/${process.env.FB_PIXEL_ID}/events`,
        payload,
        {
          params: {
            access_token: process.env.FB_CAPI_TOKEN,
          },
        },
      );
    } catch (error) {
      console.error(
        'Facebook CAPI Error',
        error?.response?.data || error.message,
      );
    }
  }

  async sendPurchase(order: any) {
    // purchase event
  }

  async sendAddToCart(product: any) {
    // add to cart event
  }
}
