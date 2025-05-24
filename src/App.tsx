import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/AuthPage";
import RoutineTracker from "./components/RoutineTracker";
import PricingPlans from "./components/PricingPlans";
import ProtectedRoute from "./components/ProtectedRoute";
import AIProfileBuilder from "./components/AIProfileBuilder";

const queryClient = new QueryClient();

// Wrapper component to handle profile completion
const ProfileBuilderWrapper = () => {
  const navigate = useNavigate();

  const handleProfileComplete = (profile: any) => {
    // Store the profile in localStorage or state management
    localStorage.setItem('userProfile', JSON.stringify(profile));
    // Navigate to dashboard after profile completion
    navigate('/dashboard');
  };

  return <AIProfileBuilder onComplete={handleProfileComplete} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pricing" element={<PricingPlans />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <RoutineTracker 
                  points={0}
                  setPoints={() => {}}
                  skinAnalysis={{
                    skinType: 'normal',
                    concerns: [],
                    sensitivity: 'low'
                  }}
                  userProfile={null}
                />
              </ProtectedRoute>
            } />
            
            <Route path="/profile-builder" element={
              <ProtectedRoute>
                <ProfileBuilderWrapper />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
