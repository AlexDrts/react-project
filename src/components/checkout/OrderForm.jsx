import { useForm } from "react-hook-form";

// Validation rules carried over from the previous homework (25.06.2026).
const PHONE_PATTERN = /^\+?\d[\d\s-]{9,}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DELIVERY_METHODS = ["Post office", "Courier", "Store pickup"];
const PAYMENT_METHODS = ["Pay online by card", "Cash on delivery"];

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <span className="field-error" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
}

/** Checkout form. Two-way binding comes from React Hook Form's `register`. */
export default function OrderForm({ defaultValues, onSubmitOrder, serverError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      delivery: DELIVERY_METHODS[0],
      payment: PAYMENT_METHODS[0],
      giftWrap: false,
      subscribe: false,
      terms: false,
      comment: "",
      ...defaultValues,
    },
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmitOrder)} noValidate className="panel p-5 sm:p-6">
      {/* A disabled fieldset locks every field while submitting without touching the inputs themselves. */}
      <fieldset disabled={isSubmitting} className="m-0 min-w-0 space-y-4 border-0 p-0">
        <h2 className="text-lg font-bold">Your details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="fullName" label="Full name" error={errors.fullName}>
            <input
              id="fullName"
              type="text"
              className="input"
              placeholder="Alex Johnson"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName", {
                required: "Enter your full name",
                minLength: { value: 3, message: "Full name needs at least 3 characters" },
                maxLength: { value: 60, message: "Full name can't be longer than 60 characters" },
              })}
            />
          </Field>

          <Field id="phone" label="Phone" error={errors.phone}>
            <input
              id="phone"
              type="tel"
              className="input"
              placeholder="+380 50 123 4567"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone", {
                required: "Enter your phone number",
                pattern: { value: PHONE_PATTERN, message: "Use digits only, like +380 50 123 4567" },
              })}
            />
          </Field>

          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Enter your email",
                pattern: { value: EMAIL_PATTERN, message: "Enter a valid email, like you@example.com" },
              })}
            />
          </Field>

          <Field id="city" label="City" error={errors.city}>
            <input
              id="city"
              type="text"
              className="input"
              placeholder="Kyiv"
              autoComplete="address-level2"
              aria-invalid={Boolean(errors.city)}
              {...register("city", { required: "Enter your city" })}
            />
          </Field>

          <Field id="delivery" label="Delivery" error={errors.delivery}>
            <select id="delivery" className="input" {...register("delivery", { required: "Choose a delivery method" })}>
              {DELIVERY_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </Field>

          <Field id="payment" label="Payment" error={errors.payment}>
            <select id="payment" className="input" {...register("payment", { required: "Choose a payment method" })}>
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="comment" label="Note for the courier (optional)" error={errors.comment}>
          <textarea
            id="comment"
            rows={3}
            className="input"
            {...register("comment", { maxLength: { value: 300, message: "Keep the note under 300 characters" } })}
          />
        </Field>

        <fieldset className="space-y-2">
          <legend className="field-label">Extras</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4 accent-[var(--accent)]" {...register("giftWrap")} />
            Gift wrap my order
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4 accent-[var(--accent)]" {...register("subscribe")} />
            Email me about new drops
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-[var(--accent)]"
              aria-invalid={Boolean(errors.terms)}
              {...register("terms", { required: "You need to accept the terms to place the order" })}
            />
            I accept the terms and the return policy
          </label>
          {errors.terms && (
            <span className="field-error" role="alert">
              {errors.terms.message}
            </span>
          )}
        </fieldset>

        {serverError && (
          <p role="alert" className="rounded-lg border border-danger px-3 py-2 text-sm text-danger">
            {serverError}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Place order"}
        </button>
      </fieldset>
    </form>
  );
}
