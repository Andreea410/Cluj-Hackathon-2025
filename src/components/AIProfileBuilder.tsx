import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

const AIProfileBuilder = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const profile = {
    skin_type: "Dry",
    breakout_frequency: "Rarely",
    skin_concerns: "Wrinkles and dryness"
  };

  const handleSubmitProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://mariomaxim.app.n8n.cloud/webhook/register-skin-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
      });

      const result = await response.json();
      setMessages(prev => [...prev, result.message]);
    } catch (error) {
      console.error("Error sending profile to agent:", error);
      setMessages(prev => [...prev, "Sorry, something went wrong while contacting the AI agent."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <ScrollArea className="h-[300px] pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="bg-gray-100 text-gray-800 p-4 rounded-lg">
                  <ReactMarkdown>{msg}</ReactMarkdown>
                </div>
              ))}
              {loading && (
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <Button
            onClick={handleSubmitProfile}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 w-full"
          >
            Get Skincare Routine
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProfileBuilder;