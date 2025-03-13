import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../Hooks/Redux/slices/userSlice.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.user
  );
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

  const validateField = (name, value) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required.` }));
    } else if (name === "email" && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, [name]: "Invalid email format." }));
    } else if (name === "password" && !passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]:
          "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(form.password))
      newErrors.password = "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await dispatch(
        loginUser({ email: form.email.trim(), password: form.password.trim() })
      ).unwrap();
      if (response && response?.success) {
        console.log(response?.message);
        Swal.fire(
          response?.success ? "Success" : "Error",
          response?.message,
          response?.success ? "success" : "error"
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login failed:", error);
      Swal.fire("Error", error?.response?.data?.message || error, "error");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          validateField("email", e.target.value);
        }}
        onBlur={(e) => {
          validateField("email", e.target.value);
          if (error) dispatch(clearError());
        }}
        className="w-full p-3 rounded-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:bg-white dark:focus:bg-gray-800  focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
          validateField("password", e.target.value);
        }}
        onBlur={(e) => {
          validateField("password", e.target.value);
          if (error) dispatch(clearError());
        }}
        className="w-full p-3 rounded-sm  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-800  focus:ring-1 focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-sm disabled:bg-gray-500 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
