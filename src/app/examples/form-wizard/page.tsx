'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone: string
  dateOfBirth: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  newsletter: boolean
  notifications: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

type PasswordStrength = 'none' | 'weak' | 'medium' | 'strong'

const initialFormData: FormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  phone: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  newsletter: true,
  notifications: true,
}

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil']

const steps = [
  { id: 1, label: 'Account' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Address' },
  { id: 4, label: 'Review' },
]

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [emailCheckLoading, setEmailCheckLoading] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const submittedRef = useRef(false)

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'none'
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    if (score <= 2) return 'weak'
    if (score <= 4) return 'medium'
    return 'strong'
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const validateUsername = (value: string): string => {
    if (!value) return 'Username is required'
    if (value.length < 3) return 'Username must be at least 3 characters'
    if (value.length > 20) return 'Username must be at most 20 characters'
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores'
    return ''
  }

  const validateEmail = async (value: string): Promise<string> => {
    if (!value) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Invalid email format'
    
    setEmailCheckLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    if (value.toLowerCase() === 'test@test.com' || value.toLowerCase() === 'admin@admin.com') {
      setEmailCheckLoading(false)
      setEmailExists(true)
      return 'This email is already registered'
    }
    setEmailCheckLoading(false)
    setEmailExists(false)
    return ''
  }

  const validatePassword = (value: string): string => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
    if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain at least one special character'
    return ''
  }

  const validateConfirmPassword = (value: string): string => {
    if (!value) return 'Please confirm your password'
    if (value !== formData.password) return 'Passwords do not match'
    return ''
  }

  const validateFullName = (value: string): string => {
    if (!value) return 'Full name is required'
    if (value.length < 2) return 'Name must be at least 2 characters'
    return ''
  }

  const validatePhone = (value: string): string => {
    if (!value) return 'Phone number is required'
    const phoneRegex = /^[\d\s\-\(\)\+]+$/
    if (!phoneRegex.test(value)) return 'Invalid phone number format'
    if (value.replace(/\D/g, '').length < 10) return 'Phone number must have at least 10 digits'
    return ''
  }

  const validateDOB = (value: string): string => {
    if (!value) return 'Date of birth is required'
    const dob = new Date(value)
    const today = new Date()
    const age = Math.floor((today.getTime() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    if (age < 18) return 'You must be at least 18 years old'
    if (age > 120) return 'Invalid date of birth'
    return ''
  }

  const validateField = async (field: keyof FormData, value: string): Promise<string> => {
    switch (field) {
      case 'username': return validateUsername(value)
      case 'email': return await validateEmail(value)
      case 'password': return validatePassword(value)
      case 'confirmPassword': return validateConfirmPassword(value)
      case 'fullName': return validateFullName(value)
      case 'phone': return validatePhone(value)
      case 'dateOfBirth': return validateDOB(value)
      case 'street': return value ? '' : 'Street address is required'
      case 'city': return value ? '' : 'City is required'
      case 'state': return value ? '' : 'State is required'
      case 'zip': 
        if (!value) return 'Zip code is required'
        if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Invalid zip code format (use 12345 or 12345-6789)'
        return ''
      case 'country': return value ? '' : 'Country is required'
      default: return ''
    }
  }

  const validateStep = async (step: number): Promise<boolean> => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (step === 1) {
      const fields: (keyof FormData)[] = ['username', 'email', 'password', 'confirmPassword']
      for (const field of fields) {
        const error = await validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
          isValid = false
        }
      }
      setTouched({ username: true, email: true, password: true, confirmPassword: true })
    } else if (step === 2) {
      const fields: (keyof FormData)[] = ['fullName', 'phone', 'dateOfBirth']
      for (const field of fields) {
        const error = await validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
          isValid = false
        }
      }
      setTouched({ fullName: true, phone: true, dateOfBirth: true })
    } else if (step === 3) {
      const fields: (keyof FormData)[] = ['street', 'city', 'state', 'zip', 'country']
      for (const field of fields) {
        const error = await validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
          isValid = false
        }
      }
      setTouched({ street: true, city: true, state: true, zip: true, country: true })
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = async (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (!touched[field] && !submittedRef.current) return
    
    if (typeof value === 'string') {
      const error = await validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = async (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const value = formData[field]
    if (typeof value === 'string') {
      const error = await validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (submittedRef.current) return
    submittedRef.current = true
    
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setSubmittedData({ ...formData })
      setIsSubmitted(true)
    }
    submittedRef.current = false
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
    setTouched({})
    setCurrentStep(1)
    setIsSubmitted(false)
    setSubmittedData(null)
    setEmailExists(false)
    submittedRef.current = false
  }

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step)
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-transparent'
    }
  }

  const getPasswordStrengthWidth = () => {
    switch (passwordStrength) {
      case 'weak': return '33%'
      case 'medium': return '66%'
      case 'strong': return '100%'
      default: return '0%'
    }
  }

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Examples
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Form Wizard</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 flex-1">
          <div className="max-w-2xl mx-auto">
            <div className="p-8 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Form Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">Your registration has been completed.</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Another Response
              </button>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Submitted Data</h3>
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          </div>
        </main>

        <footer className="border-t border-border/50 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              Form wizard example for automated testing
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Examples
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Form Wizard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => goToStep(step.id)}
                    disabled={step.id > currentStep}
                    className={`flex flex-col items-center ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : step.id === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id < currentStep ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`mt-2 text-xs ${step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${step.id < currentStep ? 'bg-green-500' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                    Username <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    onBlur={() => handleBlur('username')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.username && touched.username ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter username (3-20 characters)"
                  />
                  {errors.username && touched.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                        (errors.email || emailExists) && touched.email ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter your email"
                    />
                    {emailCheckLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {(errors.email || emailExists) && touched.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.password && touched.password ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter password (8+ chars, uppercase, number, special)"
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        <div className={`h-1 flex-1 rounded ${passwordStrength !== 'none' ? getPasswordStrengthColor() : 'bg-muted'}`} />
                        <div className={`h-1 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-muted'}`} />
                        <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-muted'}`} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className={
                          passwordStrength === 'weak' ? 'text-red-500' :
                          passwordStrength === 'medium' ? 'text-yellow-500' :
                          passwordStrength === 'strong' ? 'text-green-500' : ''
                        }>{passwordStrength}</span>
                      </p>
                    </div>
                  )}
                  {errors.password && touched.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.fullName && touched.fullName ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.phone && touched.phone ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter phone number (e.g., 123-456-7890)"
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground mb-2">
                    Date of Birth <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    onBlur={() => handleBlur('dateOfBirth')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Address</h2>
                
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-foreground mb-2">
                    Street Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    onBlur={() => handleBlur('street')}
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                      errors.street && touched.street ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter street address"
                  />
                  {errors.street && touched.street && (
                    <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                      City <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                        errors.city && touched.city ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="City"
                    />
                    {errors.city && touched.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                      State <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      onBlur={() => handleBlur('state')}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                        errors.state && touched.state ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="State"
                    />
                    {errors.state && touched.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-foreground mb-2">
                      Zip Code <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="zip"
                      type="text"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      onBlur={() => handleBlur('zip')}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                        errors.zip && touched.zip ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="12345 or 12345-6789"
                    />
                    {errors.zip && touched.zip && (
                      <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                      Country <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      onBlur={() => handleBlur('country')}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground ${
                        errors.country && touched.country ? 'border-red-500' : 'border-border'
                      }`}
                    >
                      <option value="">Select country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && touched.country && (
                      <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Review Your Information</h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">Account</h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Username:</span> {formData.username}</p>
                      <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">Personal Info</h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Full Name:</span> {formData.fullName}</p>
                      <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                      <p><span className="text-muted-foreground">Date of Birth:</span> {formData.dateOfBirth}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Street:</span> {formData.street}</p>
                      <p><span className="text-muted-foreground">City, State:</span> {formData.city}, {formData.state}</p>
                      <p><span className="text-muted-foreground">Zip:</span> {formData.zip}</p>
                      <p><span className="text-muted-foreground">Country:</span> {formData.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Each step has required field validation</li>
              <li>• Password requires 8+ chars, uppercase, number, and special character</li>
              <li>• Email 'test@test.com' is reserved to test uniqueness</li>
              <li>• User must be 18+ based on date of birth</li>
              <li>• Back navigation preserves entered data</li>
              <li>• Review step allows editing each section</li>
              <li>• Password strength meter shows real-time feedback</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Form wizard example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}