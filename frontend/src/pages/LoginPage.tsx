import react,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/features/auth/hooks';
import { useAuthRedirect } from '@/features/auth/useAuthRedirect';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const redirect = useAuthRedirect();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const success = await login(values);
    if (success) {
      redirect();
    }
  };

 
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  }); 
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('auth.validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.validation.email_invalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      
      toast({
        title: t('common.success'),
        description: "Successfully logged in!",
      });

      // Redirect to the next page or dashboard
      const nextUrl = searchParams.get('next') || '/dashboard';
      navigate(nextUrl);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${authBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-80"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">
              {t('brand.name')}
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              {t('brand.slogan')}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold gradient-text">
              {t('brand.name')}
            </Link>
            <LanguageToggle />
          </div>

          {/* Login Card */}
          <Card className="glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="heading-md">
                {t('auth.login.title')}
              </CardTitle>
              <CardDescription>
                {t('auth.login.subtitle')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder="example@domain.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.login.password')}</Label>
                  <div className="relative">
                      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-4 w-full max-w-sm"
        ></form>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, remember: checked as boolean })
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {t('auth.login.remember')}
                    </Label>
                  </div>
                  <Button variant="link" className="px-0 text-sm">
                    {t('auth.login.forgot')}
                  </Button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full glow-effect"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t('common.loading')}
                    </div>
                  ) : (
                    <>
                      {t('auth.login.submit')}
                      <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </Button>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {t('auth.login.register_link').split('?')[0]}?{' '}
                    <Link 
                      to="/register" 
                      className="text-primary hover:underline font-medium"
                    >
                      {t('auth.login.register_link').split('? ')[1]}
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials Alert */}
          <Alert className="border-accent/20 bg-accent/10">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent-foreground">
              <strong>Demo:</strong> Use any email and password to login (e.g., demo@avocat.com / password123)
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;  