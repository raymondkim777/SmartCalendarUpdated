'use client'

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { LoginContext } from "./contexts/LoginContext";

const Header = ({ user }) => {
    const { loginStatus, setLoginStatus, currentUser, setCurrentUser } = useContext(LoginContext);
    const router = useRouter();

    // useEffect for login
    useEffect(() => {
        // console.log(user);
        setCurrentUser(user);
        setLoginStatus(user != null);
    }, [user]);

    // Account Button
    const [showAccountModal, setShowAccountModal] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Failed to logout:', error);
        }
        setCurrentUser(null);
        router.push('/home'); // Redirect to home page
    };

    const handleLogoutClick = () => {
        handleLogout();
        setLoginStatus(false);
        setShowAccountModal(false);
    }
    
    return(
        <div className="flex flex-row flex-shrink-0 w-full h-20 items-center justify-center bg-stone-50 border-b border-neutral-400 font-[family-name:var(--font-geist-sans)]">
            <div className='relative flex flex-row w-full max-w-7xl h-full px-6 items-center'>
                {/* Title */}
                <div className='flex w-fit h-full items-center'>
                    <Link href='home'><h1 className="text-3xl text-black">Smart Calendar</h1></Link>
                </div>

                {/* Central Content */}
                <div className='flex flex-row grow h-full items-center justify-center'></div>

                {/* Account/Settings */}
                <div className='flex flex-row w-fit h-full items-center justify-center pl-2 space-x-3'>
                    {/* https://www.svgrepo.com/svg/526221/settings */}
                    <Link href='/settings' className="flex w-12 h-12 items-center justify-center rounded-full transition-all duration-300 hover:opacity-70">
                        <svg fill="none" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"/>
                        </svg>
                    </Link>
                    {/* https://www.svgrepo.com/svg/466828/user */}
                    <div onClick={()=>setShowAccountModal(true)} className="flex w-12 h-12 items-center justify-center rounded-full overflow-hidden bg-gray-300 transition-all duration-300 hover:opacity-70 hover:cursor-pointer">
                        {loginStatus ? 
                            <img className="object-cover w-12 h-12 " src={currentUser.picture} /> :
                            <svg fill="#696969" width="32" height="32" viewBox="0 0 24 24" id="user" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z"></path></svg>
                        }
                        </div>
                </div>

                {/* Account Modal - Not Logged In */}
                <div className={`flex flex-col items-center z-10 ${showAccountModal && !loginStatus ? '' : 'hidden'} absolute top-24 right-2 w-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50`}>
                    <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2'>
                        <h1 className="text-base leading-6 text-gray-600 font-normal">Not Logged In</h1>
                        <div onClick={()=>setShowAccountModal(false)} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                            </svg>
                        </div>
                    </div>
                    <Link href={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`} 
                    className='flex flex-row w-full h-12 items-center justify-center space-x-3 px-4 rounded-b-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                        <h1 className="text-base leading-6 text-gray-600 font-bold">Sign In with Google</h1>
                    </Link>
                </div>

                {/* Account Modal - Logged In */}
                <div className={`flex flex-col items-center z-10 ${showAccountModal && loginStatus ? '' : 'hidden'} absolute top-24 right-2 w-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50`}>
                    <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
                        <h1 className="text-base leading-6 truncate text-gray-600 font-normal">{currentUser ? `${currentUser.name} (${currentUser.email})` : ''}</h1>
                        <div onClick={()=>setShowAccountModal(false)} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                            </svg>
                        </div>
                    </div>
                    <div onClick={()=>handleLogoutClick()} className='flex flex-row w-full h-12 items-center justify-center space-x-4 px-4 rounded-b-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                        <h1 className="text-base leading-6 text-gray-600 font-semibold">Logout</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header;