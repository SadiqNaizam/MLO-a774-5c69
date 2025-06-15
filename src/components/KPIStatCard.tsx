import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'; // For icons

interface KPIStatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+5.2%"
  isLoading?: boolean;
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({
  title,
  value,
  icon: IconComponent,
  description,
  trend,
  trendValue,
  isLoading = false,
}) => {
  console.log("Rendering KPIStatCard:", title);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground';

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted"></div> {/* Placeholder for value */}
          {description && <div className="mt-1 h-4 w-32 animate-pulse rounded-md bg-muted"></div>} {/* Placeholder for description */}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trend && trendValue && (
          <div className={`mt-1 flex items-center text-xs ${trendColor}`}>
            <TrendIcon className="mr-1 h-3 w-3" />
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIStatCard;