import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';

interface ContactFormCopy {
  labels: {
    name: string;
    email: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  submit: string;
  submitting: string;
  success: {
    title: string;
    description: string;
  };
}

interface ContactPoint {
  icon: string;
  title: string;
  details: string;
}

const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Phone,
  Mail,
  Clock3,
};

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { language, direction } = useLanguage();
  const isArabic = language === 'ar';
  const locale = language as 'ar' | 'en';
  const { contentBlocks, getLocalizedValue, getValueForLocale } = useWebsiteContent('contact');

  const header = {
    badge: getValueForLocale('contact_badge', locale) ?? '',
    title: getValueForLocale('contact_title', locale) ?? '',
    description: getValueForLocale('contact_subtitle', locale) ?? '',
    note: getValueForLocale('contact_note', locale) ?? '',
    conciergeTitle: getValueForLocale('contact_concierge_title', locale) ?? '',
    conciergeBody: getValueForLocale('contact_concierge_body', locale) ?? '',
  };

  const formCopy = useMemo<ContactFormCopy>(() => {
    const localized = getLocalizedValue<ContactFormCopy>('contact_form_copy', {
      ar: {
        labels: { name: '', email: '', message: '' },
        placeholders: { name: '', email: '', message: '' },
        submit: '',
        submitting: '',
        success: { title: '', description: '' },
      },
      en: {
        labels: { name: '', email: '', message: '' },
        placeholders: { name: '', email: '', message: '' },
        submit: '',
        submitting: '',
        success: { title: '', description: '' },
      },
    });

    return localized[locale] ?? localized.en ?? {
      labels: { name: '', email: '', message: '' },
      placeholders: { name: '', email: '', message: '' },
      submit: '',
      submitting: '',
      success: { title: '', description: '' },
    };
  }, [getLocalizedValue, locale]);

  const contactPoints = useMemo<ContactPoint[]>(() => {
    return contentBlocks
      .filter((block) => block.key.startsWith('contact_point_'))
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((block) => {
        const localized = block.value as unknown as {
          ar?: ContactPoint | null;
          en?: ContactPoint | null;
        };

        const fallback = localized.en ?? { icon: 'MapPin', title: '', details: '' };
        const data = localized[locale] ?? fallback;

        return {
          icon: data.icon ?? fallback.icon ?? 'MapPin',
          title: data.title ?? fallback.title ?? '',
          details: data.details ?? fallback.details ?? '',
        };
      });
  }, [contentBlocks, locale]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({ title: formCopy.success.title, description: formCopy.success.description });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background py-24" dir={direction}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{header.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{header.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{header.description}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">
                    {formCopy.labels.name}
                  </label>
                  <Input
                    required
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={formCopy.placeholders.name}
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="email">
                    {formCopy.labels.email}
                  </label>
                  <Input
                    required
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={formCopy.placeholders.email}
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="message">
                  {formCopy.labels.message}
                </label>
                <Textarea
                  required
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder={formCopy.placeholders.message}
                  className="resize-none rounded-2xl border-border bg-background/70"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold flex w-full items-center justify-center gap-2 py-3 text-base font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 text-sm">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {formCopy.submitting}
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{formCopy.submit}</span>
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">{header.note}</p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">{header.conciergeTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{header.conciergeBody}</p>
            </div>

            <div className="space-y-4">
              {contactPoints.map((point, index) => {
                const Icon = iconLookup[point.icon.toLowerCase()] ?? MapPin;
                return (
                  <div key={`${point.title}-${index}`} className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{point.title}</p>
                      <p className="text-sm text-muted-foreground">{point.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
