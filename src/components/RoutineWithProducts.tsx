
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Gift, Camera, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  photo_url: string;
}

interface RoutineStep {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

const RoutineWithProducts = ({ skinAnalysis }: { skinAnalysis: any }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [morningCompleted, setMorningCompleted] = useState<string[]>([]);
  const [nightCompleted, setNightCompleted] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Dynamic routine based on skin analysis
  const getMorningRoutine = (): RoutineStep[] => {
    const baseRoutine = [
      {
        id: 'morning-cleanse',
        name: 'Gentle Cleanser',
        description: 'Start your day with a gentle cleanse',
        products: [
          {
            id: 'cleanser-1',
            name: 'Gentle Daily Cleanser',
            description: 'A mild, non-stripping cleanser suitable for daily use',
            price: 24,
            photo_url: '/placeholder.svg'
          }
        ]
      }
    ];

    // Add vitamin C for aging concerns or hyperpigmentation
    if (skinAnalysis?.skinConcerns === 'aging' || skinAnalysis?.skinConcerns === 'hyperpigmentation') {
      baseRoutine.push({
        id: 'morning-vitamin-c',
        name: 'Vitamin C Serum',
        description: 'Brightening serum for even skin tone',
        products: [
          {
            id: 'vitamin-c-1',
            name: 'Vitamin C Brightening Serum',
            description: 'Antioxidant-rich serum for radiant skin',
            price: 38,
            photo_url: '/placeholder.svg'
          }
        ]
      });
    }

    // Add hydrating serum for dry skin
    if (skinAnalysis?.skinType === 'dry' || skinAnalysis?.skinConcerns === 'dryness') {
      baseRoutine.push({
        id: 'morning-hydrate',
        name: 'Hydrating Serum',
        description: 'Intense hydration boost',
        products: [
          {
            id: 'hydrating-serum-1',
            name: 'Hyaluronic Acid Serum',
            description: 'Deep hydration with hyaluronic acid',
            price: 45,
            photo_url: '/placeholder.svg'
          }
        ]
      });
    }

    // Always add moisturizer and SPF
    baseRoutine.push(
      {
        id: 'morning-moisturize',
        name: 'Moisturizer',
        description: 'Lock in hydration',
        products: [
          {
            id: 'moisturizer-1',
            name: 'Daily Moisturizer',
            description: 'Lightweight daily hydration',
            price: 28,
            photo_url: '/placeholder.svg'
          }
        ]
      },
      {
        id: 'morning-spf',
        name: 'SPF Protection',
        description: 'Essential sun protection',
        products: [
          {
            id: 'spf-1',
            name: 'SPF 30 Sunscreen',
            description: 'Broad spectrum protection',
            price: 22,
            photo_url: '/placeholder.svg'
          }
        ]
      }
    );

    return baseRoutine;
  };

  const getNightRoutine = (): RoutineStep[] => {
    const baseRoutine = [
      {
        id: 'night-cleanse',
        name: 'Gentle Cleanser',
        description: 'Remove the day\'s impurities',
        products: [
          {
            id: 'cleanser-1',
            name: 'Gentle Daily Cleanser',
            description: 'A mild, non-stripping cleanser',
            price: 24,
            photo_url: '/placeholder.svg'
          }
        ]
      }
    ];

    // Add treatment based on skin concerns
    if (skinAnalysis?.skinType === 'oily' || skinAnalysis?.breakoutFrequency === 'frequently') {
      baseRoutine.push({
        id: 'night-treatment',
        name: 'Acne Treatment',
        description: 'Targeted acne treatment',
        products: [
          {
            id: 'salicylic-acid-1',
            name: 'Salicylic Acid Treatment',
            description: 'Helps unclog pores and reduce breakouts',
            price: 32,
            photo_url: '/placeholder.svg'
          }
        ]
      });
    } else if (skinAnalysis?.skinConcerns === 'aging') {
      baseRoutine.push({
        id: 'night-retinol',
        name: 'Anti-Aging Treatment',
        description: 'Retinol for fine lines and wrinkles',
        products: [
          {
            id: 'retinol-1',
            name: 'Retinol Serum',
            description: 'Anti-aging formula to reduce fine lines',
            price: 58,
            photo_url: '/placeholder.svg'
          }
        ]
      });
    }

    // Always add night moisturizer
    baseRoutine.push({
      id: 'night-moisturize',
      name: 'Night Moisturizer',
      description: 'Rich overnight hydration',
      products: [
        {
          id: 'night-moisturizer-1',
          name: 'Night Repair Moisturizer',
          description: 'Intensive overnight repair',
          price: 35,
          photo_url: '/placeholder.svg'
        }
      ]
    });

    return baseRoutine;
  };

  const morningRoutine = getMorningRoutine();
  const nightRoutine = getNightRoutine();

  const handleStepComplete = async (stepId: string, isNight = false) => {
    if (!user) return;

    const completed = isNight ? nightCompleted : morningCompleted;
    const setCompleted = isNight ? setNightCompleted : setMorningCompleted;

    if (!completed.includes(stepId)) {
      setCompleted([...completed, stepId]);
      const newPoints = points + 0.5;
      setPoints(newPoints);

      // Save points to database
      try {
        await supabase
          .from('point_transactions')
          .insert({
            auth_user_id: user.id,
            points: 0.5
          });
      } catch (error) {
        console.error('Error saving points:', error);
      }

      if (newPoints >= 14 && !showReward) {
        setShowReward(true);
        toast({
          title: "Reward Unlocked! 🎉",
          description: "You've earned a 10% discount on your next purchase!",
        });
      }
    }
  };

  const progressToReward = Math.min((points / 14) * 100, 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Personalized Routine
        </h1>
        <p className="text-gray-600 mb-6">
          Complete your morning and night routines to earn points and unlock rewards!
        </p>
        
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-purple-600" />
                <span className="font-semibold">Progress to 10% Discount</span>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {points} / 14 points
              </Badge>
            </div>
            <Progress value={progressToReward} className="mb-2" />
            <p className="text-sm text-gray-600">
              {points >= 14 ? '🎉 Congratulations! You earned a 10% discount!' : `${14 - points} points until your next reward`}
            </p>
          </CardContent>
        </Card>

        {showReward && (
          <Card className="mb-8 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Reward Unlocked!</h3>
              <p className="text-yellow-700 mb-4">You've earned a 10% discount on your next purchase!</p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Claim Discount
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="morning" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Morning
          </TabsTrigger>
          <TabsTrigger value="night" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Night
          </TabsTrigger>
        </TabsList>

        <TabsContent value="morning">
          <div className="space-y-6">
            {morningRoutine.map((step, index) => (
              <Card key={step.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={morningCompleted.includes(step.id)}
                        onCheckedChange={() => handleStepComplete(step.id)}
                      />
                      <div>
                        <CardTitle className="text-lg">{index + 1}. {step.name}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    {morningCompleted.includes(step.id) && (
                      <Badge className="bg-green-100 text-green-700">
                        +0.5 points
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {step.products.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                        <img 
                          src={product.photo_url} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold text-purple-600">${product.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">4.8</span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="night">
          <div className="space-y-6">
            {nightRoutine.map((step, index) => (
              <Card key={step.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={nightCompleted.includes(step.id)}
                        onCheckedChange={() => handleStepComplete(step.id, true)}
                      />
                      <div>
                        <CardTitle className="text-lg">{index + 1}. {step.name}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    {nightCompleted.includes(step.id) && (
                      <Badge className="bg-green-100 text-green-700">
                        +0.5 points
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {step.products.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                        <img 
                          src={product.photo_url} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold text-purple-600">${product.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">4.8</span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoutineWithProducts;
