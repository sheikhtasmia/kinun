import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl">Kinun Dot Com</Link>
            <div>
                <Link to="/cart" className="mx-2">Cart</Link>
                <Link to="/dashboard" className="mx-2">Dashboard</Link>
                <Link to="/admin" className="mx-2">Admin</Link>
                <Link to="/about" className="mx-2">About</Link>
                <Link to="/faq" className="mx-2">FAQ</Link>
                <Link to="/contact" className="mx-2">Contact</Link>
            </div>
        </nav>
    );
}
