import React from "react";

const Navbar = ({ setView }) => {
  return (
    <>
      <header className="mb-2 block fixed bg-white z-10 w-full shadow">
        <div className="mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <a className="flex items-center text-2xl font-black" onClick={() => setView('main')}>
            <span className="mr-2 text-3xl text-blue-600">
              <h1 className="text-3xl font-medium text-blue-600">Ramailo Meter</h1>
            </span>
          </a>
          <input className="peer hidden" type="checkbox" id="navbar-open" />
          <label className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden" htmlFor="navbar-open">
            <span className="sr-only">Toggle Navigation</span>
          </label>
          <nav aria-label="Header Navigation" className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0">
            <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
              <li className="">
                <a className="text-gray-600 hover:text-blue-600" onClick={() => setView('main')}>
                  Home
                </a>
              </li>
              <li className="">
                <a className="text-gray-600 hover:text-blue-600" onClick={() => window.open('https://apsan1.github.io/')}>
                  Apsan
                </a>
              </li>
              <li className="mt-2 sm:mt-0">
                <a className="rounded-xl border-2 border-blue-600 px-3 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => setView('add')}>
                  Add Review
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
