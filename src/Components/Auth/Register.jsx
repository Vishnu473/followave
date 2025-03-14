import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../Hooks/Redux/slices/userSlice.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=\+\[\]{}|;:'",.?/])[A-Za-z\d!@#$%^&*()\-_=\+\[\]{}|;:'",.?/]{8,}$/;

  const validateField = (name, value) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required.` }));
    } else if (name === "username" && value.length < 3) {
      setErrors((prev) => ({ ...prev, [name]: "Username must be at least 3 characters." }));
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

  const handleRegister = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";


    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await dispatch(
        registerUser({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password.trim(),
        })
      ).unwrap();
      
      if (response && response.success) {
        Swal.fire("Success", response.message, "success");
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error, "error");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={(e) => {
          setForm({ ...form, username: e.target.value });
          validateField("username", e.target.value);
        }}
        onBlur={(e) => {
          validateField("username", e.target.value);
          if (error) dispatch(clearError());
        }}
        className="w-full p-3 rounded-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:bg-white dark:focus:bg-gray-800 focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

      <input
        type="email"
        name="email"
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
        className="w-full p-3 rounded-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:bg-white dark:focus:bg-gray-800 focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
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
        className="w-full p-3 rounded-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:bg-white dark:focus:bg-gray-800 focus:ring-gray-500 dark:focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-sm disabled:bg-gray-500 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
