
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, Zap } from 'lucide-react';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with personalized skincare',
      features: [
        'Skin analysis questionnaire',
        'Personalized product recommendations',
        'Morning & night routine tracking',
        'Points and rewards system',
        'Progress photo uploads',
        'Daily routine notifications'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      icon: Zap
    },
    {
      name: 'Premium',
      price: '$29',
      period: 'per month',
      description: 'Advanced features with professional dermatologist support',
      features: [
        'Everything in Free plan',
        'Monthly dermatologist consultations',
        'Advanced AI skin analysis',
        'Priority customer support',
        'Exclusive product discounts',
        'Custom routine adjustments',
        'Weekly progress reports'
      ],
      buttonText: 'Start Premium Trial',
      popular: true,
      icon: Star
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start your skincare journey with our free plan or unlock premium features with professional support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={`border-0 shadow-2xl bg-white/90 backdrop-blur hover:shadow-3xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-t-lg">
                  <Badge className="bg-white text-purple-600 font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                {plan.name === 'Premium' && (
                  <p className="text-sm text-center text-gray-500">
                    7-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
          <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Why Choose Skinetic?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Science-backed formulas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Expert dermatologist support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Progress tracking technology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
