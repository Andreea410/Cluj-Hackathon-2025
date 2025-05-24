import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Profile {
  skin_type: string | null;
  breakout_freq: string | null;
  concerns: string[] | null;
  notes: string | null;
  auth_user_id: string;
}

interface AIProfileBuilderProps {
  onComplete: (profile: Profile) => void;
  auth_user_id: string;
}

const AIProfileBuilder = ({ onComplete, auth_user_id }: AIProfileBuilderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    skin_type: null,
    breakout_freq: null,
    concerns: null,
    notes: null,
    auth_user_id
  });

  useEffect(() => {
    const loadExistingProfile = async () => {
      try {
        const { data: profileData, error } = await supabase
          .from("user_profiles")
          .select("skin_type, breakout_freq, concerns, notes")
          .eq("auth_user_id", auth_user_id)
          .single();

        if (error) throw error;

        if (profileData) {
          setProfile(prev => ({ ...prev, ...profileData }));
        }

        // Initialize chat with appropriate starting question
        const nextField = getNextField(profileData || profile);
        const initialQuestion = getQuestionForField(nextField);

        setMessages([{
          role: "system",
          content: `
You are a dermatology-trained AI whose sole job is to build the user's profile 
by asking questions. The profile has these fields:
• skin_type (e.g. "oily", "dry", "combination")
• breakout_freq (e.g. "never", "monthly", "weekly")
• concerns (list of issues, e.g. "sensitivity", "hyperpigmentation")
• notes (any additional user comments)

1. Ask the first unanswered question (in this order: skin type → breakout frequency → concerns).
2. Wait for the user's reply, then store that answer.
3. Repeat step 1 until all fields are filled.
4. Once the user types "end" or "done", output a JSON object with all four fields.
   Don't do anything else.

Respond conversationally, ask follow-ups to clarify if needed.
          `.trim(),
        }, {
          role: "assistant",
          content: initialQuestion
        }]);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadExistingProfile();
  }, [auth_user_id]);

  const getNextField = (currentProfile: Partial<Profile>): keyof Profile | null => {
    if (!currentProfile.skin_type) return 'skin_type';
    if (!currentProfile.breakout_freq) return 'breakout_freq';
    if (!currentProfile.concerns) return 'concerns';
    if (!currentProfile.notes) return 'notes';
    return null;
  };

  const getQuestionForField = (field: keyof Profile | null): string => {
    switch (field) {
      case 'skin_type':
        return "Hi! I'm here to help create your personalized skincare profile. Let's start with your skin type. Would you say your skin is oily, dry, combination, or normal?";
      case 'breakout_freq':
        return "How often do you experience breakouts? (Never, monthly, weekly, or daily?)";
      case 'concerns':
        return "What are your main skin concerns? For example: sensitivity, hyperpigmentation, aging, acne, etc. You can list multiple concerns.";
      case 'notes':
        return "Would you like to add any additional notes about your skin? If not, just type 'done'.";
      default:
        return "Perfect! Type 'done' to complete your profile.";
    }
  };

  const updateProfileField = async (field: keyof Profile, value: any) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .upsert({ 
          auth_user_id,
          [field]: value 
        }, { 
          onConflict: 'auth_user_id'
        });

      if (error) throw error;

      setProfile(prev => ({ ...prev, [field]: value }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      throw error;
    }
  };

  const processAIResponse = async (userInput: string) => {
    const userInputLower = userInput.toLowerCase();
    const nextField = getNextField(profile);
    
    // Check if user wants to end the conversation
    if (userInputLower === 'end' || userInputLower === 'done') {
      if (nextField) {
        return "We still need some information to complete your profile. " + 
               getQuestionForField(nextField);
      }
      
      onComplete(profile);
      return "Great! I've completed your profile. You'll now be directed to your personalized routine.";
    }

    // Process the response based on what information we're missing
    try {
      switch (nextField) {
        case 'skin_type': {
          const skinTypes = ['oily', 'dry', 'combination', 'normal'];
          if (skinTypes.some(type => userInputLower.includes(type))) {
            await updateProfileField('skin_type', userInputLower);
            return getQuestionForField('breakout_freq');
          }
          return "I'm not quite sure about your skin type. Could you specify if it's oily, dry, combination, or normal?";
        }

        case 'breakout_freq': {
          const freqTerms = ['never', 'monthly', 'weekly', 'daily'];
          if (freqTerms.some(freq => userInputLower.includes(freq))) {
            await updateProfileField('breakout_freq', userInputLower);
            return getQuestionForField('concerns');
          }
          return "Could you clarify how often you experience breakouts? (Never, monthly, weekly, or daily?)";
        }

        case 'concerns': {
          const concerns = userInput
            .toLowerCase()
            .split(/[,.]/)
            .map(s => s.trim())
            .filter(s => s.length > 0);
          
          await updateProfileField('concerns', concerns);
          return getQuestionForField('notes');
        }

        case 'notes': {
          await updateProfileField('notes', userInput);
          return "Thanks for the additional information! Type 'done' when you're ready to complete your profile.";
        }

        default:
          return "Perfect! Type 'done' to complete your profile.";
      }
    } catch (error) {
      console.error('Error processing response:', error);
      return "I encountered an error saving your response. Could you please try again?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const aiResponse = await processAIResponse(input.trim());
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error. Could you please try again?" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <ScrollArea className="h-[400px] pr-4 mb-4">
            <div className="space-y-4">
              {messages.slice(1).map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              disabled={loading}
              className="border-purple-200 focus:border-purple-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProfileBuilder; 