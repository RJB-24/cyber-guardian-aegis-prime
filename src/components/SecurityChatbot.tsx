
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Brain, Shield, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  confidence?: number;
  aiModel?: string;
  actionable?: boolean;
}

export const SecurityChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m AEGIS AI Security Assistant. I can help you analyze threats, interpret security data, and suggest countermeasures. What would you like to know about your security posture?',
      timestamp: new Date(),
      confidence: 100,
      aiModel: 'AEGIS Assistant v2.0'
    };
    
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const aiResponses = {
    threat: [
      "Based on current analysis, I've detected elevated threat activity. The isolation forest model shows anomalous network patterns with 87% confidence. I recommend implementing immediate network segmentation.",
      "Current threat landscape shows APT indicators. My ensemble models predict 94% likelihood of advanced persistent threat. Suggested countermeasures: Enable enhanced monitoring and deploy honeypots.",
      "AI analysis reveals suspicious behavioral patterns. LSTM networks detected temporal anomalies suggesting insider threat activity. Recommendation: Implement zero-trust architecture immediately."
    ],
    status: [
      "System health is optimal at 99.2%. All AI models are functioning normally. Isolation Forest: 96% accuracy, Random Forest: 94% accuracy, LSTM: 91% accuracy. No immediate action required.",
      "Current security posture: STRONG. 42 threats prevented in the last 24 hours, average response time 2.3 seconds. AI confidence levels are above 90% across all detection models.",
      "Real-time monitoring active. 0 critical threats, 2 medium-level anomalies contained. All automated countermeasures deployed successfully. Network topology secure."
    ],
    analysis: [
      "Deep learning analysis indicates sophisticated attack vectors targeting authentication systems. Transformer models identified patterns consistent with zero-day exploits. Confidence: 91%.",
      "Behavioral analysis shows unusual data access patterns during off-hours. Random Forest classifier flagged 15 suspicious activities. Recommend immediate user behavior investigation.",
      "Network traffic analysis reveals potential data exfiltration attempts. Ensemble AI models detected encrypted command & control communications. Immediate containment advised."
    ],
    recommendation: [
      "Based on current threat intelligence, I recommend: 1) Implement AI-driven network segmentation, 2) Deploy predictive threat hunting, 3) Enable real-time behavioral analysis. Estimated risk reduction: 78%.",
      "Suggested security enhancements: Enable quantum-resistant encryption, implement zero-trust network access, deploy advanced endpoint detection. These measures will improve your security score by 23%.",
      "Recommended immediate actions: Patch 3 critical vulnerabilities identified by CVE analysis, update 7 security policies based on AI recommendations, enable 24/7 threat hunting. Priority: HIGH."
    ]
  };

  const getAIResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    let responseCategory = 'status';
    let actionable = false;
    
    if (input.includes('threat') || input.includes('attack') || input.includes('hack')) {
      responseCategory = 'threat';
      actionable = true;
    } else if (input.includes('analyz') || input.includes('detect') || input.includes('scan')) {
      responseCategory = 'analysis';
      actionable = true;
    } else if (input.includes('recommend') || input.includes('suggest') || input.includes('help') || input.includes('what should')) {
      responseCategory = 'recommendation';
      actionable = true;
    }
    
    const responses = aiResponses[responseCategory as keyof typeof aiResponses];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: randomResponse,
      timestamp: new Date(),
      confidence: Math.floor(Math.random() * 10) + 90,
      aiModel: ['GPT-4 Security', 'AEGIS Neural Network', 'Ensemble AI', 'Deep Learning Classifier'][Math.floor(Math.random() * 4)],
      actionable
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's my current security status?",
    "Are there any active threats?",
    "What threats should I worry about?",
    "How can I improve my security?",
    "Analyze the latest threat patterns"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <Card className="glass-effect border-primary/20 h-96">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            AEGIS Security AI Assistant
          </span>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            AI POWERED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-muted/20 text-foreground mr-4'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
                    {message.type === 'user' && <User className="h-4 w-4 text-primary-foreground mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <div className="text-sm">{message.content}</div>
                      {message.type === 'ai' && (
                        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                          <div className="flex items-center space-x-2">
                            {message.confidence && (
                              <span>Confidence: {message.confidence}%</span>
                            )}
                            {message.aiModel && (
                              <span>Model: {message.aiModel}</span>
                            )}
                          </div>
                          {message.actionable && (
                            <Badge variant="outline" className="h-4 text-xs">
                              Actionable
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted/20 p-3 rounded-lg mr-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-primary animate-pulse" />
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="my-3">
            <div className="text-xs text-muted-foreground mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {quickQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs h-6"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about security threats, analysis, or recommendations..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
