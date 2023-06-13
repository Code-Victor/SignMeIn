import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const EXPIRY_TIME = 4 * 60;
const refreshAccessToken = async (token: JWT) => {
  console.log(typeof token, token);

  try {
    const url = "https://signmein-api.onrender.com/api/token/refresh/";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ refresh: token.refresh as string }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access: refreshedTokens.access,
      expires_at: Date.now() / 1000 + EXPIRY_TIME,
      refresh: refreshedTokens.refresh ?? token.refresh, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "victor@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(
          "https://signmein-api.onrender.com/user/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: EXPIRY_TIME,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user, account }) {
      console.log("account", user);
      if (account) {
        token = {
          ...token,
          ...user,
          expires_at: Math.floor(
            Date.now() / 1000 + (account?.expires_at || EXPIRY_TIME)
          ),
        };
        return token;
      } else if (Date.now() < (token.expires_at as number) * 1000) {
        // If the access token has not expired yet, return it
        return { ...token, ...user };
      } else {
        console.log("refresh");
        return refreshAccessToken(token);
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
