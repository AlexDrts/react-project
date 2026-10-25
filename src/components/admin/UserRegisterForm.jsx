import { useForm } from "react-hook-form";
import { isEmailTaken } from "../../api/shopApi";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** Register a new user. The email is checked against the server while the form is validated. */
export default function UserRegisterForm({ onRegister }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", email: "", role: "customer" }, mode: "onBlur" });

  const submit = async (data) => {
    const done = await onRegister({ name: data.name.trim(), email: data.email.trim().toLowerCase(), role: data.role });
    if (done) reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="panel space-y-4 p-5">
      <h3 className="text-lg font-bold">Register a user</h3>

      <div>
        <label htmlFor="u-name" className="field-label">
          Name
        </label>
        <input
          id="u-name"
          className="input"
          autoComplete="off"
          aria-invalid={Boolean(errors.name)}
          {...register("name", { required: "Enter a name", minLength: { value: 2, message: "Use at least 2 characters" } })}
        />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="u-email" className="field-label">
          Email
        </label>
        <input
          id="u-email"
          type="email"
          className="input"
          autoComplete="off"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: "Enter an email",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email, like you@example.com" },
            validate: async (value) => {
              try {
                return !(await isEmailTaken(value.trim().toLowerCase())) || "This email is already registered";
              } catch {
                return true; // if the check fails, the POST itself will report the problem
              }
            },
          })}
        />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="u-role" className="field-label">
          Role
        </label>
        <select id="u-role" className="input" {...register("role")}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register and sign in"}
      </button>
    </form>
  );
}
