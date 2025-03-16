
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export function Logo({ className, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/eb49ff68-c05d-431d-a339-0d6eec28e5d9.png" 
        alt="EduPulse Logo" 
        className="w-10 h-10 md:w-12 md:h-12" 
      />
      <span className={cn("font-bold text-xl md:text-2xl hero-gradient", textClassName)}>
        EduPulse
      </span>
    </div>
  );
}
