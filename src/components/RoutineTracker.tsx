import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Gift, Camera, Calendar, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RoutineTracker = () => {
  const [morningCompleted, setMorningCompleted] = useState<string[]>([]);
  const [nightCompleted, setNightCompleted] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [dailyPointAwarded, setDailyPointAwarded] = useState(false);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample routines - you can modify these as needed
  const morningRoutine = [
    { id: '1', step: 'Cleanser', time: '1 minute' },
    { id: '2', step: 'Toner', time: '30 seconds' },
    { id: '3', step: 'Serum', time: '1 minute' },
    { id: '4', step: 'Moisturizer', time: '1 minute' },
    { id: '5', step: 'Sunscreen', time: '1 minute' }
  ];

  const nightRoutine = [
    { id: '6', step: 'Makeup Remover', time: '1 minute' },
    { id: '7', step: 'Cleanser', time: '1 minute' },
    { id: '8', step: 'Toner', time: '30 seconds' },
    { id: '9', step: 'Treatment', time: '1 minute' },
    { id: '10', step: 'Night Cream', time: '1 minute' }
  ];

  const handleStepComplete = (stepId: string, isNight = false) => {
    if (isNight) {
      const newCompleted = nightCompleted.includes(stepId)
        ? nightCompleted.filter(id => id !== stepId)
        : [...nightCompleted, stepId];
      setNightCompleted(newCompleted);
    } else {
      const newCompleted = morningCompleted.includes(stepId)
        ? morningCompleted.filter(id => id !== stepId)
        : [...morningCompleted, stepId];
      setMorningCompleted(newCompleted);
    }

    // Check if both routines are complete
    const isMorningComplete = morningRoutine.every(step => 
      isNight ? morningCompleted.includes(step.id) : [...morningCompleted, stepId].includes(step.id)
    );
    const isNightComplete = nightRoutine.every(step => 
      isNight ? [...nightCompleted, stepId].includes(step.id) : nightCompleted.includes(step.id)
    );

    if (isMorningComplete && isNightComplete && !dailyPointAwarded) {
      setPoints(prev => prev + 1);
      setDailyPointAwarded(true);
      toast({
        title: "Daily Goal Achieved!",
        description: "You've completed your daily routine and earned a point!",
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate('/');
  };

  const progressToReward = Math.min((points / 30) * 100, 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Your Daily Routine
        </h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

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
      </Tabs>
    </div>
  );
};

export default RoutineTracker;