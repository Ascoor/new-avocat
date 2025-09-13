import React from 'react'
import { Header } from '@/components/layout/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Briefcase, Users } from 'lucide-react'

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="glass-card card-hover">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="text-primary">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </div>
)

export default function DashboardDemo() {
  const { isRTL, direction } = useLanguage()

  return (
    <div className={cn('flex min-h-screen w-full', isRTL ? 'flex-row-reverse' : '')} dir={direction}>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6 bg-background">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="heading-md gradient-text">Welcome to your dashboard</h1>
            <div className="flex gap-2">
              <Button className="btn btn-primary">Primary</Button>
              <Button variant="ghost" className="btn btn-ghost">Ghost</Button>
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <StatCard icon={<Users className="h-5 w-5" />} title="Clients" value="1,284" />
            <StatCard icon={<Briefcase className="h-5 w-5" />} title="Active Cases" value="312" />
            <StatCard icon={<BarChart3 className="h-5 w-5" />} title="Reports" value="68" />
          </div>
        </main>
      </div>
    </div>
  )
}

