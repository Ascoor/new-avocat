import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin, Twitter, Github, Facebook } from "lucide-react";

const socialLinks = [
  { href: "https://www.linkedin.com/company/avocat", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/avocat", icon: Twitter, label: "Twitter" },
  { href: "https://github.com/avocat", icon: Github, label: "GitHub" },
  { href: "https://facebook.com/avocat", icon: Facebook, label: "Facebook" },
];

export function SocialGroup() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/20"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
