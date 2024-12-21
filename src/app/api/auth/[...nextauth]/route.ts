import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Secreto para cifrado de JWT
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              usuario: credentials?.usuario,
              password: credentials?.password,
            }
          );

          if (!data) return null;

          return data;
        } catch (error) {
          console.error("Error en la autenticación:", { authorize: error });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Página de inicio de sesión
    signOut: "/auth/signin", // Página de cierre de sesión
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });

      if (user) {
        token = {
          ...token,
          name: user.name,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });

      if (token?.accessToken) {
        session.user = {
          ...session.user,
          name: token.name,
        };
        session.accessToken = token.accessToken?.toString();
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
