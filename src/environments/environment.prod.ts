export const environment = {
  production: true,
  apiUrl: (window as any).__env?.API_URL || '',
  emailjs: {
    serviceId: (window as any).__env?.EMAILJS_SERVICE_ID || '',
    templateId: (window as any).__env?.EMAILJS_TEMPLATE_ID || '',
    userId: (window as any).__env?.EMAILJS_USER_ID || '',
  },
};
