// src/components/RegisterPage.jsx
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (!form.terms) errs.terms = "You must accept the terms";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
    } else {
      console.log("✔️ Form submitted", form);
      // call API…
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5eb] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-[#644632] mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-[#644632] mb-6 text-center">
          Join us and start shopping today!
        </p>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="flex items-center text-[#644632] mb-1">
              <FaUser className="mr-2" /> Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#b8c8a0] ${errors.name ? "border-[#ffc3c3]" : "border-[#bedcdc]"
                }`}
            />
            {errors.name && (
              <p className="text-[#ffc3c3] text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="flex items-center text-[#644632] mb-1">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#b8c8a0] ${errors.email ? "border-[#ffc3c3]" : "border-[#bedcdc]"
                }`}
            />
            {errors.email && (
              <p className="text-[#ffc3c3] text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="flex items-center text-[#644632] mb-1">
              <FaLock className="mr-2" /> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#b8c8a0] ${errors.password ? "border-[#ffc3c3]" : "border-[#bedcdc]"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-10 text-[#644632]"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-[#ffc3c3] text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm */}
          <div className="mb-4">
            <label className="flex items-center text-[#644632] mb-1">
              <FaLock className="mr-2" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#b8c8a0] ${errors.confirm ? "border-[#ffc3c3]" : "border-[#bedcdc]"
                }`}
            />
            {errors.confirm && (
              <p className="text-[#ffc3c3] text-xs mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Terms */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="mr-2 accent-[#b8c8a0]"
            />
            <label className="text-sm text-[#644632]">
              I agree to the{" "}
              <a href="#" className="text-[#b8c8a0] hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-[#ffc3c3] text-xs mb-4">{errors.terms}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#b8c8a0] hover:bg-[#a6b78e] text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-[#644632] mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#b8c8a0] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}