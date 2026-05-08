import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <nav className="pt-20 px-4">
          <Link
            to="/"
            className={`block py-3 px-4 rounded-md mb-2 ${
              location.pathname === '/' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/manage-trackers"
            className={`block py-3 px-4 rounded-md ${
              location.pathname === '/manage-trackers' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Manage Trackers
          </Link>
        </nav>
      </div>

      <main className="pl-4 pr-4 pt-4">
        <Outlet />
      </main>
    </div>
  );
}
