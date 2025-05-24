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
        return "Hello! I'm here to help assess your skin condition and create a personalized treatment plan. Let's start with your skin's sebum production and hydration levels. Throughout the day, do you notice: excessive oil production (especially in the T-zone), persistent dryness or tightness, combination of both in different areas, or generally balanced skin? Also, how does your skin feel after cleansing?";
      
      case 'breakout_freq':
        return "Thank you for those details about your skin's characteristics. Now, let's discuss any inflammatory conditions you might experience. How often do you notice active lesions or breakouts? Do they present as papules (small red bumps), pustules (whiteheads), or cystic acne? And are they concentrated in specific areas of your face? Understanding the pattern and type will help us determine the best approach for your skin.";
      
      case 'concerns':
        return "You're providing valuable information for your skin assessment. Beyond what we've discussed, I'd like to know about any other dermatological concerns you're experiencing. This could include: inflammatory conditions (rosacea, eczema), hyperpigmentation (post-inflammatory or melasma), signs of photoaging, keratosis pilaris, or any other skin conditions you've noticed. Please describe any symptoms or changes you've observed.";
      
      case 'notes':
        return "Before we finalize your assessment, I'd like to gather some additional clinical context. Could you tell me about: any skin allergies or sensitivities you've experienced, your skin's reaction to sun exposure (does it burn easily?), any family history of skin conditions, and any treatments or medications you've previously tried? This information will help us create a more comprehensive treatment approach.";
      
      default:
        return "Based on your detailed assessment, I believe we have enough information to create your personalized skincare protocol. Type 'done' when you're ready to receive your recommendations.";
    }
  };

  const getInteractiveResponse = (field: keyof Profile, value: any): string => {
    switch (field) {
      case 'skin_type': {
        const responses = {
          oily: "I understand you're experiencing excess sebum production. This can be influenced by various factors including hormones and genetics. A few clinical questions: Do you notice more oil production during certain times of your menstrual cycle? Is the oiliness accompanied by enlarged or congested pores? And how does your skin respond to mattifying products - does it sometimes overcompensate with even more oil production?",
          
          dry: "I see you're dealing with reduced sebum production and possibly compromised barrier function. Let's assess this further: Do you experience any scaling or flaking? Is there any associated redness or irritation? And importantly, does the dryness feel superficial, or does your skin feel tight and dehydrated at a deeper level? Also, have you noticed if certain environmental factors exacerbate the condition?",
          
          combination: "Combination skin presents unique treatment challenges. Let's map your skin's behavior: Could you specify which areas experience excess oil (typically T-zone) versus dryness? Do these patterns shift with seasonal changes? And have you noticed if treating one condition (like oiliness) tends to exacerbate the other (dryness)? This will help us develop a targeted zone-specific treatment approach.",
          
          normal: "While your skin appears well-balanced, it's still important to maintain its homeostasis. Let's discuss some preventive aspects: Have you noticed any seasonal variations in your skin's behavior? How does your skin respond to different environmental stressors (pollution, climate changes)? And what's your skin's typical recovery time after exposure to potential irritants?"
        };
        
        const skinType = value.toLowerCase();
        return responses[skinType as keyof typeof responses] || 
               "Let's discuss your skin's inflammatory response patterns. How frequently do you experience breakouts or other forms of inflammation?";
      }

      case 'breakout_freq': {
        const responses = {
          never: "It's excellent that you don't experience inflammatory acne. However, let's discuss prevention: Have you always maintained clear skin, or did you previously experience breakouts? What preventive measures do you currently employ? Also, do you notice any microcomedones (small flesh-colored bumps) even if they don't develop into active breakouts?",
          
          rarely: "Occasional breakouts can often be traced to specific triggers. Let's identify yours: When breakouts do occur, what type do you typically experience (comedonal, inflammatory, hormonal)? Have you noticed any correlation with stress levels, dietary changes, or specific skincare products? Also, how long do the lesions typically take to resolve?",
          
          monthly: "The cyclical nature of your breakouts suggests a hormonal component. Let's analyze the pattern: Do they typically appear in the same areas (like jawline or chin)? Are they more inflammatory or comedonal in nature? And do you notice any other cyclical skin changes, such as increased oil production or sensitivity during these times?",
          
          weekly: "Frequent breakouts require a systematic treatment approach. To develop this, I need to understand: What's the primary type of lesions you experience (papules, pustules, or cysts)? Are they concentrated in specific areas? Have you noticed any correlation with external factors like diet, stress, or specific products? Also, how long does each breakout typically last?",
          
          daily: "Persistent acne can significantly impact skin health. Let's do a detailed assessment: Could you describe the predominant type of lesions? Are you experiencing any post-inflammatory hyperpigmentation? Have you noticed any scarring (ice pick, boxcar, or rolling scars)? Understanding these aspects will help us develop both an active treatment plan and a long-term maintenance strategy."
        };
        
        const freq = value.toLowerCase().match(/(never|rarely|monthly|weekly|daily)/)?.[0];
        return responses[freq as keyof typeof responses] || 
               "Now, let's discuss any other dermatological concerns you may have. This could include texture irregularities, pigmentation issues, or signs of photoaging.";
      }

      case 'concerns': {
        const concernResponses = {
          sensitivity: "Let's assess your skin's reactivity in detail. When you experience sensitivity, do you notice: immediate or delayed reactions? Any specific triggers (fragrances, certain ingredients, environmental factors)? Does the reaction present as redness, burning, itching, or all of these? Also, how long does it typically take for your skin to return to baseline after a reaction?",
          
          hyperpigmentation: "Understanding the nature of your hyperpigmentation will help determine the best treatment approach. Is it post-inflammatory (following breakouts or injuries), melasma (hormone-related), or sun-induced? How long have you had these areas of pigmentation? Have you noticed any changes in their appearance over time? Also, have you previously tried any brightening treatments?",
          
          aging: "Let's assess the specific signs of photoaging you're experiencing. Are you noticing fine lines, dynamic wrinkles, or deeper set lines? Is there any loss of firmness or elasticity? Have you observed any changes in skin texture or tone? Also, are these changes generalized or more pronounced in certain areas? Understanding these details will help us prioritize treatment strategies.",
          
          acne: "Let's do a comprehensive acne assessment. Could you describe: the primary type of lesions (comedones, papules, pustules, nodules)? Their typical location and pattern of spread? Any triggers you've identified? Also, are you experiencing any post-inflammatory effects (redness or pigmentation)? This will help us develop a targeted treatment protocol.",
          
          redness: "Facial redness can have various underlying causes. Does the redness: come and go or remain persistent? Worsen with specific triggers (heat, stress, certain foods)? Accompany other symptoms like flushing or visible blood vessels? Also, have you noticed any papules or pustules in the red areas? This information will help determine if we're dealing with rosacea, sensitivity, or another condition.",
          
          texture: "Let's analyze your skin's texture concerns. Are you experiencing: rough patches, enlarged pores, small bumps (possibly keratosis pilaris), or uneven surface? Are these issues consistent or do they vary with your skin's hydration levels? Also, have you noticed any correlation with your skincare routine or environmental factors?"
        };

        const concerns = value as string[];
        let response = "Thank you for sharing these concerns. Let's examine them in more detail. ";
        
        const matchedConcern = concerns.find(c => 
          Object.keys(concernResponses).some(key => c.includes(key))
        );

        if (matchedConcern) {
          for (const [key, question] of Object.entries(concernResponses)) {
            if (matchedConcern.includes(key)) {
              response += question;
              break;
            }
          }
        } else {
          response += "Could you provide more specific details about how these concerns manifest? Understanding the precise symptoms and patterns will help us develop the most effective treatment protocol.";
        }

        return response + "\n\nPlease share any additional clinical history or observations, or type 'done' if you've provided all relevant information.";
      }

      case 'notes':
        return "Thank you for providing these additional details. This information will be valuable in customizing your treatment protocol. Type 'done' when you're ready to receive your personalized skincare recommendations.";

      default:
        return "Based on our comprehensive assessment, I believe we have sufficient information to develop your personalized skincare protocol. Type 'done' to proceed with your recommendations.";
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
    
    if (userInputLower === 'end' || userInputLower === 'done') {
      if (nextField) {
        return "To provide you with the most accurate treatment recommendations, I still need some additional information. " + 
               getQuestionForField(nextField);
      }
      
      onComplete(profile);
      return "Thank you for providing such detailed information about your skin condition. Based on our comprehensive assessment, I've developed a personalized treatment protocol that addresses your specific concerns and skin characteristics. Let's proceed to your customized recommendations.";
    }

    try {
      switch (nextField) {
        case 'skin_type': {
          const skinTypes = ['oily', 'dry', 'combination', 'normal'];
          if (skinTypes.some(type => userInputLower.includes(type))) {
            const skinType = skinTypes.find(type => userInputLower.includes(type)) || '';
            await updateProfileField('skin_type', skinType);
            return getInteractiveResponse('skin_type', skinType);
          }
          return "I want to make sure I understand your skin type correctly. Could you specify if it's oily, dry, combination, or normal? This will help me provide the most accurate recommendations.";
        }

        case 'breakout_freq': {
          const freqTerms = ['never', 'monthly', 'weekly', 'daily', 'rarely'];
          if (freqTerms.some(freq => userInputLower.includes(freq))) {
            const freq = freqTerms.find(f => userInputLower.includes(f)) || '';
            await updateProfileField('breakout_freq', freq);
            return getInteractiveResponse('breakout_freq', freq);
          }
          return "To better understand your breakout patterns, could you tell me if you experience them never, rarely, monthly, weekly, or daily? This will help us target your skincare routine appropriately.";
        }

        case 'concerns': {
          const concerns = userInput
            .toLowerCase()
            .split(/[,.]/)
            .map(s => s.trim())
            .filter(s => s.length > 0);
          
          await updateProfileField('concerns', concerns);
          return getInteractiveResponse('concerns', concerns);
        }

        case 'notes': {
          await updateProfileField('notes', userInput);
          return getInteractiveResponse('notes', userInput);
        }

        default:
          return "You've provided great insights about your skin! Type 'done' when you're ready to proceed.";
      }
    } catch (error) {
      console.error('Error processing response:', error);
      return "I encountered an error saving your response. Could you please try again?";
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
      setMessages(prev => [...prev, { role: "assistant" as const, content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: "assistant" as const, 
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