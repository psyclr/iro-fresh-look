import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import { submitContactForm } from "@/lib/contact";
import { toast } from "@/components/ui/use-toast";

const buildContactSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(2, t("contact.validation.nameMin"))
      .max(100, t("contact.validation.nameMax")),
    email: z.string().email(t("contact.validation.email")),
    message: z.string().min(10, t("contact.validation.messageMin")),
  });

type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;

const Contact = () => {
  const { t } = useTranslation();
  const schema = useMemo(() => buildContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitContactForm(values);
      toast({
        title: t("contact.toast.successTitle"),
        description: t("contact.toast.successDescription"),
      });
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorDescription"),
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">{t("contact.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("contact.description")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-enhanced p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">{t("contact.info.addressTitle")}</h3>
                    <p className="text-muted-foreground">
                      {t("contact.info.addressValue")}<br />
                      <span className="text-sm">{t("contact.info.addressNote")}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-enhanced p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">{t("contact.info.phoneTitle")}</h3>
                    <p className="text-muted-foreground">
                      {t("contact.info.phoneValue")}<br />
                      <span className="text-sm">{t("contact.info.phoneNote")}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-enhanced p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">{t("contact.info.emailTitle")}</h3>
                    <p className="text-muted-foreground">
                      {t("contact.info.emailValue")}<br />
                      <span className="text-sm">{t("contact.info.emailNote")}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-enhanced p-8 rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-6">{t("contact.form.title")}</h3>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2" htmlFor="contact-name">
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-destructive" aria-live="polite">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2" htmlFor="contact-email">
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-sm text-destructive" aria-live="polite">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2" htmlFor="contact-message">
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-2 text-sm text-destructive" aria-live="polite">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-center disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitLoading") : t("contact.form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
