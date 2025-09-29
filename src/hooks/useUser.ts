import { RootState } from "@/store";
import { setUser } from "@/store/slices/user";
import instance from "@/utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * NextAuth'u kullanan basit bir auth hook'u
 *
 * Bu hook, NextAuth oturumunu kullanarak kullanıcı girişi, çıkışı ve oturum durumunu yönetir.
 */

// Domain bağımsız, yani her yerde kullanılabilecek hook'lar @hooks klasöründe tutulmalıdır.

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const storedUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const previousTokenRef = useRef<string | null>(null);

  /**
   * Kullanıcı çıkışı yapar
   */
  const logout = async (): Promise<void> => {
    try {
      await signOut({ redirect: false });
      dispatch(setUser(null));
      queryClient.clear();
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Token değişikliğini izle ve otomatik logout yap
  useEffect(() => {
    const currentToken = (session as any)?.accessToken;

    // İlk render'da token'ı kaydet
    if (previousTokenRef.current === null && currentToken) {
      previousTokenRef.current = currentToken;
      return;
    }

    // Token değiştiyse ve önceden token varsa logout yap
    if (previousTokenRef.current && currentToken !== previousTokenRef.current) {
      logout();
      return;
    }

    // Token'ı güncelle
    previousTokenRef.current = currentToken || null;
  }, [session]);

  // 401 hatası durumunda otomatik logout
  useEffect(() => {
    const handleTokenInvalid = () => {
      logout();
    };

    window.addEventListener("auth:token-invalid", handleTokenInvalid);

    return () => {
      window.removeEventListener("auth:token-invalid", handleTokenInvalid);
    };
  }, []);

  /**
   * Kullanıcı girişi yapar
   * @param email Kullanıcı e-posta adresi
   * @param password Kullanıcı şifresi
   * @returns Giriş başarılı ise true, değilse false
   */
  const login = async (
    email: string,
    password: string,
    role?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });

      setIsLoading(false);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (!result?.ok) {
        throw new Error("Giriş yapılamadı");
      }

      if (result?.ok) {
        router.replace("/r");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const { refetch, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: async () => {
      const response = await instance.get("/user/me");
      if (response.data.result) {
        dispatch(setUser({ ...response.data.result }));
      }
      return response.data.result;
    },
    enabled: !!session?.user?.id && (!storedUser || false),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const refreshUser = () => {
    refetch();
  };

  return {
    user: storedUser,
    session,
    loading: status === "loading",
    isCurrentPageAuthenticated: status === "authenticated",
    isLoading,
    isUserLoading,
    login,
    logout,
    refreshUser,
  };
};

export interface User {
  id: string;
  createdAt: string;
  firstName: any;
  lastName: any;
  userName: any;
  email: string;
  emailVerified: any;
  bio: any;
  image: any;
  userRole: string;
}
