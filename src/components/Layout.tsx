import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Mic, Clock, Settings as SettingsIcon } from 'lucide-react';
import clsx from 'clsx';

export const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-16 lg:w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all duration-300">
                <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-white">S</div>
                    <span className="ml-3 font-semibold text-lg hidden lg:block">Scribe</span>
                </div>

                <nav className="flex-1 py-6 flex flex-col gap-2 px-2">
                    <NavItem to="/" icon={<Mic size={20} />} label="New Visit" />
                    <NavItem to="/history" icon={<Clock size={20} />} label="History" />
                    <div className="flex-1" />
                    <NavItem to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto flex flex-col">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between flex-shrink-0">
                    <h2 className="font-medium text-slate-700">Demo Setup</h2>
                    <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">v0.1.0</div>
                </header>
                <div className="flex-1 relative">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                isActive ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
        >
            <span className="flex-shrink-0">{icon}</span>
            <span className="hidden lg:block text-sm font-medium">{label}</span>
        </NavLink>
    );
};
