'use client'

import { useEffect, useState } from "react";

export default function AdminAuthPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [animate, setAnimate] = useState(false);

    const correctPassword = "gibthefrog"; // Replace with your desired password

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password. Please try again.");
        }
        setPassword("");
    };

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => setAnimate(true), 100); // slight delay for smoother effect
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <>
                <style>
                    {`
                    .fade-in-up {
                        animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
                    }
                    .move-up {
                        animation: moveUp 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
                    }
                    .fade-out {
                        animation: fadeOut 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
                    }
                    @keyframes fadeInUp {
                        0% { opacity: 0; transform: translateY(40px);}
                        100% { opacity: 1; transform: translateY(0);}
                    }
                    @keyframes moveUp {
                        0% { transform: translateY(0);}
                        100% { transform: translateY(-36vh);}
                    }
                    @keyframes fadeOut {
                        0% { opacity: 1;}
                        100% { opacity: 0;}
                    }
                    `}
                </style>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                    <div className={`${animate ? "move-up" : "fade-in-up"}`}>
                        <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
                        <p className={`text-lg transition-opacity duration-1000 ${animate ? "fade-out" : ""}`}>You are now authenticated.</p>
                    </div>
                    {/* Add your admin dashboard content here */}
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
                >
                    Login
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </form>
        </div>
    );
}