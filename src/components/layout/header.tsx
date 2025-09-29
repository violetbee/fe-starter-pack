// Components
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { User, LogOut, Settings, FileText, Menu } from "lucide-react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Auth
import { useSession, signOut } from "next-auth/react";

// React
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image || ""}
                          alt={getUserDisplayName()}
                        />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {status === "authenticated" ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={getUserDisplayName()}
                    />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <Link
                    href="/resume/new"
                    className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Create CV</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Not authenticated - Mobile */
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
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
    </header>
  );
}
