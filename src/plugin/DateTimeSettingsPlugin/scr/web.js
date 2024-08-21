export class DateTimeSettingsPluginWeb {
    async isDateTimeAutomatic() {
      console.warn('This feature is not available on the web.');
      return { isAutomatic: false };
    }
  }