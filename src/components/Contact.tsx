import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { personalInfo } from '@/data/portfolio';
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Send, Instagram, ArrowUpRight, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonLoader } from '@/components/ui/loading-spinner';

/* ── Validation ─────────────────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactForm = z.infer<typeof contactSchema>;

/* ── Helpers ────────────────────────────────────────────────── */

const fieldClass = (hasError: boolean) =>
  cn(
    'h-12 rounded-xl px-4 text-sm',
    'bg-white/80 dark:bg-white/5 text-foreground placeholder:text-muted-foreground/60',
    'border border-border/40 dark:border-white/10',
    'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/30 focus-visible:outline-none',
    'transition-all duration-200',
    hasError && 'border-destructive/60 focus-visible:ring-destructive/40',
  );

const textareaClass = (hasError: boolean) =>
  cn(
    'rounded-xl px-4 py-3 text-sm min-h-[160px] resize-none',
    'bg-white/80 dark:bg-white/5 text-foreground placeholder:text-muted-foreground/60',
    'border border-border/40 dark:border-white/10',
    'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/30 focus-visible:outline-none',
    'transition-all duration-200',
    hasError && 'border-destructive/60 focus-visible:ring-destructive/40',
  );

const SOCIALS = [
  { key: 'github', Icon: Github, label: 'GitHub' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter', Icon: Twitter, label: 'X / Twitter' },
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
] as const;

/* ── Component ──────────────────────────────────────────────── */

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (_data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Message sent successfully! 🎉',
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      reset();
    } catch {
      toast({
        title: 'Error sending message',
        description: 'Please try again or contact me directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Contact detail cards ─────────────────────── */
  const contactItems = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28 relative overflow-hidden">

      {/* ── Background decoration ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Get in touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have an idea, project, or opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        {/* ── Main Grid ─── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* ── Left: Contact info (2 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Intro */}
            <div className="mb-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Reach out anytime
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Whether it's a freelance project, full-time opportunity, or just a conversation about tech — I'm always open to connecting.
              </p>
            </div>

            {/* Contact detail cards */}
            <div className="space-y-3">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className={cn(
                      'group flex items-center gap-4 p-4 rounded-xl',
                      'bg-card/80 dark:bg-card/60 border border-border/40 dark:border-white/8',
                      'hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5',
                      'transition-all duration-300',
                      item.href === '#' && 'pointer-events-none',
                    )}
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/8 dark:bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold truncate">{item.value}</p>
                    </div>
                    {item.href !== '#' && (
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Follow me
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(({ key, Icon, label }) => {
                  const url = personalInfo.social[key as keyof typeof personalInfo.social];
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center',
                        'bg-card/80 dark:bg-card/60 border border-border/40 dark:border-white/8',
                        'hover:border-primary/30 hover:text-primary hover:shadow-md hover:shadow-primary/5',
                        'transition-all duration-300 hover:-translate-y-0.5',
                      )}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form (3 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className={cn(
              'rounded-2xl p-6 sm:p-8 lg:p-10',
              'bg-card/70 dark:bg-card/50 border border-border/40 dark:border-white/8',
              'shadow-xl shadow-black/[0.03] dark:shadow-black/20',
            )}>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Send a message</h3>
              <p className="text-muted-foreground text-sm mb-8">I'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Name</label>
                    <Input
                      placeholder="Your name"
                      {...register('name')}
                      className={fieldClass(!!errors.name)}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className={fieldClass(!!errors.email)}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Subject</label>
                  <Input
                    placeholder="What's this about?"
                    {...register('subject')}
                    className={fieldClass(!!errors.subject)}
                  />
                  {errors.subject && <p className="text-destructive text-xs mt-1.5">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Message</label>
                  <Textarea
                    placeholder="Tell me about your project, idea, or question…"
                    rows={6}
                    {...register('message')}
                    className={textareaClass(!!errors.message)}
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full h-12 rounded-xl text-sm font-semibold tracking-wide',
                    'bg-gradient-primary text-white',
                    'hover:opacity-90 active:scale-[0.98]',
                    'transition-all duration-200',
                    'flex items-center justify-center gap-2.5',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <ButtonLoader />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
