export type Theme = "Light" | "Dark";

export interface SettingsValues {
  displayName: string;
  email: string;
  theme: Theme;
}

export type SettingsErrors = Partial<Record<keyof SettingsValues, string>>;

export type SettingsSubmissionResult =
  | { success: false; errors: SettingsErrors }
  | { success: true; errors: SettingsErrors; message: string };

export function validateSettings(values: SettingsValues): SettingsErrors {
  const errors: SettingsErrors = {};
  const displayName = values.displayName.trim();
  const email = values.email.trim();

  if (!displayName) {
    errors.displayName = "Display name is required";
  } else if (displayName.length < 2) {
    errors.displayName = "Display name must contain at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (values.theme !== "Light" && values.theme !== "Dark") {
    errors.theme = "Please choose a theme";
  }

  return errors;
}

export function evaluateSettingsSubmission(
  values: SettingsValues,
): SettingsSubmissionResult {
  const errors = validateSettings(values);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    errors: {},
    message: "Settings saved successfully",
  };
}
