'use client'

import {useRouter} from 'next/navigation'
import {User, Building, Wrench, Users} from 'lucide-react'

const userTypeOptions = [
    {
        value: 'resident',
        label: 'Resident',
        icon: User,
        description: 'I live in this building/community',
        route: '/register/resident'
    },
    {
        value: 'maintenance-manager',
        label: 'Maintenance Manager',
        icon: Building,
        description: 'I manage maintenance operations',
        route: '/register/manager'
    },
    {
        value: 'worker',
        label: 'Worker',
        icon: Wrench,
        description: 'I provide maintenance/security services',
        route: '/register/worker'
    }
]

export default function RegisterPage() {
    const router = useRouter()

    const handleRoleSelect = (route: string) => {
        router.push(route)
    }

    return (
        <div className="min-h-screen bg-gray-900 shadow-md border-b border-gray-800 text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-indigo-600"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">Choose your role to get started</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 text-center mb-6">
                        You are a?
                    </h2>

                    {userTypeOptions.map((option) => {
                        const Icon = option.icon
                        return (
                            <div
                                key={option.value}
                                onClick={() => handleRoleSelect(option.route)}
                                className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                        <Icon
                                            className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors"/>
                                    </div>
                                    <div className="flex-1">
                                        <div
                                            className="font-semibold text-gray-900 group-hover:text-indigo-900 transition-colors">
                                            {option.label}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {option.description}
                                        </div>
                                    </div>
                                    <div className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <button
                            onClick={() => router.push('/login')}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}