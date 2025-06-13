"use client";

import React, {useState} from 'react';
import toast from "react-hot-toast"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter} from 'next/navigation'
import {Phone, User, Shield, Briefcase, Eye, EyeOff} from 'lucide-react';

const loginSchema = z.object({
    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must not exceed 15 digits')
        .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['worker', 'resident', 'manager']),
});

type LoginFormData = z.infer<typeof loginSchema>;

const MultiRoleLogin = () => {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: '',
            password: '',
            role: 'worker',
        },
    });

    const roleConfig = {
        worker: {
            icon: Briefcase,
            title: 'Worker Login',
            color: 'from-blue-500 to-blue-600',
            description: 'Access your work dashboard and assignments',
        },
        resident: {
            icon: User,
            title: 'Resident Login',
            color: 'from-green-500 to-green-600',
            description: 'Manage your residential services and requests',
        },
        manager: {
            icon: Shield,
            title: 'Manager Login',
            color: 'from-purple-500 to-purple-600',
            description: 'Oversee operations and manage your team',
        },
    };

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Login failed');

            const result = await response.json();
            toast.success(`Login successful as ${data.role}`);
            router.push('/')
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const RoleIcon = roleConfig[loginForm.watch('role') || 'worker'].icon;

    return (
        <div className="min-h-screen bg-gray-900 shadow-md border-b border-gray-800 text-white flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div
                        className={`w-16 h-16 bg-gradient-to-r ${roleConfig[loginForm.watch('role')].color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <RoleIcon className="w-8 h-8 text-white"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {roleConfig[loginForm.watch('role')].title}
                    </h1>
                    <p className="text-gray-600 text-sm">
                        {roleConfig[loginForm.watch('role')].description}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select Your Role
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(roleConfig).map(([role, config]) => {
                                const IconComponent = config.icon;
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => loginForm.setValue('role', role as any)}
                                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                            loginForm.watch('role') === role
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <IconComponent
                                            className={`w-5 h-5 mx-auto mb-1 ${
                                                loginForm.watch('role') === role
                                                    ? 'text-blue-600'
                                                    : 'text-gray-600'
                                            }`}
                                        />
                                        <span
                                            className={`text-xs font-medium capitalize ${
                                                loginForm.watch('role') === role
                                                    ? 'text-blue-600'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                      {role}
                    </span>
                                    </button>
                                );
                            })}
                        </div>
                        {loginForm.formState.errors.role && (
                            <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.role.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <input
                                {...loginForm.register('phone')}
                                type="tel"
                                placeholder="+1234567890"
                                className="w-full pl-12 text-black pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        {loginForm.formState.errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.phone.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                {...loginForm.register('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="w-full px-4 text-black py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                        {loginForm.formState.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                        )}
                    </div>

                    <button
                        onClick={() => loginForm.handleSubmit(handleLogin)()}
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r ${roleConfig[loginForm.watch('role')].color} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MultiRoleLogin;
