import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      toast({
        title: isRTL ? 'مرحباً بك' : 'Welcome',
        description: isRTL ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: error instanceof Error ? error.message : isRTL ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <GlassCard variant="primary" size="lg" className="w-full max-w-md relative z-10">
        <GlassCardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <GlassCardTitle className="text-2xl font-bold">
            {t('auth.signup')}
          </GlassCardTitle>
          <GlassCardDescription>
            {isRTL ? 'أنشئ حساباً جديداً للبدء' : 'Create a new account to get started'}
          </GlassCardDescription>
        </GlassCardHeader>

        <GlassCardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                {t('auth.name')}
              </Label>
              <div className="relative">
                <User className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  id="name"
                  type="text"
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`glass ${isRTL ? 'pr-10' : 'pl-10'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t('auth.email')}
              </Label>
              <div className="relative">
                <Mail className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`glass ${isRTL ? 'pr-10' : 'pl-10'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t('auth.password')}
              </Label>
              <div className="relative">
                <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`glass ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'left-3' : 'right-3'}`}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <div className="relative">
                <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Confirm your password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`glass ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'left-3' : 'right-3'}`}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (isRTL ? 'جاري إنشاء الحساب...' : 'Creating account...') : t('auth.signup')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <Link
                to="/login"
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                {t('auth.login')}
              </Link>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {isRTL ? 'العودة إلى' : 'Back to'}{' '}
              <Link
                to="/"
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                {isRTL ? 'الصفحة الرئيسية' : 'Homepage'}
              </Link>
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default Signup;