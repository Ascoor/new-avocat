import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Scale } from "lucide-react";
import { navigationItems, lawFirmItems } from "@/components/navigation/navigationItems";

export default function Sidebar({ language }: { language: string }) {
  const location = useLocation();

  return (
    <ShadSidebar
      className={`border-r border-slate-200 dark:border-slate-800 ${
        language === "ar" ? "border-l border-r-0" : ""
      }`}
      side={language === "ar" ? "right" : "left"}
    >
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {language === "ar" ? "المحامي" : "Avocat"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {language === "ar" ? "نظام إدارة المكتب" : "Legal Practice Management"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {language === "ar" ? "الإدارة" : "Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 transition-all duration-200 rounded-lg mb-1 ${
                      location.pathname === item.url
                        ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400"
                        : ""
                    }`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                      <item.icon className="w-5 h-5" />
                      <span>
                        {language === "ar"
                          ? {
                              Dashboard: "لوحة التحكم",
                              Cases: "القضايا",
                              Clients: "العملاء",
                              Sessions: "الجلسات",
                              Services: "الخدمات",
                              Procedures: "الإجراءات",
                              Marketing: "التسويق",
                            }[item.title] || item.title
                          : item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Law Firm Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>
            {language === "ar" ? "المكتب" : "Law Firm"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lawFirmItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                      <item.icon className="w-5 h-5" />
                      <span>
                        {language === "ar"
                          ? {
                              "About Us": "من نحن",
                              "Our Services": "خدماتنا",
                            }[item.title] || item.title
                          : item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadSidebar>
  );
}
