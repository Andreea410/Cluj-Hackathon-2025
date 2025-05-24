import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, TestTube } from 'lucide-react';

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

interface FlockXMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface FlockXResponse {
  response: string;
}

const FLOCKX_API_URL = import.meta.env.VITE_FLOCKX_API_URL;
const FLX_API_KEY = import.meta.env.VITE_FLX_API_KEY;
const FLOCKX_TWIN_ID = import.meta.env.VITE_FLOCKX_TWIN_ID;

const AIProfileBuilder = ({ onComplete }: AIProfileBuilderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [testResult, setTestResult] = useState<string>('');

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

  const callFlockXAPI = async (messages: Message[]) => {
    try {
      const response = await fetch(`${FLOCKX_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FLX_API_KEY}`,
        },
        body: JSON.stringify({
          twin_id: FLOCKX_TWIN_ID,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })) as FlockXMessage[]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from FlockX API');
      }

      const data = await response.json() as FlockXResponse;
      return data.response;
    } catch (error) {
      console.error('Error calling FlockX API:', error);
      throw error;
    }
  };

  const processAIResponse = async (userInput: string) => {
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

    // Add the user's message to the conversation
    const userMessage: Message = { role: "user", content: userInput };
    const updatedMessages: Message[] = [...messages, userMessage];
    
    try {
      // Get response from FlockX API
      const aiResponse = await callFlockXAPI(updatedMessages);
      
      // Update the profile based on the conversation
      if (!profile.skin_type && userInputLower.match(/oily|dry|combination|normal/)) {
        setProfile(prev => ({ ...prev, skin_type: userInputLower }));
      } else if (!profile.breakout_freq && userInputLower.match(/never|monthly|weekly|daily/)) {
        setProfile(prev => ({ ...prev, breakout_freq: userInputLower }));
      } else if (!profile.concerns) {
        const concerns = userInput
          .toLowerCase()
          .split(/[,.]/)
          .map(s => s.trim())
          .filter(s => s.length > 0);
        setProfile(prev => ({ ...prev, concerns }));
      } else {
        setProfile(prev => ({ ...prev, notes: userInput }));
      }

      return aiResponse;
    } catch (error) {
      console.error('Error processing AI response:', error);
      return "I'm sorry, I encountered an error. Could you please try again?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user" as const, content: input.trim() };
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

  const testAPIConnection = async () => {
    try {
      setTestResult('Testing API connection...');
      const testMessages: Message[] = [
        {
          role: "system",
          content: "You are a dermatology-trained AI. Please provide a brief response."
        },
        {
          role: "user",
          content: "i have very sensitive skin, what products do you recommend"
        }
      ];
      
      console.log('API URL:', FLOCKX_API_URL);
      console.log('Twin ID:', FLOCKX_TWIN_ID);
      
      const response = await callFlockXAPI(testMessages);
      setTestResult(`API Test Successful! Response: ${response}`);
    } catch (error) {
      console.error('Full error:', error);
      setTestResult(`API Test Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="mb-4">
            <Button
              onClick={testAPIConnection}
              className="bg-blue-600 hover:bg-blue-700 mb-2"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Test API Connection
            </Button>
            {testResult && (
              <div className="text-sm p-2 bg-gray-100 rounded">
                {testResult}
              </div>
            )}
          </div>
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