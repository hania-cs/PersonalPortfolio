import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/hania-cs", username: "@hania-cs" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hania-seif/", username: "Hania Seifeldeen" },
  { icon: Mail, label: "Email", href: "mailto:haniacs05@gmail.com", username: "haniacs05@gmail.com" },
];

export const ContactWindow = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSending(false);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-2">Get in Touch</h2>
        <p className="text-sm text-muted-foreground">
          Have a project in mind or just want to chat? Drop me a message!
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <link.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">{link.label}</p>
              <p className="text-xs text-muted-foreground">{link.username}</p>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-secondary/30 border-glass-border focus:border-primary"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-secondary/30 border-glass-border focus:border-primary"
          />
        </div>
        <Textarea
          placeholder="Your message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
          className="bg-secondary/30 border-glass-border focus:border-primary resize-none"
        />
        <Button
          type="submit"
          disabled={isSending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          mailto="haniacs05@gmail.com"
        >
          {isSending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2"
              />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
};
