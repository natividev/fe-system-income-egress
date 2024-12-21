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
      async authorize(credentials: Record<"usuario" | "password", string>) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              usuario: credentials?.usuario,
              password: credentials?.password,
            }
          );

          if (!data) return null;

          return { accessToken: data.access_token };
        } catch (error) {
          console.error("Error en la autenticación:", { authorize: error });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Página de inicio de sesión
  },
  session: {
    strategy: "jwt", // Utilizar JWT para manejar la sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { accessToken: user.accessToken };
      return token;
    },
    async session({ session, token }) {
      console.log("..............session..............", { session, token });

      session.accessToken = token.accessToken?.toString();

      console.log("..............session update..............", { session });
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
