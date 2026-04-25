import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FarmerForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const [form, setForm] = useState({
    f_name: "",
    f_phone: "",
    f_village: "",
    f_email: "",
    f_password: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;

  
    if (name === "f_phone") {
      const onlyNums = value.replace(/\D/g, "");
      setForm({ ...form, [name]: onlyNums });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Password validation (only for register)
    if (!isLogin) {
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (!passRegex.test(form.f_password)) {
        setLoading(false);
        return setError(
          "Password must contain uppercase, lowercase, number and special symbol"
        );
      }
    }

    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/login/"
        : "http://127.0.0.1:8000/api/register/";

     
      const payload = {
        ...form,
        f_phone: !isLogin ? `+91${form.f_phone}` : form.f_phone,
      };

      const res = await axios.post(url, payload);

      if (res.status === 200 || res.status === 201) {
        alert(res.data.message);

        // Reset form
        setForm({
          f_name: "",
          f_phone: "",
          f_village: "",
          f_email: "",
          f_password: "",
        });

        if (!isLogin) {
           
          setIsLogin(true);
        } else {
         
          localStorage.setItem("token", res.data.access);
          nav("/dashboard");
        } 
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">

        {/* TOGGLE */}
        <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 ${
              isLogin ? "bg-emerald-600 text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 ${
              !isLogin ? "bg-emerald-600 text-white" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <h2 className="text-xl text-center mb-5 text-emerald-600">
          {isLogin ? "Farmer Login" : "Farmer Registration"}
        </h2>

        {/* FORM */}
        <form onSubmit={submitForm}>

          {!isLogin && (
            <>
              <input
                type="text"
                name="f_name"
                value={form.f_name}
                onChange={handleForm}
                placeholder="Full Name"
                disabled={loading}
                className="w-full p-3 border rounded mb-3"
              />

              {/* PHONE */}
              <div className="flex mb-3">
                <span className="px-3 flex items-center bg-gray-200 border border-r-0 rounded-l">
                  +91
                </span>

                <input
                  type="text"
                  name="f_phone"
                  value={form.f_phone}
                  onChange={handleForm}
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  disabled={loading}
                  className="w-full p-3 border rounded-r"
                />
              </div>

              <input
                type="text"
                name="f_village"
                value={form.f_village}
                onChange={handleForm}
                placeholder="Village / City"
                disabled={loading}
                className="w-full p-3 border rounded mb-3"
              />
            </>
          )}

          <input
            type="email"
            name="f_email"
            value={form.f_email}
            onChange={handleForm}
            placeholder="Email"
            disabled={loading}
            className="w-full p-3 border rounded mb-3"
          />

          <input
            type="password"
            name="f_password"
            value={form.f_password}
            onChange={handleForm}
            placeholder="Password"
            disabled={loading}
            className="w-full p-3 border rounded mb-4"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center mt-4 text-sm text-gray-500">
          {isLogin ? (
            <>
              New Farmer?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-emerald-600 cursor-pointer"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-emerald-600 cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>

      </div>
    </div>
  );
}