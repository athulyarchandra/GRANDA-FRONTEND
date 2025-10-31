import React, { useContext, useState } from 'react'
import { loginUser, registerUser } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/AuthContexApi';
const Auth = ({ insideRegister }) => {
    const [showError, setShowError] = useState("")
    const [inputData, setInputData] = useState({
        username: "", email: "", password: ""
    })
    console.log(inputData);
    const { login } = useContext(userContext)
    const navigate = useNavigate()
    //register
const handleRegister = async (e) => {
  e.preventDefault();

  if (inputData.username && inputData.email && inputData.password) {
    try {
      const result = await registerUser(inputData);
      console.log(result);

      if (result.status === 201) {
        alert(`Welcome ${result.data.user?.username}, Please Login`);
        setInputData({ username: "", email: "", password: "" });
        setTimeout(() => navigate('/login'), 1300);
      } 
      else if (result.status === 409) {
        alert(result.data.message);
        setInputData({ username: "", email: "", password: "" });
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  } else {
    alert("Provide all details");
  }
};

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Inside handlelogin");
        if (inputData.email && inputData.password) {
            try {
                const result = await login(inputData);
                console.log(result);
                if (result.success) {
                    alert("Login successful!");
                    navigate("/");
                    setInputData({ username: "", email: "", password: "" })
                } else {
                    navigate("/register")
                    setInputData({ username: "", email: "", password: "" })
                }
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <>
            <section className="bg-white min-h-screen flex flex-col">
                <div className="flex justify-center items-center flex-grow py-12">
                    <div className="border rounded-md p-8 w-full max-w-md shadow-sm">
                        {insideRegister ?
                            <h2 className="text-2xl font-bold mb-6">Register</h2>
                            :
                            <h2 className="text-2xl font-bold mb-6">Login</h2>


                        }

                        <form action="#">
                            {insideRegister &&
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input value={inputData.username} onChange={e => setInputData({ ...inputData, username: e.target.value })} type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your name" />
                                </div>
                            }
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input value={inputData.email} onChange={e => setInputData({ ...inputData, email: e.target.value })} type="text" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter your email" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input value={inputData.password} onChange={e => setInputData({ ...inputData, password: e.target.value })} type="password" className="w-full border-b border-gray-300 outline-none py-2" placeholder="Enter password" />
                            </div>
                            {insideRegister ?
                                <>
                                    <button onClick={handleRegister} type="submit"
                                        className="w-full bg-[#eaa739] text-white py-2 rounded-md hover:bg-[#d7952b]">REGISTER</button>

                                    <p className="text-sm text-center mt-4">
                                        Already have an account?
                                        <a href="/login" className="text-[#eaa739] hover:underline"> Login </a>
                                    </p>
                                </>
                                :
                                <>
                                    <button onClick={handleLogin} type="submit"
                                        className="w-full bg-[#eaa739] text-white py-2 rounded-md hover:bg-[#d7952b]">LOGIN</button>

                                    <p className="text-sm text-center mt-4">
                                        Don’t have an account?
                                        <a href="/register" className="text-[#eaa739] hover:underline"> Create an account</a>
                                    </p>
                                </>
                            }

                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Auth