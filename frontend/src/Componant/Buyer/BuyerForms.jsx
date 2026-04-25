import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function BuyerForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [buyerType, setBuyerType] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav=Navigate();
  const [form ,setForm]=useState({

    b_option:"",
    b_name:"",
    b_bussiness:"",
    b_owner:"",
    b_phone:"",
    b_location:"",
    b_email:"",
    b_password:"",

  })


 const handleForm = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

const submitForm = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (!isLogin) {
    const PassRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!PassRegex.test(form.b_password)) {
      setLoading(false);
      return setError("Password must be strong");
    }
  }

  try {
    const url = isLogin
      ? "http://127.0.0.1:8000/api/buyer-login/"
      : "http://127.0.0.1:8000/api/buyer-register/";

    const res = await axios.post(url, form);

    if (res.status === 200 || res.status === 201) {
      alert(res.data.message);
      setForm({
    b_option:"",
    b_name:"",
    b_bussiness:"",
    b_owner:"",
    b_phone:"",
    b_location:"",
    b_email:"",
    b_password:"",
      });

      if(!isLogin)
      {
        setIsLogin(true);
      }
      else
      {
        localStorage.setItem("token",res.data.access);
        nav("/dashboard");
      }
    }

  } catch (error) {
    setError(error.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">

      
        <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 ${isLogin ? "bg-emerald-600 text-white" : ""}`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 ${!isLogin ? "bg-emerald-600 text-white" : ""}`}
          >
            Register
          </button>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-5 text-emerald-600">
          {isLogin ? "Buyer Login " : "Buyer Registration "}
        </h2>
       <form onSubmit={submitForm}>
        {!isLogin && (
          <>
         
           <select
           name="b_option"
           value={form.b_option}
                disabled={loading}
           

           
  onChange={(e) =>{handleForm(e); setBuyerType(e.target.value)}}
  className="w-full p-3 mb-4 rounded-lg border border-emerald-600 
             
             focus:outline-none focus:ring-2 focus:ring-emerald-600 
             transition"
>
  <option value="customer">Local Customer</option>
  <option value="retailer">Shopkeeper / Retailer</option>
  <option value="wholesaler">Wholesaler</option>
  
</select>
  
            {buyerType === "customer" && (
              <input
                type="text"
                placeholder="Your Name"
                name="b_name"
                disabled={loading}
                onChange={handleForm}
                value={form.b_name}
                className="w-full p-3 border rounded mb-3"
              />
            )}

      
            {(buyerType === "retailer" || buyerType === "wholesaler") && (
              <>
                <input
                  type="text"
                  placeholder="Business / Shop Name"
                  className="w-full p-3 border rounded mb-3"
                  name="b_bussiness"
                disabled={loading}
                onChange={handleForm}
                  value={form.b_bussiness}
                />

                <input
                  type="text"
                  placeholder="Owner Name"
                  className="w-full p-3 border rounded mb-3"
                  name="b_owner"
                onChange={handleForm}
                disabled={loading}
                  value={form.b_owner}
                />
              </>
            )}

            {/* COMMON FOR ALL */}
            <input
              type="text"
              placeholder="Phone Number"
              name="b_phone"
                onChange={handleForm}
                disabled={loading}
              value={form.b_phone}
              className="w-full p-3 border rounded mb-3"
            />

            <input
              type="text"
              placeholder="City / Location"
              className="w-full p-3 border rounded mb-3"
              name="b_location"
                onChange={handleForm}
                disabled={loading}
              value={form.b_location}
            />
          </>
        )}

        {/* COMMON FIELDS */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3"
          name="b_email"
                onChange={handleForm}
                disabled={loading}
          value={form.b_email}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          name="b_password"
                onChange={handleForm}
                disabled={loading}
          value={form.b_password}
        />

        {/* BUTTON */}
        <button  disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg">
          {loading ? "Please wait.." :isLogin ? "Login" :" Register"}
        </button>
      </form>
        {/* SWITCH */}
        <p className="text-center mt-4 text-sm text-gray-500">
          {isLogin ? (
            <>
              New Buyer?{" "}
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