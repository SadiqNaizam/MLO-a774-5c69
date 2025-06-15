import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For user avatars
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityFeedListItemProps {
  id: string | number;
  user?: {
    name: string;
    avatarUrl?: string;
  };
  action: string; // e.g., "created a new order", "updated product"
  target?: string; // e.g., "Order #12345", "Product 'Green Plant'"
  timestamp: string; // e.g., "2 minutes ago", "2024-07-28 10:00 AM"
  icon?: LucideIcon;
  className?: string;
}

const ActivityFeedListItem: React.FC<ActivityFeedListItemProps> = ({
  id,
  user,
  action,
  target,
  timestamp,
  icon: IconComponent,
  className,
}) => {
  console.log("Rendering ActivityFeedListItem:", id, action);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className={cn("flex items-start gap-3 py-3", className)}>
      {IconComponent && !user && (
         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <IconComponent className="h-4 w-4 text-muted-foreground" />
         </div>
      )}
      {user && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 text-sm">
        <p className="text-foreground">
          {user && <span className="font-semibold">{user.name}</span>}
          {user ? ` ${action}` : action}
          {target && <span className="font-medium text-primary ml-1">{target}</span>}
        </p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityFeedListItem;