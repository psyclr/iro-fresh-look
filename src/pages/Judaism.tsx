import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { BookOpen, CalendarHeart, ScrollText, Send, Loader2 } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRabbiQAs, useTraditions, useSubmitRabbiQuestion, useHebcalHolidays } from '@/hooks/useStrapi';
import type { HebcalHoliday } from '@/types/strapi';

const Judaism = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Data hooks
  const { data: rabbiQAs } = useRabbiQAs();
  const { data: hebcalData } = useHebcalHolidays();
  const { data: traditions } = useTraditions();
  const submitQuestion = useSubmitRabbiQuestion();

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formQuestion, setFormQuestion] = useState('');

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formQuestion.trim()) return;

    submitQuestion.mutate(
      { name: formName, email: formEmail, question: formQuestion },
      {
        onSuccess: () => {
          toast({ title: t('judaismPage.form.successTitle'), description: t('judaismPage.form.successDesc') });
          setFormName('');
          setFormEmail('');
          setFormQuestion('');
        },
        onError: () => {
          toast({ title: t('judaismPage.form.errorTitle'), description: t('judaismPage.form.errorDesc'), variant: 'destructive' });
        },
      }
    );
  };

  // Filter future holidays
  const now = new Date();
  const upcomingHolidays: HebcalHoliday[] = (hebcalData?.items ?? [])
    .filter((h) => new Date(h.date) >= now && h.category !== 'parashat')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getCategoryVariant = (category: string) => {
    if (category === 'holiday') return 'default';
    if (category === 'roshchodesh') return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>{t('judaismPage.title')} — {t('hero.titleHighlight')}</title></Helmet>
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">{t('judaismPage.title')}</h1>
          <p className="text-lg text-muted-foreground mb-10 text-center max-w-3xl mx-auto">{t('judaismPage.intro')}</p>

          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {/* Spoiler 1: Rabbi's Council */}
              <AccordionItem value="rabbi" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg hover:no-underline">
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {t('judaismPage.rabbiTitle')}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {/* Q&A list */}
                    {rabbiQAs && rabbiQAs.length > 0 ? (
                      <div className="space-y-4">
                        {rabbiQAs.map((qa) => (
                          <div key={qa.id} className="bg-muted/50 rounded-lg p-4">
                            <p className="font-medium text-primary mb-2">— {qa.question}</p>
                            <p className="text-muted-foreground text-sm">{qa.answer}</p>
                            {qa.rabbi_name && (
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                {t('judaismPage.rabbiQA.rabbi')}: {qa.rabbi_name}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">{t('judaismPage.rabbiQA.empty')}</p>
                    )}

                    {/* Question form */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">{t('judaismPage.form.title')}</h4>
                      <form onSubmit={handleSubmitQuestion} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="rabbi-name">{t('judaismPage.form.nameLabel')}</Label>
                            <Input id="rabbi-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder={t('judaismPage.form.namePlaceholder')} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rabbi-email">{t('judaismPage.form.emailLabel')}</Label>
                            <Input id="rabbi-email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder={t('judaismPage.form.emailPlaceholder')} required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rabbi-question">{t('judaismPage.form.questionLabel')}</Label>
                          <Textarea id="rabbi-question" value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)} placeholder={t('judaismPage.form.questionPlaceholder')} rows={3} required />
                        </div>
                        <Button type="submit" disabled={submitQuestion.isPending}>
                          {submitQuestion.isPending ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('judaismPage.form.submitting')}</>
                          ) : (
                            <><Send className="w-4 h-4 mr-2" />{t('judaismPage.form.submit')}</>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Spoiler 2: Holidays */}
              <AccordionItem value="holidays" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg hover:no-underline">
                  <span className="flex items-center gap-3">
                    <CalendarHeart className="w-5 h-5 text-amber-600" />
                    {t('judaismPage.holidaysTitle')}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {upcomingHolidays.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingHolidays.map((holiday, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                          <div className="flex-1">
                            <p className="font-medium">{holiday.title}</p>
                            {holiday.hebrew && <p className="text-sm text-muted-foreground">{holiday.hebrew}</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={getCategoryVariant(holiday.category)}>
                              {t(`judaismPage.holidays.categories.${holiday.category}`, holiday.category)}
                            </Badge>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(holiday.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">{t('judaismPage.holidays.noUpcoming')}</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Spoiler 3: Traditions */}
              <AccordionItem value="traditions" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg hover:no-underline">
                  <span className="flex items-center gap-3">
                    <ScrollText className="w-5 h-5 text-purple-600" />
                    {t('judaismPage.traditionsTitle')}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {traditions && traditions.length > 0 ? (
                    <div className="space-y-4">
                      {traditions.map((tradition) => (
                        <div key={tradition.id} className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-primary mb-1">{tradition.title}</h4>
                          <p className="text-sm text-muted-foreground">{tradition.description}</p>
                          {tradition.related_holiday && (
                            <p className="text-xs mt-2">
                              <span className="text-muted-foreground">{t('judaismPage.traditions.relatedHoliday')}: </span>
                              <Badge variant="outline" className="text-xs">{tradition.related_holiday}</Badge>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{t('judaismPage.traditionsDetailP1')}</p>
                      <p className="text-muted-foreground leading-relaxed">{t('judaismPage.traditionsDetailP2')}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Static sections */}
            <div className="mt-12 bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{t('judaismPage.faithTitle')}</h2>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">{t('judaismPage.faithP1')}</p>
                <p className="text-muted-foreground">{t('judaismPage.faithP2')}</p>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('judaismPage.lifeTitle')}</h3>
              <p className="text-muted-foreground">{t('judaismPage.lifeDesc')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Judaism;
