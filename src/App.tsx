import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import {
  evaluateSettingsSubmission,
  validateSettings,
  type SettingsErrors,
  type SettingsValues,
} from "./settingsValidation";

function App() {
  const [values, setValues] = useState<SettingsValues>({
    displayName: "",
    email: "",
    theme: "Light",
  });
  const [errors, setErrors] = useState<SettingsErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as keyof SettingsValues;
    const nextValues = {
      ...values,
      [field]: event.target.value,
    } as SettingsValues;

    setValues(nextValues);
    setSuccessMessage("");

    if (hasSubmitted) {
      const fieldErrors = validateSettings(nextValues);
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: fieldErrors[field],
      }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const result = evaluateSettingsSubmission(values);
    setErrors(result.errors);
    setSuccessMessage(result.success ? result.message : "");
  }

  return (
    <main className="settings-page" data-theme={values.theme.toLowerCase()}>
      <div className="settings-shell">
        <header className="page-heading">
          <p className="eyebrow">ACCOUNT PREFERENCES</p>
          <h1>Settings</h1>
          <p className="page-description">
            Manage your profile details and how the app looks to you.
          </p>
        </header>

        <section className="settings-card" aria-labelledby="profile-heading">
          <div className="card-heading">
            <div className="avatar-mark" aria-hidden="true">
              S
            </div>
            <div>
              <h2 id="profile-heading">Profile</h2>
              <p>Update your personal information and appearance.</p>
            </div>
          </div>

          <form className="settings-form" noValidate onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="display-name">Display name</label>
              <input
                id="display-name"
                name="displayName"
                type="text"
                autoComplete="name"
                value={values.displayName}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.displayName)}
                aria-describedby={
                  errors.displayName ? "display-name-error" : undefined
                }
              />
              {errors.displayName && (
                <p className="field-error" id="display-name-error" role="alert">
                  <span aria-hidden="true">!</span> {errors.displayName}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="field-error" id="email-error" role="alert">
                  <span aria-hidden="true">!</span> {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={values.theme}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.theme)}
                aria-describedby={errors.theme ? "theme-error" : undefined}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
              {errors.theme && (
                <p className="field-error" id="theme-error" role="alert">
                  <span aria-hidden="true">!</span> {errors.theme}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Save changes
              </button>
              <p className="save-note">Your preferences are kept private.</p>
            </div>
            <p className="success-message" role="status" aria-live="polite">
              {successMessage}
            </p>
          </form>
        </section>
        <footer className="page-footer">
          Thoughtful settings for a better workspace.
        </footer>
      </div>
    </main>
  );
}

export default App;
