interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  userId: string;
}

interface AppEnvironment {
  apiUrl: string;
  emailjs: EmailJSConfig;
}

interface Window {
  env: AppEnvironment;
}
