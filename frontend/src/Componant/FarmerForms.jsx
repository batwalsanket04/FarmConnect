import { useState } from "react";
import 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { Form } from "lucide-react";
import axios from 'axios'

export default function FarmerForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [error,setError]=useState("")
  const nav=useNavigate();

  const [form ,setForm]=useState({
    f_name:"",
     f_phone:"",
     f_village:"",
     f_email:"",
     f_password:""
  })


  const handleForm=(e)=>
  {
    const {name,value}=e.target;
    setForm({...form,[name]:value})
  }

 const submitForm = async (e) => {
  e.preventDefault();
  setError("");

  if (!isLogin) {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passRegex.test(form.f_password)) {
      return setError(
        "Password must contain uppercase, lowercase, number and special symbol"
      );
    }
  }
  

  try {
    const url = isLogin
      ? "http://127.0.0.1:8000/api/login/"
      : "http://127.0.0.1:8000/api/register/";

    const res = await axios.post(url, form);

    if (res.status === 200 || res.status === 201) 
    {
      alert(res.data.message);
      setForm({
      f_name:"",
     f_phone:"",
     f_village:"",
     f_email:"",
     f_password:""

      })
      setIsLogin(true); 
    }
  }
   catch (error)
   {
    setError(error.response?.data?.error || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">

     
        <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-medium ${
              isLogin ? "bg-emerald-600 text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-medium ${
              !isLogin ? "bg-emerald-600 text-white" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-5 text-emerald-600">
          {isLogin ? "Farmer Login " : "Farmer Registration "}
        </h2>

        
       <form onSubmit={submitForm}>
  
  {!isLogin && (
    <>
      <input
        type="text"
        name="f_name"
        value={form.f_name}
        onChange={handleForm}
        placeholder="Full Name"
        className="w-full p-3 border rounded mb-3"
      />

      <div className="flex mb-3">
  <span className="px-3 flex items-center bg-gray-200 border border-r-0 rounded-l">
    +91
  </span>

  <input
    type="text"
    name="f_phone"
    value={form.f_phone}
    onChange={handleForm}
    placeholder="Enter 10-digit number"
    className="w-full p-3 border rounded-r"
  />
</div>

      <input
        type="text"
        name="f_village"
        onChange={handleForm}
        value={form.f_village}
        placeholder="Village / City"
        className="w-full p-3 border rounded mb-3"
      />
    </>
  )}

  <input
    type="email"
    name="f_email"
    onChange={handleForm}
    value={form.f_email}
    placeholder="Email"
    className="w-full p-3 border rounded mb-3"
  />

  <input
    type="password"
    name="f_password"
    onChange={handleForm}
    value={form.f_password}
    placeholder="Password"
    className="w-full p-3 border rounded mb-4"
  />

  {/* ERROR MESSAGE */}
  {error && (
    <p className="text-red-500 text-sm mb-2">{error}</p>
  )}

  <button
    type="submit"   
    className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
  >
    {isLogin ? "Login" : "Register"}
  </button>

</form>

       <p className="text-center mt-4 text-sm text-gray-500">
  {isLogin ? (
    <>
      New Farmer?{" "}
      <span
        onClick={() => setIsLogin(false)}
        className="text-emerald-600 cursor-pointer font-medium"
      >
        Register
      </span>
    </>
  ) : (
    <>
      Already have account?{" "}
      <span
        onClick={() => setIsLogin(true)}
        className="text-emerald-600 cursor-pointer font-medium"
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