import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Judaism from "./pages/Judaism";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

import Poster from "./pages/Poster";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />


          <Route path="/judaism" element={<Judaism />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/news/:slug" element={<BlogPost />} />

          <Route path="/poster" element={<Poster />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
