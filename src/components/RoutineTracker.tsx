import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Gift, Camera, Calendar, Loader2, LogOut } from 'lucide-react';
import { routineService } from '@/services/routine.service';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

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
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    const loadRoutineProgress = async () => {
      if (!user?.id) return;
      
      try {
        const stats = await routineService.getRoutineStats(user.id);
        setPoints(stats.totalPoints || 0);
        
        // Load today's progress
        const today = new Date().toISOString().split('T')[0];
        const todayLog = stats.logs?.find(log => log.date.startsWith(today));
        
        if (todayLog) {
          setMorningCompleted(todayLog.steps.filter(id => id <= 4));
          setNightCompleted(todayLog.steps.filter(id => id > 4));
          setDailyPointAwarded(todayLog.points > 0);
        }
      } catch (error) {
        console.error('Failed to load routine progress:', error);
        toast({
          title: "Error",
          description: "Failed to load your routine progress. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadRoutineProgress();
  }, [user?.id]);

  const handleStepComplete = async (stepId: number, isNight = false) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const steps = isNight ? [...nightCompleted, stepId] : [...morningCompleted, stepId];
      
      await routineService.logRoutineProgress(user.id, steps, isNight);
      
      if (isNight) {
        setNightCompleted(steps);
      } else {
        setMorningCompleted(steps);
      }

      // Check if both routines are complete
      const isMorningComplete = morningRoutine.every(step => steps.includes(step.id));
      const isNightComplete = nightRoutine.every(step => steps.includes(step.id));
      
      if (isMorningComplete && isNightComplete && !dailyPointAwarded) {
        setPoints(prev => prev + 1);
        setDailyPointAwarded(true);
        toast({
          title: "Daily Goal Achieved!",
          description: "You've completed your daily routine and earned a point!",
        });
      }
    } catch (error) {
      console.error('Failed to update routine progress:', error);
      toast({
        title: "Error",
        description: "Failed to update your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.id || !event.target.files?.length) return;

    try {
      setLoading(true);
      const photo = event.target.files[0];
      await routineService.uploadProgressPhoto(user.id, photo);
      
      toast({
        title: "Success",
        description: "Progress photo uploaded successfully!",
      });
    } catch (error) {
      console.error('Failed to upload photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload your progress photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (points >= 30 && !showReward) {
      setShowReward(true);
    }
  }, [points, showReward]);

  const progressToReward = Math.min((points / 30) * 100, 100);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={loading}
                />
                <label htmlFor="photo-upload">
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload Photo'
                    )}
                  </Button>
                </label>
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