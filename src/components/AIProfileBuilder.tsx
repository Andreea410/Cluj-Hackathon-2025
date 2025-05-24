import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Profile {
  skin_type: string;
  breakout_freq: string;
  concerns: string[];
  notes: string;
}

interface AIProfileBuilderProps {
  onComplete: (profile: Profile) => void;
}

const AIProfileBuilder = ({ onComplete }: AIProfileBuilderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile>>({});

  useEffect(() => {
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
      content: "Hi! I'm here to help create your personalized skincare profile. Let's start with your skin type. Would you say your skin is oily, dry, combination, or normal?"
    }]);
  }, []);

  const processAIResponse = async (userInput: string) => {
    // This is where you would make the actual API call to your AI service
    // For now, we'll simulate the AI logic
    
    const userInputLower = userInput.toLowerCase();
    
    // Check if user wants to end the conversation
    if (userInputLower === 'end' || userInputLower === 'done') {
      if (!profile.skin_type || !profile.breakout_freq || !profile.concerns) {
        return "We still need some information to complete your profile. " + 
               (!profile.skin_type ? "What's your skin type? " : "") +
               (!profile.breakout_freq ? "How often do you experience breakouts? " : "") +
               (!profile.concerns ? "What are your main skin concerns? " : "");
      }
      
      // Complete the profile and finish
      const finalProfile: Profile = {
        skin_type: profile.skin_type || '',
        breakout_freq: profile.breakout_freq || '',
        concerns: profile.concerns || [],
        notes: profile.notes || ''
      };
      
      onComplete(finalProfile);
      return "Great! I've completed your profile. You'll now be directed to your personalized routine.";
    }

    // Process the response based on what information we're missing
    if (!profile.skin_type) {
      const skinTypes = ['oily', 'dry', 'combination', 'normal'];
      if (skinTypes.some(type => userInputLower.includes(type))) {
        setProfile(prev => ({ ...prev, skin_type: userInputLower }));
        return "Thanks! Now, how often do you experience breakouts? (Never, monthly, weekly, or daily?)";
      }
      return "I'm not quite sure about your skin type. Could you specify if it's oily, dry, combination, or normal?";
    }

    if (!profile.breakout_freq) {
      const freqTerms = ['never', 'monthly', 'weekly', 'daily'];
      if (freqTerms.some(freq => userInputLower.includes(freq))) {
        setProfile(prev => ({ ...prev, breakout_freq: userInputLower }));
        return "Got it! What are your main skin concerns? For example: sensitivity, hyperpigmentation, aging, acne, etc. You can list multiple concerns.";
      }
      return "Could you clarify how often you experience breakouts? (Never, monthly, weekly, or daily?)";
    }

    if (!profile.concerns) {
      const concerns = userInput
        .toLowerCase()
        .split(/[,.]/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      setProfile(prev => ({ ...prev, concerns, notes: '' }));
      return "Perfect! I have all the information needed. You can type 'done' to complete your profile, or add any additional notes about your skin.";
    }

    // If we have all main fields, treat input as notes
    setProfile(prev => ({ ...prev, notes: userInput }));
    return "Thanks for the additional information! Type 'done' when you're ready to complete your profile.";
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