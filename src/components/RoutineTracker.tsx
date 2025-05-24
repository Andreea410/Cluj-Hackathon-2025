
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
  setPoints: (value: number | ((prevPoints: number) => number)) => void;
  skinAnalysis: {
    skinType: string;
    concerns: string[];
    sensitivity: string;
  };
  userProfile: any;
}

const RoutineTracker = ({ points, setPoints, skinAnalysis, userProfile }: RoutineTrackerProps) => {
  const [morningCompleted, setMorningCompleted] = useState<number[]>([]);
  const [nightCompleted, setNightCompleted] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [dailyPointAwarded, setDailyPointAwarded] = useState(false);

  const morningRoutine = [
    { id: 1, step: 'Gentle Cleanser', time: '30 seconds' },
    { id: 2, step: 'Vitamin C Serum', time: '1 minute' },
    { id: 3, step: 'Moisturizer', time: '30 seconds' },
    { id: 4, step: 'SPF 30 Sunscreen', time: '30 seconds' }
  ];

  const nightRoutine = [
    { id: 5, step: 'Gentle Cleanser', time: '30 seconds' },
    { id: 6, step: 'Salicylic Acid Treatment', time: '1 minute' },
    { id: 7, step: 'Hydrating Serum', time: '1 minute' },
    { id: 8, step: 'Moisturizer', time: '30 seconds' }
  ];

  useEffect(() => {
    const isMorningComplete = morningRoutine.every(step => morningCompleted.includes(step.id));
    const isNightComplete = nightRoutine.every(step => nightCompleted.includes(step.id));
    
    if (isMorningComplete && isNightComplete && !dailyPointAwarded) {
      setPoints(prev => prev + 1);
      setDailyPointAwarded(true);
    }
  }, [morningCompleted, nightCompleted]);

  const handleStepComplete = (stepId, isNight = false) => {
    if (isNight) {
      if (!nightCompleted.includes(stepId)) {
        setNightCompleted(prev => [...prev, stepId]);
      }
    } else {
      if (!morningCompleted.includes(stepId)) {
        setMorningCompleted(prev => [...prev, stepId]);
      }
    }
  };

  useEffect(() => {
    if (points >= 30 && !showReward) {
      setShowReward(true);
    }
  }, [points, showReward]);

  const progressToReward = Math.min((points / 30) * 100, 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Daily Routine
        </h1>
        <p className="text-gray-600 mb-6">
          Complete both morning and night routines to earn 1 point per day!
        </p>
        
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-purple-600" />
                <span className="font-semibold">Progress to 10% Discount</span>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {points} / 30 points
              </Badge>
            </div>
            <Progress value={progressToReward} className="mb-2" />
            <p className="text-sm text-gray-600">
              {points >= 30 ? '🎉 Congratulations! You earned a 10% discount!' : `${30 - points} more days until your reward`}
            </p>
          </CardContent>
        </Card>

        {showReward && (
          <Card className="mb-8 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Monthly Goal Achieved!</h3>
              <p className="text-yellow-700 mb-4">You've earned a 10% discount!</p>
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
                  Upload Photo
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">AI Analysis Coming Soon</h4>
                <p className="text-sm text-gray-600">
                  After 7 days of consistent photo uploads, our AI will analyze your progress and suggest routine adjustments.
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