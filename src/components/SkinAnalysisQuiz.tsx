
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const SkinAnalysisQuiz = ({ onComplete }: { onComplete: (analysis: any) => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'skinType',
      question: 'What is your skin type?',
      options: [
        { value: 'oily', label: 'Oily - Shiny, prone to excess oil' },
        { value: 'dry', label: 'Dry - Tight, flaky, or rough' },
        { value: 'combination', label: 'Combination - Oily T-zone, dry cheeks' },
        { value: 'normal', label: 'Normal - Balanced, neither too oily nor dry' },
        { value: 'sensitive', label: 'Sensitive - Easily irritated or reactive' }
      ]
    },
    {
      id: 'breakoutFrequency',
      question: 'How often do you experience breakouts?',
      options: [
        { value: 'never', label: 'Never' },
        { value: 'rarely', label: 'Rarely (a few times a year)' },
        { value: 'occasionally', label: 'Occasionally (monthly)' },
        { value: 'frequently', label: 'Frequently (weekly)' },
        { value: 'constantly', label: 'Constantly (daily)' }
      ]
    },
    {
      id: 'skinConcerns',
      question: 'What are your main skin concerns?',
      options: [
        { value: 'acne', label: 'Acne and blemishes' },
        { value: 'aging', label: 'Fine lines and wrinkles' },
        { value: 'hyperpigmentation', label: 'Dark spots and uneven tone' },
        { value: 'dryness', label: 'Dryness and dehydration' },
        { value: 'sensitivity', label: 'Redness and sensitivity' },
        { value: 'pores', label: 'Large pores' }
      ]
    },
    {
      id: 'currentRoutine',
      question: 'How would you describe your current skincare routine?',
      options: [
        { value: 'none', label: 'No routine - I rarely use skincare products' },
        { value: 'basic', label: 'Basic - Just cleanser and moisturizer' },
        { value: 'moderate', label: 'Moderate - 3-5 products regularly' },
        { value: 'extensive', label: 'Extensive - Many products and steps' }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const saveResponses = async () => {
    if (!user) return;

    try {
      // Save each response to the database
      const responses = Object.entries(answers).map(([questionKey, answer]) => ({
        auth_user_id: user.id,
        question_id: questionKey, // Using the question key as ID for simplicity
        option_id: answer, // Using the answer value as option ID
      }));

      const { error } = await supabase
        .from('user_responses')
        .insert(responses);

      if (error) throw error;

      toast({
        title: "Quiz completed!",
        description: "Your responses have been saved.",
      });
    } catch (error: any) {
      console.error('Error saving responses:', error);
      toast({
        title: "Error",
        description: "Failed to save your responses. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      await saveResponses();
      setLoading(false);
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Skin Analysis Quiz
          </CardTitle>
          <CardDescription className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </CardDescription>
          <Progress value={progress} className="w-full mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-gray-800">
            {currentQuestionData.question}
          </h3>
          
          <RadioGroup 
            value={currentAnswer || ''} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestionData.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-purple-200 hover:bg-purple-50"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!currentAnswer || loading}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              {currentQuestion === questions.length - 1 ? 'Get My Recommendations' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinAnalysisQuiz;
