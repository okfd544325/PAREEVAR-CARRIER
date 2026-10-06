import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "student@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Fallback demo authentication
        if (credentials?.email === "student@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Demo Student", email: "student@example.com", role: "STUDENT" };
        }
        if (credentials?.email === "parent@example.com" && credentials?.password === "password") {
          return { id: "2", name: "Demo Parent", email: "parent@example.com", role: "PARENT" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-demo-only",
});

export { handler as GET, handler as POST };
