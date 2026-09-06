import { useEffect, useState } from "react";

import { getSettings } from "../services/settingService";
import { defaultSettings, SettingsContext } from "./settings-context";

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      setLoading(true);

      const response = await getSettings();

      if (response.success && response.data) {
        setSettings({
          ...defaultSettings,
          ...response.data,
          resume_url: response.data.resume_url || defaultSettings.resume_url,
        });
      }
    } catch (error) {
      console.error("Failed to load site settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialSettings = async () => {
      try {
        const response = await getSettings();

        if (!cancelled && response.success && response.data) {
          setSettings({
            ...defaultSettings,
            ...response.data,
            resume_url: response.data.resume_url || defaultSettings.resume_url,
          });
        }
      } catch (error) {
        console.error("Failed to load site settings:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
