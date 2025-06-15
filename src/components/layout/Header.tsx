import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input'; // For search bar

interface HeaderProps {
  onToggleSidebar?: () => void; // Optional: Callback to toggle a mobile sidebar
  appName?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, appName = "Admin Dashboard" }) => {
  console.log("Rendering Header");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Menu Toggle */}
      {onToggleSidebar && (
        <Button size="icon" variant="outline" className="sm:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}

      <div className="hidden font-semibold md:block text-lg">{appName}</div>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Link to="/account-settings"> {/* Example link */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">User Account</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;