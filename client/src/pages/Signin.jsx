import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useState} from 'react'
import { message } from 'antd'
import { userSlice } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuth } from '../redux/features/userSlice';

const Signin = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSignIn = async (e) =>{
      e.preventDefault();
      try{

        const res = await axios.post("http://localhost:4500/api/v1/user/signin", {
          email,
          password
        });
       if(res.data.success){
        dispatch(setUser(res.data.user));
        dispatch(setAuth(true));
          message.success("User Logged In !");
        localStorage.setItem("token", res.data.token);
       }
      }
      catch(err){
        console.log(err);
        message.error(err.response.data.message);
      }
    }
  return (

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded-lg shadow-xl p-10">
      <form  className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label  className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Click here to register
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Signin
