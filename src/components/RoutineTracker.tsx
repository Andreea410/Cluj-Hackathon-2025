import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Gift, Camera, Calendar, Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface RoutineTrackerProps {
  points?: number;
  setPoints?: (value: number | ((prevPoints: number) => number)) => void;
  skinAnalysis: {
    skinType: string;
    concerns: string[];
    sensitivity: string;
  };
  userProfile: any;
}

const RoutineTracker = ({ points: propPoints, setPoints: propSetPoints, skinAnalysis, userProfile }: RoutineTrackerProps) => {
  const [internalPoints, setInternalPoints] = useState<number>(0);
  
  const [morningCompleted, setMorningCompleted] = useState<string[]>([]);
  const [nightCompleted, setNightCompleted] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [dailyPointAwarded, setDailyPointAwarded] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [morningRoutine, setMorningRoutine] = useState<any[]>([]);
  const [morningLoading, setMorningLoading] = useState(true);
  const [morningError, setMorningError] = useState<string | null>(null);
  const [nightRoutine, setNightRoutine] = useState<any[]>([]);
  const [nightLoading, setNightLoading] = useState(true);
  const [nightError, setNightError] = useState<string | null>(null);
  
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toDateString();
    const savedPoints = localStorage.getItem('skincare_points');
    const lastCompletedDate = localStorage.getItem('last_completed_date');
    const todayMorning = localStorage.getItem(`morning_completed_${today}`);
    const todayNight = localStorage.getItem(`night_completed_${today}`);
    
    if (savedPoints) {
      const pointsValue = parseInt(savedPoints);
      setInternalPoints(pointsValue);
      if (propSetPoints) {
        propSetPoints(pointsValue);
      }
    }
    
    if (lastCompletedDate === today) {
      setDailyPointAwarded(true);
    }
    
    if (todayMorning) {
      setMorningCompleted(JSON.parse(todayMorning));
    }
    
    if (todayNight) {
      setNightCompleted(JSON.parse(todayNight));
    }
  }, [propSetPoints]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`morning_completed_${today}`, JSON.stringify(morningCompleted));
  }, [morningCompleted]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`night_completed_${today}`, JSON.stringify(nightCompleted));
  }, [nightCompleted]);

  useEffect(() => {
    localStorage.setItem('skincare_points', internalPoints.toString());
    if (propSetPoints) {
      propSetPoints(internalPoints);
    }
  }, [internalPoints, propSetPoints]);

  useEffect(() => {
    const fetchMorningRoutine = async () => {
      if (!user?.id) return;
      setMorningLoading(true);
      setMorningError(null);
      try {
        console.log('Fetching morning routine for user ID:', user?.id);

        const url = `http://localhost:3000/api/users/${user.id}/morning-products`;
        console.log('Making request to:', url);

        const res = await fetch(url);
        console.log('API response status:', res.status);
        
        const text = await res.text();
        console.log('API response text:', text);
        
        let data;
        try {
          data = JSON.parse(text);
          console.log('Parsed response data:', data);
        } catch (jsonErr) {
          console.error('Failed to parse JSON response:', jsonErr);
          setMorningError(`API returned non-JSON response: ${text.substring(0, 300)}`);
          setMorningLoading(false);
          return;
        }

        if (!res.ok) {
          console.error('API request failed:', {
            status: res.status,
            statusText: res.statusText,
            data: data
          });
          if (res.status === 404 || data?.message?.includes('no routine')) {
            setMorningError('Please complete your profile in order to get a routine');
          } else {
            setMorningError(data?.message || 'Failed to fetch morning routine');
          }
          setMorningLoading(false);
          return;
        }

        if (!Array.isArray(data) || data.length === 0) {
          console.log('No products found in response');
          setMorningError('Please complete your profile in order to get a routine');
          setMorningLoading(false);
          return;
        }

        console.log('Setting morning routine with data:', data);
        setMorningRoutine(
          data.map((product: any) => ({
            id: product.id,
            step: product.name,
            time: product.time || '1 minute',
            photo_url: product.photo_url
          }))
        );
      } catch (err: any) {
        console.error('Error in fetchMorningRoutine:', err);
        setMorningError(err.message || 'Failed to load morning routine');
      } finally {
        setMorningLoading(false);
      }
    };
    fetchMorningRoutine();
  }, [user?.id]);

  useEffect(() => {
    const fetchNightRoutine = async () => {
      if (!user?.id) return;
      setNightLoading(true);
      setNightError(null);
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}/night-products`);
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          setNightError(`API returned non-JSON response: ${text.substring(0, 300)}`);
          return;
        }
        if (!res.ok) {
          if (res.status === 404) {
            setNightError('Please complete your profile in order to get a routine');
          } else {
            setNightError(data?.message || 'Failed to fetch night routine');
          }
          return;
        }
        setNightRoutine(
          data.map((product: any) => ({
            id: product.id,
            step: product.name,
            time: product.time || '1 minute',
            photo_url: product.photo_url,
          }))
        );
      } catch (err: any) {
        setNightError(err.message || 'Failed to load night routine');
      } finally {
        setNightLoading(false);
      }
    };
    fetchNightRoutine();
  }, [user?.id]);

  const handleStepComplete = (stepId: string, isNight = false) => {
    if (isNight) {
      const isCompleted = nightCompleted.includes(stepId);
      if (isCompleted) {
        setNightCompleted(prev => prev.filter(id => id !== stepId));
      } else {
        setNightCompleted(prev => [...prev, stepId]);
      }
    } else {
      const isCompleted = morningCompleted.includes(stepId);
      if (isCompleted) {
        setMorningCompleted(prev => prev.filter(id => id !== stepId));
      } else {
        setMorningCompleted(prev => [...prev, stepId]);
      }
    }
  };

  useEffect(() => {
    const isMorningComplete = morningRoutine.length > 0 && morningRoutine.every(step => morningCompleted.includes(step.id));
    const isNightComplete = nightRoutine.length > 0 && nightRoutine.every(step => nightCompleted.includes(step.id));
    
    if (isMorningComplete && isNightComplete && !dailyPointAwarded) {
      const today = new Date().toDateString();
      setInternalPoints(prev => prev + 1);
      setDailyPointAwarded(true);
      localStorage.setItem('last_completed_date', today);
      
      toast({
        title: "Daily Goal Achieved!",
        description: "You've completed your daily routine and earned a point!",
      });
    }
  }, [morningCompleted, nightCompleted, morningRoutine, nightRoutine, dailyPointAwarded, toast]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    if (internalPoints >= 30 && !showReward) {
      setShowReward(true);
    }
  }, [internalPoints, showReward]);

  const progressToReward = Math.min((internalPoints / 30) * 100, 100);

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
              {internalPoints} / 30 points
            </Badge>
          </div>
          <Progress value={progressToReward} className="mb-2" />
          <p className="text-sm text-gray-600">
            {internalPoints >= 30 ? '🎉 Congratulations! You earned a 10% discount!' : `${30 - internalPoints} more days until your reward`}
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
              {morningLoading ? (
                <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>
              ) : morningError ? (
                <div className="text-red-500">{morningError}</div>
              ) : morningRoutine.length === 0 ? (
                <div className="text-gray-500">No morning routine found.</div>
              ) : (
                morningRoutine.map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={morningCompleted.includes(step.id)}
                        onCheckedChange={() => handleStepComplete(step.id)}
                      />
                      <div>
                        <p className="font-medium">{step.step}</p>
                        {step.time && <p className="text-sm text-gray-600">{step.time}</p>}
                      </div>
                    </div>
                  </div>
                ))
              )}
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
              {nightLoading ? (
                <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>
              ) : nightError ? (
                <div className="text-red-500">{nightError}</div>
              ) : nightRoutine.length === 0 ? (
                <div className="text-gray-500">No night routine found.</div>
              ) : (
                nightRoutine.map((step) => (
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
                ))
              )}
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