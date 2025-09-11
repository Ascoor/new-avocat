import { useStats } from "@/hooks/useStats";
import StatsCard from "@/components/dashboard/StatsCard";
import GaugeChart from "@/components/dashboard/GaugeChart";
import TrendingSection from "@/components/dashboard/TrendingSection";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import { Bitcoin, DollarSign, BarChart, LineChart } from "lucide-react";
import AppShell from "@/components/layout/Layout"; // the file we just created

export default function Dashboard() {
  const { loading, stats, tvlData, fearGreed, trending, recentProjects, refreshData } = useStats();

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <AppShell isLoading={loading} onRefresh={refreshData}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard title="Market Cap" value={formatCurrency(stats.marketCap)} change={stats.dailyChange} icon={<BarChart size={20} className="text-chart-blue" />} />
        <StatsCard title="Bitcoin Price" value={formatCurrency(stats.bitcoinPrice)} change={4.2} icon={<Bitcoin size={20} className="text-chart-yellow" />} />
        <StatsCard title="Total Value Locked" value={formatCurrency(stats.totalValueLocked)} change={10.2} icon={<DollarSign size={20} className="text-chart-green" />} />
        <StatsCard title="24h Trading Volume" value={formatCurrency(stats.tradingVolume)} change={-2.8} icon={<LineChart size={20} className="text-chart-purple" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GaugeChart value={tvlData.current} dailyChange={tvlData.dailyChange} weeklyChange={tvlData.weeklyChange} />
        <FearGreedIndex value={fearGreed.value} indicator={fearGreed.indicator} previousValue={fearGreed.previousValue} previousChange={fearGreed.previousChange} />
      </div>

      {/* Trending */}
      <TrendingSection tokens={trending} />

      {/* Recent projects */}
      <ProjectsTable projects={recentProjects} />
    </AppShell>
  );
}
