import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Gift, Camera, Calendar } from 'lucide-react';

interface RoutineTrackerProps {
  points: number;
  setPoints: (points: number) => void;
  skinAnalysis: {
    skinType: string;
    concerns: string[];
    sensitivity: string;
  };
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    isExistingUser?: boolean;
  };
}

const RoutineTracker = ({ points, setPoints, skinAnalysis, userProfile }: RoutineTrackerProps) => {
  const [morningCompleted, setMorningCompleted] = useState<number[]>([]);
  const [nightCompleted, setNightCompleted] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);

  const morningRoutine = [
    { id: 1, step: 'Gentle Cleanser', time: '30 seconds' },
    { id: 2, step: 'Vitamin C Serum', time: '1 minute' },
    { id: 3, step: 'Moisturizer', time: '30 seconds' },
    { id: 4, step: 'SPF 30 Sunscreen', time: '30 seconds' }
  ];

  const nightRoutine = [
    { id: 5, step: 'Gentle Cleanser', time: '30 seconds' },
    { id: 6, step: skinAnalysis.concerns.length > 0 
      ? `Treatment for ${skinAnalysis.concerns.join(' & ')}` 
      : 'Basic Treatment', 
      time: '1 minute' 
    },
    { id: 7, step: 'Hydrating Serum', time: '1 minute' },
    { id: 8, step: 'Moisturizer', time: '30 seconds' }
  ];

  const handleStepComplete = (stepId: number, isNight = false) => {
    if (isNight) {
      if (!nightCompleted.includes(stepId)) {
        setNightCompleted([...nightCompleted, stepId]);
        setPoints(points + 0.5);
      }
    } else {
      if (!morningCompleted.includes(stepId)) {
        setMorningCompleted([...morningCompleted, stepId]);
        setPoints(points + 0.5);
      }
    }
  };

  useEffect(() => {
    if (points >= 14 && !showReward) {
      setShowReward(true);
    }
  }, [points, showReward]);

  const progressToReward = Math.min((points / 14) * 100, 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome back, {userProfile.firstName}!
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="morning" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Morning
          </TabsTrigger>
          <TabsTrigger value="night" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Night
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="morning">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-yellow-500" />
                Morning Routine
              </CardTitle>
              <CardDescription>
                Start your day with these essential skincare steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {morningRoutine.map((step) => (
                <div key={step.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={morningCompleted.includes(step.id)}
                      onCheckedChange={() => handleStepComplete(step.id)}
                    />
                    <div>
                      <p className="font-medium">{step.step}</p>
                      <p className="text-sm text-gray-600">{step.time}</p>
                    </div>
                  </div>
                  {morningCompleted.includes(step.id) && (
                    <Badge className="bg-green-100 text-green-700">
                      +0.5 points
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="night">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-6 h-6 text-indigo-500" />
                Night Routine
              </CardTitle>
              <CardDescription>
                Wind down with your evening skincare ritual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nightRoutine.map((step) => (
                <div key={step.id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={nightCompleted.includes(step.id)}
                      onCheckedChange={() => handleStepComplete(step.id, true)}
                    />
                    <div>
                      <p className="font-medium">{step.step}</p>
                      <p className="text-sm text-gray-600">{step.time}</p>
                    </div>
                  </div>
                  {nightCompleted.includes(step.id) && (
                    <Badge className="bg-green-100 text-green-700">
                      +0.5 points
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-purple-500" />
                Progress Tracking
              </CardTitle>
              <CardDescription>
                Upload daily photos to track your skin's journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-purple-50">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Today's Photo</h3>
                <p className="text-gray-600 mb-4">Take a photo of your skin to track progress</p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Take Photo
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">AI Analysis Coming Soon</h4>
                <p className="text-sm text-gray-600">
                  After 7 weeks of consistent photo uploads, our AI will analyze your progress and suggest routine adjustments.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoutineTracker;
