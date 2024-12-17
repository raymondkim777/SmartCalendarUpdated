'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null); // Store authenticated user info
  const [loading, setLoading] = useState(true); // State to manage loading
  const router = useRouter();

  // Fetch session info on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/session'); // API route to get session info
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (loading) {
    return (
      <header className="p-4 bg-gray-800 text-white">
        <div className="container mx-auto">Loading...</div>
      </header>
    );
  }

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Smart Calendar
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="text-green-400 font-medium">
                  {user.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <a
                  href={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
                  
                  
                  className="hover:text-gray-300"
                >
                  Login with Google
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
