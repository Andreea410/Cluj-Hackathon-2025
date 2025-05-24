import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Zap, Camera, Calendar, Gift } from 'lucide-react';
import RegistrationForm from '@/components/RegistrationForm';
import AIProfileBuilder from '@/components/AIProfileBuilder';
import RoutineTracker from '@/components/RoutineTracker';
import PricingPlans from '@/components/PricingPlans';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState(null);
  const [skinAnalysis, setSkinAnalysis] = useState({
    skinType: 'normal',
    concerns: [],
    sensitivity: 'low'
  });
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    console.log('Current step:', currentStep);
    console.log('User profile:', userProfile);
    console.log('Skin analysis:', skinAnalysis);
  }, [currentStep, userProfile, skinAnalysis]);

  const handleRegistration = (profile) => {
    console.log('Registration handler called with:', profile);
    setUserProfile(profile);
    
    if (profile.isExistingUser) {
      console.log('Existing user, setting skin analysis and moving to routine');
      setSkinAnalysis({
        skinType: 'combination',
        concerns: ['acne', 'aging'],
        sensitivity: 'moderate'
      });
      setCurrentStep('routine');
    } else {
      console.log('New user, moving to skin analysis quiz');
      setCurrentStep('skinAnalysis');
    }
  };

  const handleSkinAnalysis = (analysis) => {
    console.log('Skin analysis completed:', analysis);
    setSkinAnalysis(analysis);
    setCurrentStep('routine');
  };

  const renderCurrentStep = () => {
    console.log('Rendering step:', currentStep);
    
    switch (currentStep) {
      case 'registration':
        return <RegistrationForm onComplete={handleRegistration} />;
      case 'skinAnalysis':
        return <AIProfileBuilder onComplete={handleSkinAnalysis} />;
      case 'routine':
        console.log('Rendering routine with:', {
          points,
          userProfile,
          skinAnalysis
        });
        return (
          <RoutineTracker 
            points={points} 
            setPoints={setPoints} 
            skinAnalysis={skinAnalysis} 
            userProfile={userProfile}
          />
        );
      case 'pricing':
        return <PricingPlans />;
      default:
        return (
          <WelcomeSection 
            onGetStarted={() => {
              console.log('Starting registration flow');
              setCurrentStep('registration');
            }} 
            onViewPricing={() => setCurrentStep('pricing')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {renderCurrentStep()}
    </div>
  );
};

const WelcomeSection = ({ onGetStarted, onViewPricing }) => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Skinetic
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Your personalized skincare journey powered by AI. Get custom routines, track progress, and achieve your best skin ever.
      </p>
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={onGetStarted}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg"
        >
          Start Your Journey
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
