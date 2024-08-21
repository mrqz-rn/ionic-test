import { registerPlugin } from '@capacitor/core';

const DateTimeSettingsPlugin = registerPlugin('DateTimeSettingsPlugin', {
  web: () => import('./web').then(m => new m.DateTimeSettingsPluginWeb()),
});

export const isDateTimeAutomatic = async () => {
  return DateTimeSettingsPlugin.isDateTimeAutomatic();
};