import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {
    emailjs.init(environment.emailjs.userId);
  }

  async sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    try {
      let firstName = formData.firstName || '';
      let lastName = formData.lastName || '';

      if (!firstName && !lastName && formData.name) {
        const nameParts = formData.name.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }

      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company || '',
          message: formData.message,
        },
        environment.emailjs.userId
      );

      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
