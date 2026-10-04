import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useState,
} from "react";
import "./App.css";

type FormValues = {
  fullName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  timezone: string;
  notifications: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  company: "",
  password: "",
  confirmPassword: "",
  timezone: "",
  notifications: false,
};

const timezones = [
  "UTC-08:00",
  "UTC-05:00",
  "UTC-03:00",
  "UTC+00:00",
  "UTC+05:30",
];

const getValidationErrors = (values: FormValues): FormErrors => {
  const nextErrors: FormErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Full name is required.";
  } else if (values.fullName.trim().length < 2) {
    nextErrors.fullName = "Full name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.company.trim()) {
    nextErrors.company = "Company name is required.";
  } else if (values.company.trim().length < 2) {
    nextErrors.company = "Company name must be at least 2 characters.";
  }

  if (!values.password) {
    nextErrors.password = "Password is required.";
  } else if (values.password.length < 8) {
    nextErrors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = "Passwords do not match.";
  }

  if (!values.timezone) {
    nextErrors.timezone = "Please choose a timezone.";
  }

  if (!values.notifications) {
    nextErrors.notifications = "You must enable notifications to continue.";
  }

  return nextErrors;
};

function App() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = event.target;
    const fieldName = target.name as keyof FormValues;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";
    const nextValue = isCheckbox ? target.checked : target.value;

    const nextValues = { ...formValues, [fieldName]: nextValue };
    const nextErrors = getValidationErrors(nextValues);

    setFormValues(nextValues);
    setIsSubmitted(false);
    setErrors((previousErrors) => {
      const fieldError = nextErrors[fieldName];

      if (fieldError) {
        return { ...previousErrors, [fieldName]: fieldError };
      }

      const { [fieldName]: _removed, ...remaining } = previousErrors;
      return remaining;
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name } = event.target;
    const fieldName = name as keyof FormValues;
    const nextErrors = getValidationErrors(formValues);

    setErrors((previousErrors) => {
      const fieldError = nextErrors[fieldName];

      if (fieldError) {
        return { ...previousErrors, [fieldName]: fieldError };
      }

      const { [fieldName]: _removed, ...remaining } = previousErrors;
      return remaining;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = getValidationErrors(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setErrors({});
    setIsSubmitted(false);
  };

  const isFormInvalid = Object.keys(getValidationErrors(formValues)).length > 0;

  return (
    <main className="settings-page">
      <section className="settings-card" aria-labelledby="settings-title">
        <div className="settings-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1 id="settings-title">Account settings</h1>
          </div>
          <span className="status-badge">Secure</span>
        </div>

        <form className="settings-form" noValidate onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.fullName ? "input-error" : ""}
                placeholder="Jane Doe"
              />
              {errors.fullName ? <small>{errors.fullName}</small> : null}
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.email ? "input-error" : ""}
                placeholder="jane@company.com"
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>

            <label className="field">
              <span>Company</span>
              <input
                type="text"
                name="company"
                value={formValues.company}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.company ? "input-error" : ""}
                placeholder="Northstar Labs"
              />
              {errors.company ? <small>{errors.company}</small> : null}
            </label>

            <label className="field">
              <span>Timezone</span>
              <select
                name="timezone"
                value={formValues.timezone}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.timezone ? "input-error" : ""}
              >
                <option value="">Select timezone</option>
                {timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
              {errors.timezone ? <small>{errors.timezone}</small> : null}
            </label>

            <label className="field full-width">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.password ? "input-error" : ""}
                placeholder="Minimum 8 characters"
              />
              {errors.password ? <small>{errors.password}</small> : null}
            </label>

            <label className="field full-width">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "input-error" : ""}
                placeholder="Repeat your password"
              />
              {errors.confirmPassword ? (
                <small>{errors.confirmPassword}</small>
              ) : null}
            </label>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="notifications"
              checked={formValues.notifications}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            <span>Send me product updates and security alerts.</span>
          </label>
          {errors.notifications ? (
            <small className="checkbox-error">{errors.notifications}</small>
          ) : null}

          <div className="actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isFormInvalid}
            >
              Save changes
            </button>
          </div>

          {isSubmitted ? (
            <p className="success-message">
              Your settings have been saved successfully.
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}

export default App;
