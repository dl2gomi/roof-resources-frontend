'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, withNotAuth } from '@/helpers';
import { useApiRequest } from '@/hooks';
import { useAppDispatch } from '@/store';
import { loginUrl } from '@/consts';
import { login as loginAction } from '@/store/user';

import logo from '@/public/img/logo.png';
import '@/styles/all.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    response: loginResponse,
    error: loginError,
    loading: loginLoading,
    sendRequest: sendLoginRequest,
  } = useApiRequest({
    endpoint: loginUrl,
    method: 'POST',
    data: {
      email,
      password,
    },
  });

  useEffect(() => {
    loginResponse && Toaster.success(loginResponse.message);
    loginResponse && dispatch(loginAction(loginResponse.data));
    loginResponse && router.push('/account');
    setEmail('');
    setPassword('');
  }, [loginResponse]);

  useEffect(() => {
    loginError && Toaster.error(loginError.message);
  }, [loginError]);

  return (
    <div data-ignore="used only for top most containter width">
      <div className="bg-[white] box-border flex justify-start items-stretch ">
        <div
          className="background-login grid grid-cols-12 lg:grid-cols-11 xl:grid-cols-12 justify-center items-center basis-auto w-full"
          style={{ minHeight: '100vh' }}
        >
          <div className="xl:col-start-6 xl:col-span-2 lg:col-start-5 lg:col-span-3 md:col-start-5 md:col-span-4 sm:col-start-4 sm:col-span-6 col-start-3 col-span-8">
            <Image src={logo} className="object-cover box-border border-[none]" alt="roof resource logo" />
            <div className="grow-0 shrink-0 basis-auto mt-[29px]">
              <div className="flex justify-center items-stretch flex-col w-full box-border">
                <div className="rounded border box-border flex justify-start items-center flex-row h-[45px] grow-0 shrink-0 basis-auto px-3 border-solid border-[#1e3c55]">
                  <div className="w-5 h-5 flex grow-0 shrink-0 basis-auto">
                    <svg viewBox="0 0 20 20" x="0" y="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="user" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="Vector"
                          d="M16.667,17.5v-1.667c0,-0.884 -0.352,-1.732 -0.977,-2.357c-0.625,-0.625 -1.473,-0.976 -2.357,-0.976h-6.666c-0.884,0 -1.732,0.351 -2.357,0.976c-0.625,0.625 -0.977,1.473 -0.977,2.357v1.667"
                          stroke="#1E3C55"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M10,9.167c1.841,0 3.333,-1.493 3.333,-3.334c0,-1.841 -1.492,-3.333 -3.333,-3.333c-1.841,0 -3.333,1.492 -3.333,3.333c0,1.841 1.492,3.334 3.333,3.334z"
                          stroke="#1E3C55"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    placeholder="EMAIL"
                    type="text"
                    className="w-full [font-family:Montserrat,sans-serif] text-sm font-light bg-transparent [outline:none] box-border ml-[18px] border-[none] text-[#1e3c55]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grow-0 shrink-0 basis-auto mt-5">
                  <div className="rounded border h-[45px] w-[100.00%] box-border flex flex-row items-center [justify-content:start] border-solid border-[#1e3c55]">
                    <div className="w-5 h-5 flex ml-3 mt-[13px] mb-3">
                      <svg viewBox="0 0 20 20" x="0" y="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="lock" xmlns="http://www.w3.org/2000/svg">
                          <path
                            id="Vector_3"
                            d="M15.833,9.167h-11.666c-0.921,0 -1.667,0.746 -1.667,1.666v5.834c0,0.92 0.746,1.666 1.667,1.666h11.666c0.921,0 1.667,-0.746 1.667,-1.666v-5.834c0,-0.92 -0.746,-1.666 -1.667,-1.666z"
                            stroke="#1E3C55"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_4"
                            d="M5.833,9.167v-3.334c0,-1.105 0.439,-2.165 1.221,-2.946c0.781,-0.781 1.841,-1.22 2.946,-1.22c1.105,0 2.165,0.439 2.946,1.22c0.782,0.781 1.221,1.841 1.221,2.946v3.334"
                            stroke="#1E3C55"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </div>
                    <input
                      placeholder="PASSWORD"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full [font-family:Montserrat,sans-serif] text-sm font-light bg-transparent [outline:none] box-border ml-[18px] border-[none] text-[#1e3c55]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-stretch flex-col w-[100.00%] box-border mt-[43px]">
                <button
                  className="rounded bg-[#1e3c55] shadow-[0px_4px_4px_rgba(0,0,0,0.30)] [font-family:Montserrat,sans-serif] text-base font-semibold uppercase text-[white] cursor-pointer py-3 block box-border grow-0 shrink-0 basis-auto border-[none]"
                  disabled={email === '' || password === '' || loginLoading}
                  onClick={() => {
                    sendLoginRequest();
                  }}
                >
                  {loginLoading ? 'Logging in...' : 'Login'}
                </button>
                <p className="[font-family:Montserrat,sans-serif] text-base font-medium text-[#1e3c55] self-end grow-0 shrink-0 basis-auto mt-[11px] m-0 p-0">
                  Forgot password?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNotAuth(Home);
