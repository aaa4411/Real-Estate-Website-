import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Menu,
  Home,
  LogOut,
  Calendar,
  Building,
  Crown,
  X,
  BarChart2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  username?: string;
  isPremium?: boolean;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  onHomeClick?: () => void;
  onLogout?: () => void;
}

const Header = ({
  username = "John Doe",
  isPremium = false,
  notificationCount = 3,
  onSearch = () => {},
  onProfileClick = () => {},
  onNotificationsClick = () => {},
  onHomeClick = () => {},
  onLogout = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path matches the link path
  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path))
    );
  };

  // Handle scroll event to add shadow to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?q=${encodeURIComponent(searchQuery)}`);
      onSearch(searchQuery);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    onHomeClick();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex h-20 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Button
            variant="ghost"
            className="mr-2 px-0 text-2xl font-bold transition-colors hover:text-primary"
            onClick={handleLogoClick}
          >
            <Building className="mr-2 h-5 w-5" />
            RealEstate<span className="text-primary">AI</span>
          </Button>

          {isPremium && (
            <Badge
              variant="secondary"
              className="ml-2 bg-amber-200 text-amber-900 font-medium shadow-sm"
            >
              PREMIUM
            </Badge>
          )}
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <Home className="h-4 w-4 mr-1" />
              Home
            </span>
          </Link>
          <Link
            to="/properties"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/properties") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <MapPin className="h-4 w-4 mr-1" />
              Properties
            </span>
          </Link>
          <Link
            to="/property-comparison"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/property-comparison") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <BarChart2 className="h-4 w-4 mr-1" />
              Compare
            </span>
          </Link>
          <Link
            to="/bookings"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/bookings") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <Calendar className="h-4 w-4 mr-1" />
              Bookings
            </span>
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <User className="h-4 w-4 mr-1" />
              Dashboard
            </span>
          </Link>
          <Link
            to="/partners"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/partners") ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center hover:scale-105 transition-transform">
              <Building className="h-4 w-4 mr-1" />
              Partners
            </span>
          </Link>
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative ml-auto mr-4 flex-1 max-w-md hidden sm:block"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties..."
              className="pl-10 pr-4 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex"
            onClick={onNotificationsClick}
            aria-label={`${notificationCount} notifications`}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 font-medium shadow-sm"
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu - Desktop */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt={username}
                    />
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {isPremium ? "Premium Member" : "Free Account"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookings")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/subscription")}>
                  <Crown className="mr-2 h-4 w-4" />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  RealEstate<span className="text-primary">AI</span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search properties..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Mobile User Info */}
              <div className="flex items-center space-x-4 mb-6">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                    alt={username}
                  />
                  <AvatarFallback>
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-muted-foreground">
                    {isPremium ? "Premium Member" : "Free Account"}
                  </p>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/") ? "bg-muted font-medium" : ""}`}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/properties"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/properties") ? "bg-muted font-medium" : ""}`}
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Properties</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/property-comparison"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/property-comparison") ? "bg-muted font-medium" : ""}`}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span>Compare</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/bookings"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/bookings") ? "bg-muted font-medium" : ""}`}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Bookings</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/dashboard") ? "bg-muted font-medium" : ""}`}
                  >
                    <User className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/subscription"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/subscription") ? "bg-muted font-medium" : ""}`}
                  >
                    <Crown className="h-5 w-5" />
                    <span>Subscription</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/partners"
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${isActive("/partners") ? "bg-muted font-medium" : ""}`}
                  >
                    <Building className="h-5 w-5" />
                    <span>Partners</span>
                  </Link>
                </SheetClose>

                <div className="pt-4 mt-4 border-t">
                  <SheetClose asChild>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
