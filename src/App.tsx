import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Judaism from "./pages/Judaism";
import Heritage from "./pages/Heritage";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/community" element={<Community />} />
          <Route path="/judaism" element={<Judaism />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
