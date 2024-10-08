import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "../../../services";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Custom Login",
      credentials: {
        id: {},
        token: {},
        name: {},
        lastname: {},
        phone: {},
        fax: {},
        email: {},
        role: {},
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.id ||
          !credentials.token ||
          !credentials.name ||
          !credentials.lastname ||
          !credentials.phone ||
          !credentials.fax ||
          !credentials.email ||
          !credentials.role
        ) {
          throw new Error("No credentials provided");
        }
        try {
          const response = await AuthService.authenticateUser(
            credentials.id,
            credentials.token,
            credentials.name,
            credentials.lastname,
            credentials.phone,
            credentials.fax,
            credentials.email,
            credentials.role
          );
          if (response) {
            return response;
          } else {
            throw new Error("Invalid user credentials");
          }
        } catch (error: any) {
          throw new Error(
            error.response?.data?.title + ": Invalid user credentials"
          );
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    updateAge: 86400,
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
