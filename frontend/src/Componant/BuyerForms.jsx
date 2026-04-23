import { useState } from "react";

export default function BuyerForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [buyerType, setBuyerType] = useState("customer");
  const [data,setData]=useState({
    option:"",
    
  })

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
 
        {!isLogin && (
          <>
         
           <select
           name="option"
  onChange={(e) => setBuyerType(e.target.value)}
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
                name="name"
                className="w-full p-3 border rounded mb-3"
              />
            )}

      
            {(buyerType === "retailer" || buyerType === "wholesaler") && (
              <>
                <input
                  type="text"
                  placeholder="Business / Shop Name"
                  className="w-full p-3 border rounded mb-3"
                  name="bussiness"
                />

                <input
                  type="text"
                  placeholder="Owner Name"
                  className="w-full p-3 border rounded mb-3"
                  name="owner"
                />
              </>
            )}

            {/* COMMON FOR ALL */}
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="w-full p-3 border rounded mb-3"
            />

            <input
              type="text"
              placeholder="City / Location"
              className="w-full p-3 border rounded mb-3"
              name="location"
            />
          </>
        )}

        {/* COMMON FIELDS */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3"
          name="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          name="password"
        />

        {/* BUTTON */}
        <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">
          {isLogin ? "Login" : "Register"}
        </button>

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