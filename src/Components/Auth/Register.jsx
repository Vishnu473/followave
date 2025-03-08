import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (name, value) => {
    let errorMsg = "";
    if (!value.trim()) {
      errorMsg = `${name} is required.`;
    } else if (name === "username" && value.length < 3) {
      errorMsg = "Username must be at least 3 characters.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMsg = "Invalid email format.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMsg =
        "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = `${key} is required.`;
      }
    });

    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Registering user:", form);
    // Call API for registration
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        onBlur={(e) => validateField("username", e.target.value)}
        className="w-full p-3 rounded-sm  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-blue-500"
      />
      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        onBlur={(e) => validateField("email", e.target.value)}
        className="w-full p-3 rounded-sm  bg-gray-200 text-gray-700 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800  dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        onBlur={(e) => validateField("password", e.target.value)}
        className="w-full p-3 rounded-sm  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:bg-white dark:focus:bg-gray-800 focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-sm disabled:bg-gray-500"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
