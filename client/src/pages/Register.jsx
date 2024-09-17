import React from 'react'
import { Link, useActionData } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import {message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuth } from '../redux/features/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleRegister = async (e)=>{
      e.preventDefault();
      try{
        const res = await axios.post("http://localhost:4500/api/v1/user/register", {
          username,
          email,
          password
        });
        if(res.data.success){
          dispatch(setUser(res.data.user));
          dispatch(setAuth(true));
          message.success("User Registered !");
        }
      }
      catch(err){
        console.log(err);
      }
    }

  return (
    <div className='dark '>
    
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8   ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded-lg shadow-xl p-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  value={username}
                  onChange={(e)=>setUserName(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
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
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to = '/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Click here to login
            </Link>
          </p>
        </div>
      </div>
      </div>
    
  )
}

export default Register
