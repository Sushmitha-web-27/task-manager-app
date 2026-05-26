import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-96">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;