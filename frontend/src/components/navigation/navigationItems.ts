import { 
  Scale, LayoutDashboard, Users, Briefcase, Calendar,
  FileText, Megaphone, Building2
} from "lucide-react";
import { createPageUrl } from "@/utils";

export const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
  { title: "Cases", url: createPageUrl("Cases"), icon: Briefcase },
  { title: "Clients", url: createPageUrl("Clients"), icon: Users },
  { title: "Sessions", url: createPageUrl("Sessions"), icon: Calendar },
  { title: "Services", url: createPageUrl("Services"), icon: FileText },
  { title: "Procedures", url: createPageUrl("Procedures"), icon: FileText },
  { title: "Marketing", url: createPageUrl("Ads"), icon: Megaphone },
];

export const lawFirmItems = [
  { title: "About Us", url: createPageUrl("About"), icon: Building2 },
  { title: "Our Services", url: createPageUrl("LawFirmServices"), icon: Scale },
];
