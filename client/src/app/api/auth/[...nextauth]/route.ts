import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_SECRET as string,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider; // save provider into JWT
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).provider = token.provider; // expose provider in session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
