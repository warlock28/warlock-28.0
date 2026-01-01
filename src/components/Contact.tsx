const fieldClass = (hasError: boolean) =>
  cn(
    'bg-white text-foreground placeholder:text-muted-foreground',
    'border border-border focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
    'dark:bg-slate-900/70 dark:text-foreground dark:placeholder:text-muted-foreground',
    'transition-colors duration-200',
    hasError && 'border-destructive focus-visible:ring-destructive/60'
  );

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
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonLoader } from '@/components/ui/loading-spinner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto px-4">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                I'm always interested in hearing about new opportunities,
                whether that's a freelance project, a full-time role, or just a chat about technology.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3 sm:space-x-4"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-muted-foreground text-sm sm:text-base">{info.label}</p>
                      <a
                        href={info.href}
                        className="text-base sm:text-lg font-semibold hover:text-primary transition-colors break-words"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                );
              })}

              {/* Social Links */}
              <div className="pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Social Profiles</h4>
                <div className="flex gap-4">
                  {Object.entries(personalInfo.social).map(([platform, url]) => {
                    const IconComponent = platform === 'github' ? Github :
                      platform === 'linkedin' ? Linkedin :
                        platform === 'twitter' ? Twitter :
                          platform === 'instagram' ? Instagram : Mail;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:text-primary transition-all duration-200 hover:scale-110"
                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.div>


          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glassmorphism rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...register('name')}
                    className={fieldClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    {...register('email')}
                    className={fieldClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  placeholder="Subject"
                  {...register('subject')}
                  className={fieldClass(!!errors.subject)}
                />
                {errors.subject && (
                  <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  {...register('message')}
                  className={cn(fieldClass(!!errors.message), 'min-h-[150px]')}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white py-3 text-lg font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <ButtonLoader />
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
