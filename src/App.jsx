import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { logo } from './assets';
import { Home, CreatePost } from './pages';
import Login from './pages/Login';

const App = () => {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-4 px-2 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="logo" className='w-20 sm:w-28 object-contain' />
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <SignedOut>
            {/* Show Sign In button if user is not signed in */}
            <SignInButton mode="modal">
              <button className='font-inter font-medium bg-[#6469ff] text-white px-3 sm:px-4 py-2 rounded-md'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Show UserButton if user is signed in, with options for account management and signing out */}
            <UserButton />
          </SignedIn>

          <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-3 sm:px-4 py-2 rounded-md'>
            Create
          </Link>
        </div>
      </header>
      <SignedOut>
        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Login />
        </main>
      </SignedOut>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          {/* Protect the home and create post routes */}
          <Route
            path="/"
            element={
              <SignedIn>
                <Home />
              </SignedIn>
            }
          />
          <Route
            path="/create-post"
            element={
              <SignedIn>
                <CreatePost />
              </SignedIn>
            }
          />



          {/* Redirect unauthenticated users to the sign-in page for other routes */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
