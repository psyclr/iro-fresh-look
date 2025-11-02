import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BelarusMapScheme from '@/components/BelarusMapScheme';
import KeyProjects from '@/components/KeyProjects';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { fetchCommunities } from "@/lib/communities";

const Index = () => {
  const { data: communities = [], isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <BelarusMapScheme communities={communities} />
        )}
        <KeyProjects />
        <DonationBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
