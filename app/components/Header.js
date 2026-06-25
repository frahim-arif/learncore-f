"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";



const menuItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy-Policy", href: "/privacy-policy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setOpen(false);

    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-gray-200">
              <Image
                src="https://frahim.vercel.app/images/logo.jpeg"
                alt="WebcoreCubeTech"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Learn.WebcoreCubeTech
              </h2>

              <p className="text-xs text-gray-500">
                Learn • Build • Grow
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <span className="font-medium text-gray-700">
                  Hi, {user.name}
                </span>

                <Link
                  href="/dashboard"
                  className="px-5 py-2 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg border border-gray-200"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-gray-700"
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="text-center font-semibold text-gray-700">
                    Hi, {user.name}
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-center"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-xl bg-red-500 text-white font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl bg-blue-600 text-white text-center font-semibold"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}