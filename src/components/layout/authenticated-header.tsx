// Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { User, LogOut, Settings, FileText, ChevronDown } from "lucide-react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Auth
import { useSession, signOut } from "next-auth/react";

// React
import { useState } from "react";

export default function AuthenticatedHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  const getUserInitials = () => {
    if (session?.user?.firstName && session?.user?.lastName) {
      return `${session.user.firstName[0]}${session.user.lastName[0]}`.toUpperCase();
    }
    if (session?.user?.name) {
      const names = session.user.name.split(" ");
      return names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (session?.user?.firstName && session?.user?.lastName) {
      return `${session.user.firstName} ${session.user.lastName}`;
    }
    if (session?.user?.name) {
      return session.user.name;
    }
    if (session?.user?.email) {
      return session.user.email;
    }
    return "User";
  };

  if (status === "loading") {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-gray-900">BoenCV</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" ? (
              <>
                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/resume/new"
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Create CV</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                </nav>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{getUserDisplayName()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </div>
                        
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="mr-3 h-4 w-4" />
                          Profile
                        </Link>
                        
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </Link>
                        
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <LogOut className="mr-3 h-4 w-4" />
                            Log out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Not authenticated */
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {status === "authenticated" ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user?.image || ""} alt={getUserDisplayName()} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isUserMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {status === "authenticated" ? (
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
                
                <Link
                  href="/resume/new"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FileText className="mr-3 h-4 w-4" />
                  Create CV
                </Link>
                
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </Link>
                
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-4 py-2"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
