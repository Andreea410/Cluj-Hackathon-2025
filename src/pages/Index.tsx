import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Zap, Camera, Calendar, Gift, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import UserProfileForm from '@/components/UserProfileForm';
import SkinAnalysisQuiz from '@/components/SkinAnalysisQuiz';
import RoutineWithProducts from '@/components/RoutineWithProducts';
import PricingPlans from '@/components/PricingPlans';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState(null);
  const [skinAnalysis, setSkinAnalysis] = useState(null);

  // Check user profile completion when user logs in
  useEffect(() => {
    if (user && currentStep === 'welcome') {
      checkUserProfile();
    }
  }, [user, currentStep]);

  const checkUserProfile = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile?.age && profile?.gender) {
        // Profile is complete, check if they've done the quiz
        const { data: responses } = await supabase
          .from('user_responses')
          .select('*')
          .eq('auth_user_id', user.id);

        if (responses && responses.length > 0) {
          // They've done the quiz, go to routine
          setCurrentStep('routine');
          // Reconstruct skin analysis from responses
          const analysis = {};
          responses.forEach(response => {
            analysis[response.question_id] = response.option_id;
          });
          setSkinAnalysis(analysis);
        } else {
          // Profile complete but no quiz
          setCurrentStep('skinAnalysis');
        }
      } else {
        // Profile incomplete
        setCurrentStep('profileForm');
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  };

  const handleProfileComplete = () => {
    setCurrentStep('skinAnalysis');
  };

  const handleSkinAnalysis = (analysis: any) => {
    setSkinAnalysis(analysis);
    setCurrentStep('routine');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentStep('welcome');
      setSkinAnalysis(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'profileForm':
        return <UserProfileForm onComplete={handleProfileComplete} />;
      case 'skinAnalysis':
        return <SkinAnalysisQuiz onComplete={handleSkinAnalysis} />;
      case 'routine':
        return <RoutineWithProducts skinAnalysis={skinAnalysis} />;
      case 'pricing':
        return <PricingPlans />;
      default:
        return <WelcomeSection onGetStarted={() => setCurrentStep('profileForm')} onViewPricing={() => setCurrentStep('pricing')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header with logout button */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Skinetic
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.user_metadata?.first_name || user.email}!
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {renderCurrentStep()}
    </div>
  );
};

const WelcomeSection = ({ onGetStarted, onViewPricing }: { onGetStarted: () => void; onViewPricing: () => void }) => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Welcome Back!
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Continue your personalized skincare journey. Complete your profile and get AI-powered recommendations.
      </p>
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={onGetStarted}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg"
        >
          Complete Your Profile
        </Button>
        <Button 
          variant="outline" 
          onClick={onViewPricing}
          className="px-8 py-3 rounded-full text-lg border-purple-200 hover:bg-purple-50"
        >
          View Plans
        </Button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">AI-Powered Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Answer a few questions and get personalized skincare recommendations based on your unique skin type and concerns.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">Daily Routines</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Follow personalized morning and night routines. Track your progress and earn points for consistency.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">Rewards & Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Earn points for routine completion, get discounts, and track your skin's progress with photo analysis.
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Features Overview
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Personalized skin analysis questionnaire</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Custom product recommendations</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Morning & night routine tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Points system with rewards</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>Progress photo analysis</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>Daily routine notifications</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>Discount offers for loyal users</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Premium</Badge>
            <span>Dermatologist consultations</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Index;
