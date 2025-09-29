import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data.status === "success" && response.data.result) {
            const userData = response.data.result;
            return {
              id: userData.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              name:
                `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
                userData.email,
              role: userData.userRole || "user",
              token: userData.token,
            };
          }
          return null;
        } catch (error: any) {
          console.error(
            "Authentication error:",
            error.response?.data || error.message
          );
          throw new Error(error.response?.data?.error || "Giriş başarısız");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.accessToken = user.token;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string;
        session.user.token = token.accessToken as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
};
