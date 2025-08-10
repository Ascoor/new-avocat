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
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, Eye, EyeOff, Scale, ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional()
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const authRedirect = useAuthRedirect();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  // Auto-focus first empty field
  useEffect(() => {
    const firstInput = document.querySelector('input:not([disabled])') as HTMLInputElement;
    firstInput?.focus();
  }, []);

  const onSubmit = async (data: LoginForm) => {
    setLoginError('');
    
    try {
      const success = await login({ email: data.email, password: data.password });
      if (success) {
        toast.success('Welcome back!', {
          description: 'You have successfully signed in to your account.'
        });
        authRedirect();
      } else {
        const errorMessage = error || 'Invalid credentials';
        setLoginError(errorMessage);
        toast.error('Sign in failed', { description: errorMessage });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid credentials';
      setLoginError(errorMessage);
      toast.error('Sign in failed', { description: errorMessage });
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-purple-600/90 to-pink-600/90" />
          <div className="relative z-10 flex flex-col justify-center items-center text-primary-foreground p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Scale className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Welcome Back to Avocat</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-md">
                Your intelligent legal management platform awaits. Sign in to access your cases, 
                clients, and practice insights.
              </p>
              
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>Secure client data management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>AI-powered case insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span>Seamless workflow automation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Login Form */}
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
                  Sign In to Your Account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Access your legal practice dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Error Alert */}
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyPress} className="space-y-6">
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
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="email-error"
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
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
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.password ? 'border-destructive focus:ring-destructive' : ''}`}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
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
                        id="password-error"
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={watch('rememberMe')}
                        onCheckedChange={(checked) => setValue('rememberMe', !!checked)}
                      />
                      <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
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
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Create an account
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

export default LoginPage;