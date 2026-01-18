import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Loader2, LogIn, ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import BrandLogo from "@/components/common/BrandLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { smoothScrollToElement } from "@/utils/smoothScroll";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: "en" | "ar";
  direction: "ltr" | "rtl";
}

type Mode = "login" | "request";

type FieldErrors = {
  email?: string;
  password?: string;
  organization?: string;
};

const copy = {
  en: {
    login: {
      title: "Client Portal Sign In",
      sub: "Secure access to your case files, invoices, and legal dashboard.",
      button: "Sign in",
      tab: "Login",
    },
    request: {
      title: "Request Access",
      sub: "We’ll verify your identity and activate your portal.",
      button: "Request Access",
      tab: "Request Access",
    },
    trust: "Protected by enterprise-grade security.",
    emailLabel: "Email",
    passwordLabel: "Password",
    orgLabel: "Organization / Case ID",
    remember: "Remember me",
    forgot: "Forgot password?",
    back: "Back to site",
    continue: "Continue exploring",
    contact: "Contact us",
    portal: "Open full portal",
    helper: "Need a faster review? Our team responds within 24 hours.",
    close: "Close",
  },
  ar: {
    login: {
      title: "تسجيل الدخول إلى بوابة العملاء",
      sub: "وصول آمن لملفات القضايا، الفواتير، ولوحة المتابعة القانونية.",
      button: "تسجيل الدخول",
      tab: "تسجيل الدخول",
    },
    request: {
      title: "طلب تفعيل الوصول",
      sub: "سنؤكد هويتك ونفعّل حساب البوابة.",
      button: "طلب التفعيل",
      tab: "طلب تفعيل الوصول",
    },
    trust: "مؤمن بأعلى معايير الحماية الرقمية.",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    orgLabel: "الجهة / رقم القضية",
    remember: "تذكرني",
    forgot: "نسيت كلمة المرور؟",
    back: "العودة للموقع",
    continue: "تابع الاستكشاف",
    contact: "تواصل معنا",
    portal: "فتح البوابة الكاملة",
    helper: "تحتاج مراجعة أسرع؟ نرد خلال ٢٤ ساعة.",
    close: "إغلاق",
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const focusableSelector =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

const LoginModal = ({ open, onOpenChange, language, direction }: LoginModalProps) => {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const prefersReducedMotion = useReducedMotion();

  const titleId = useId();
  const descriptionId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();
  const orgErrorId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const text = copy[language];
  const modeCopy = text[mode];

  const overlayVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: prefersReducedMotion ? 0 : 0.25 },
      },
      exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
    }),
    [prefersReducedMotion],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
      },
      exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
    }),
    [prefersReducedMotion],
  );

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.25 } },
      exit: { opacity: 0, y: -8, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
    }),
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [open, mode]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!focusable || focusable.length === 0) {
        return;
      }

      const focusableElements = Array.from(focusable);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setErrors({});
    }
  }, [open, mode]);

  const handleExplore = (targetId: "services" | "contact") => {
    onOpenChange(false);
    const element = document.getElementById(targetId);
    if (element) {
      window.setTimeout(() => smoothScrollToElement(element, { offset: 92 }), 100);
    }
  };

  const validate = () => {
    const nextErrors: FieldErrors = {};

    if (!email.trim()) {
      nextErrors.email = language === "ar" ? "يرجى إدخال البريد الإلكتروني" : "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = language === "ar" ? "صيغة البريد الإلكتروني غير صحيحة" : "Enter a valid email";
    }

    if (mode === "login") {
      if (!password.trim()) {
        nextErrors.password = language === "ar" ? "يرجى إدخال كلمة المرور" : "Password is required";
      }
    } else if (!organization.trim()) {
      nextErrors.organization = language === "ar" ? "يرجى إدخال الجهة أو رقم القضية" : "Organization is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    if (mode === "login") {
      void (async () => {
        try {
          await login(email.trim(), password.trim());
          toast({
            title: language === "ar" ? "تم تسجيل الدخول" : "Signed in",
            description: language === "ar" ? "مرحبًا بك من جديد." : "Welcome back!",
          });
          onOpenChange(false);
          navigate("/dashboard");
        } catch (error) {
          const description =
            error instanceof Error
              ? error.message
              : language === "ar"
                ? "تعذر تسجيل الدخول"
                : "Unable to sign in";
          toast({
            title: language === "ar" ? "خطأ" : "Error",
            description,
            variant: "destructive",
          });
        }
      })();
    } else {
      toast({
        title: language === "ar" ? "تم إرسال الطلب" : "Request sent",
        description:
          language === "ar"
            ? "سنتواصل معك قريبًا لتفعيل الوصول."
            : "We'll contact you soon to activate access.",
      });
      onOpenChange(false);
    }
  };

  const disableSubmit =
    loading ||
    !email.trim() ||
    (mode === "login" ? !password.trim() : !organization.trim());

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={() => onOpenChange(false)}
        >
          <div
            className="absolute inset-0 bg-[hsl(var(--overlay))] backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            dir={direction}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={cn(
              "relative w-full max-w-[560px] max-h-[85svh] overflow-auto rounded-3xl",
              "border border-[hsl(var(--auth-border))] bg-[hsl(var(--auth-card))] shadow-[var(--auth-shadow)]",
            )}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5" aria-hidden="true" />

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 start-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--auth-border))] text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--gold)/0.5)] hover:text-[hsl(var(--foreground))]"
              aria-label={text.close}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative grid gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BrandLogo variant="icon" className="h-10 w-10" lang={language} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
                      Legal Aurora
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{text.trust}</p>
                  </div>
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  {language === "ar" ? "وصول مصمم للخبراء" : "Curated access for clients"}
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--auth-border))] bg-[hsl(var(--surface-overlay))] p-2">
                <div role="tablist" aria-label="Authentication mode" className="relative grid grid-cols-2 gap-2">
                  <motion.span
                    className="absolute inset-y-0 my-1 rounded-xl bg-[hsl(var(--card))] shadow-[var(--shadow-sm)]"
                    layout
                    transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "calc(50% - 0.5rem)",
                      insetInlineStart: mode === "login" ? "0.25rem" : "calc(50% + 0.25rem)",
                    }}
                  />
                  {(["login", "request"] as Mode[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={mode === value}
                      onClick={() => setMode(value)}
                      className={cn(
                        "relative z-10 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        mode === value
                          ? "text-[hsl(var(--foreground))]"
                          : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                      )}
                    >
                      {value === "login" ? text.login.tab : text.request.tab}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={mode} initial="hidden" animate="visible" exit="exit" variants={contentVariants}>
                  <div className="space-y-2 text-start">
                    <h2 id={titleId} className="text-2xl font-semibold text-[hsl(var(--foreground))]">
                      {modeCopy.title}
                    </h2>
                    <p id={descriptionId} className="text-sm text-[hsl(var(--muted-foreground))]">
                      {modeCopy.sub}
                    </p>
                  </div>

                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2 text-start">
                      <label className="text-sm font-medium text-[hsl(var(--foreground))]" htmlFor="auth-email">
                        {text.emailLabel}
                      </label>
                      <Input
                        ref={firstInputRef}
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? emailErrorId : undefined}
                        className="h-11 w-full rounded-xl border-[hsl(var(--auth-border))] bg-[hsl(var(--surface))]"
                      />
                      {errors.email ? (
                        <p
                          id={emailErrorId}
                          className="text-xs text-[hsl(var(--legal-danger-500))]"
                          role="alert"
                          aria-live="polite"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    {mode === "login" ? (
                      <div className="space-y-2 text-start">
                        <label className="text-sm font-medium text-[hsl(var(--foreground))]" htmlFor="auth-password">
                          {text.passwordLabel}
                        </label>
                        <div className="relative">
                          <Input
                            id="auth-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? passwordErrorId : undefined}
                            className="h-11 w-full rounded-xl border-[hsl(var(--auth-border))] bg-[hsl(var(--surface))] pe-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute end-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))]"
                            aria-label={
                              showPassword
                                ? language === "ar"
                                  ? "إخفاء كلمة المرور"
                                  : "Hide password"
                                : language === "ar"
                                  ? "إظهار كلمة المرور"
                                  : "Show password"
                            }
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password ? (
                          <p
                            id={passwordErrorId}
                            className="text-xs text-[hsl(var(--legal-danger-500))]"
                            role="alert"
                            aria-live="polite"
                          >
                            {errors.password}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <div className="space-y-2 text-start">
                        <label className="text-sm font-medium text-[hsl(var(--foreground))]" htmlFor="auth-org">
                          {text.orgLabel}
                        </label>
                        <Input
                          id="auth-org"
                          type="text"
                          value={organization}
                          onChange={(event) => setOrganization(event.target.value)}
                          aria-invalid={Boolean(errors.organization)}
                          aria-describedby={errors.organization ? orgErrorId : undefined}
                          className="h-11 w-full rounded-xl border-[hsl(var(--auth-border))] bg-[hsl(var(--surface))]"
                        />
                        {errors.organization ? (
                          <p
                            id={orgErrorId}
                            className="text-xs text-[hsl(var(--legal-danger-500))]"
                            role="alert"
                            aria-live="polite"
                          >
                            {errors.organization}
                          </p>
                        ) : null}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                      {mode === "login" ? (
                        <label className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                          <Checkbox checked={remember} onCheckedChange={(value) => setRemember(Boolean(value))} />
                          {text.remember}
                        </label>
                      ) : (
                        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                          <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                          {text.helper}
                        </div>
                      )}
                      {mode === "login" ? (
                        <a
                          className="font-semibold text-[hsl(var(--gold))] transition hover:text-[hsl(var(--gold-light))]"
                          href="/login"
                        >
                          {text.forgot}
                        </a>
                      ) : null}
                    </div>

                    <div className="grid gap-3 pt-2 sm:grid-cols-2">
                      <Button
                        type="submit"
                        variant="gold"
                        className="h-11 rounded-xl shadow-[0_18px_30px_-22px_hsl(var(--auth-accent-glow))]"
                        disabled={disableSubmit}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <LogIn className="h-4 w-4" />
                        )}
                        {loading ? (language === "ar" ? "جارٍ المعالجة..." : "Processing...") : modeCopy.button}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-xl border-[hsl(var(--auth-border))]"
                        onClick={() => onOpenChange(false)}
                      >
                        {text.back}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-3 rounded-2xl border border-[hsl(var(--auth-border))] bg-[hsl(var(--surface-overlay))] p-4 text-sm text-[hsl(var(--muted-foreground))] sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                  <span>{language === "ar" ? "بوابة قانونية دقيقة وآمنة." : "Precision legal access, always secure."}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-full border-[hsl(var(--auth-border))] px-4 text-[hsl(var(--foreground))]"
                    onClick={() => handleExplore("services")}
                  >
                    {text.continue}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-full border-[hsl(var(--auth-border))] px-4 text-[hsl(var(--foreground))]"
                    onClick={() => handleExplore("contact")}
                  >
                    {text.contact}
                  </Button>
                  <a
                    className="inline-flex h-9 items-center justify-center rounded-full border border-[hsl(var(--auth-border))] px-4 text-[hsl(var(--foreground))] transition hover:border-[hsl(var(--gold))]"
                    href="/login"
                  >
                    {text.portal}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export default LoginModal;
