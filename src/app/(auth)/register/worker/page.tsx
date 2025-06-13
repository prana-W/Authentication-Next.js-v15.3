'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useRouter} from 'next/navigation'
import {Wrench, Phone, Lock, Eye, EyeOff, IdCard, User, ChevronDown} from 'lucide-react'
import toast from "react-hot-toast";

const workerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    workerId: z.string().min(1, 'Worker ID is required'),
    role: z.string().min(1, 'Please select your role'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type WorkerForm = z.infer<typeof workerSchema>

const workerRoles = [
    {value: 'electrician', label: 'Electrician'},
    {value: 'plumber', label: 'Plumber'},
    {value: 'carpenter', label: 'Carpenter'},
    {value: 'painter', label: 'Painter'},
    {value: 'security-guard', label: 'Security Guard'},
    {value: 'housekeeping', label: 'Housekeeping Staff'},
    {value: 'gardener', label: 'Gardener'},
    {value: 'lift-technician', label: 'Lift Technician'},
    {value: 'ac-technician', label: 'AC Technician'},
    {value: 'pest-control', label: 'Pest Control'},
    {value: 'cctv-technician', label: 'CCTV Technician'},
    {value: 'fire-safety', label: 'Fire Safety Specialist'},
    {value: 'general-maintenance', label: 'General Maintenance'},
    {value: 'other', label: 'Other'}
]

export default function WorkerRegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<WorkerForm>({
        resolver: zodResolver(workerSchema)
    })

    const onSubmit = async (data: WorkerForm) => {
        setIsLoading(true)
        try {
            const {confirmPassword, ...workerData} = data

            const response = await fetch('/api/auth/register/worker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...workerData,
                    userType: 'worker'
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Registration successful! Please login to continue.')
                router.push('/login')
            } else {
                throw new Error(result.message || 'Registration failed')
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 shadow-md border-b border-gray-800 text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Wrench className="w-8 h-8 text-indigo-600"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Worker Registration</h1>
                    <p className="text-gray-600 mt-2">Create your worker account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="text"
                                {...register('name')}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Enter your full name"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="tel"
                                {...register('phone')}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Worker ID
                        </label>
                        <div className="relative">
                            <IdCard
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="text"
                                {...register('workerId')}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Enter your worker ID"
                            />
                        </div>
                        {errors.workerId && (
                            <p className="mt-1 text-sm text-red-600">{errors.workerId.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role/Specialization
                        </label>
                        <div className="relative">
                            <Wrench
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10"/>
                            <select
                                {...register('role')}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black appearance-none bg-white"
                            >
                                <option value="">Select your role</option>
                                {workerRoles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"/>
                        </div>
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password')}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Create a strong password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('confirmPassword')}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Register as Worker'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
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