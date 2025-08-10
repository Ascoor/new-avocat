import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/hooks';
import { useAuthRedirect } from '../features/auth/useAuthRedirect';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, Eye, EyeOff, Scale, ArrowLeft, AlertCircle, User, Building } from 'lucide-react';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
  role: z.enum(['lawyer', 'admin', 'client']),
  firmName: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuth();
  const authRedirect = useAuthRedirect();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    control
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: undefined,
      firmName: '',
      agreeTerms: false
    }
  });

  const selectedRole = watch('role');

  // Auto-focus first empty field
  useEffect(() => {
    const firstInput = document.querySelector('input:not([disabled])') as HTMLInputElement;
    firstInput?.focus();
  }, []);

  const onSubmit = async (data: RegisterForm) => {
    setRegisterError('');
    
    try {
      const success = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        password: data.password,
        confirmPassword: data.confirmPassword
      });

      if (success) {
        toast.success('Account created successfully!', {
          description: 'Welcome to Avocat. Your account has been created and you are now signed in.'
        });
        authRedirect();
      } else {
        const errorMessage = error || 'Registration failed';
        setRegisterError(errorMessage);
        toast.error('Registration failed', { description: errorMessage });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Registration failed';
      setRegisterError(errorMessage);
      toast.error('Registration failed', { description: errorMessage });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      <div className="min-h-screen flex">
        {/* Left Column - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 via-blue-600/90 to-purple-600/90" />
          <div className="relative z-10 flex flex-col justify-center items-center text-primary-foreground p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Scale className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Join Avocat Today</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-md">
                Create your account and start transforming your legal practice with our 
                intelligent management platform.
              </p>
              
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>Free 14-day trial included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>Full feature access from day one</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center justify-center gap-3">
                <Scale className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">Avocat</span>
              </Link>
            </div>

            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Start your free trial today
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Error Alert */}
                {registerError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyPress} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('firstName')}
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder="John"
                          className={`pl-10 ${errors.firstName ? 'border-destructive focus:ring-destructive' : ''}`}
                          aria-invalid={!!errors.firstName}
                        />
                      </div>
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">
                        Last Name
                      </Label>
                      <Input
                        {...register('lastName')}
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        className={`${errors.lastName ? 'border-destructive focus:ring-destructive' : ''}`}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@lawfirm.com"
                        className={`pl-10 ${errors.email ? 'border-destructive focus:ring-destructive' : ''}`}
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">
                      Your Role
                    </Label>
                    <Select 
                      value={selectedRole} 
                      onValueChange={(value) => setValue('role', value as any)}
                    >
                      <SelectTrigger className={`${errors.role ? 'border-destructive focus:ring-destructive' : ''}`}>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lawyer">Lawyer</SelectItem>
                        
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.role.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Firm Name (Optional) */}
                  {selectedRole && ['lawyer', 'admin'].includes(selectedRole) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <Label htmlFor="firmName" className="text-foreground">
                        Law Firm Name <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('firmName')}
                          id="firmName"
                          type="text"
                          placeholder="Doe & Associates Law Firm"
                          className="pl-10"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('password')}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`pl-10 pr-10 ${errors.password ? 'border-destructive focus:ring-destructive' : ''}`}
                          aria-invalid={!!errors.password}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Must contain at least 8 characters, including uppercase, lowercase, and number
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-foreground">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('confirmPassword')}
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive focus:ring-destructive' : ''}`}
                          aria-invalid={!!errors.confirmPassword}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.confirmPassword.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={watch('agreeTerms')}
                        onCheckedChange={(checked) => setValue('agreeTerms', !!checked)}
                        className={`mt-1 ${errors.agreeTerms ? 'border-destructive' : ''}`}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.agreeTerms && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.agreeTerms.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    disabled={isLoading || isSubmitting}
                  >
                    {(isLoading || isSubmitting) ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center lg:hidden">
                  <Link 
                    to="/" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;