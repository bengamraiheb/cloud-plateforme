
import { useState } from "react";
import { Bot, SendHorizontal, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! How can I help you with CloudHaven today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you with that! Please check our documentation for more details.",
        "Let me look into that for you. In the meantime, you might want to check the dashboard for usage statistics.",
        "That's a great question about CloudHaven. Our system is designed to make cloud management simple and efficient.",
        "Would you like me to provide more information about our compute resources or storage options?",
        "I'm here to assist with any questions about your cloud infrastructure.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderChatInterface = () => (
    <Card className={`shadow-lg border-white/10 backdrop-blur-sm bg-card/70 ${isExpanded ? "fixed inset-4 z-50" : "w-full h-full"}`}>
      <CardHeader className="p-4 flex flex-row items-center justify-between border-b bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </Avatar>
          <h3 className="font-medium">CloudHaven Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleExpand} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className={isExpanded ? "h-[calc(100vh-12rem)]" : "h-80"}>
        <CardContent className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] animate-in fade-in slide-in-from-bottom-5 duration-300 ${
                  message.isBot
                    ? "bg-muted text-foreground border border-border"
                    : "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-3 border-t bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background/50 border-white/20"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Mobile version uses Sheet for better mobile experience
  return (
    <>
      {/* Desktop version */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        {isOpen ? (
          renderChatInterface()
        ) : (
          <Button
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 animate-pulse-slow"
            onClick={() => setIsOpen(true)}
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Mobile version */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 animate-pulse-slow"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-0 border-t border-white/10 bg-transparent">
            {renderChatInterface()}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
