import { NextApiRequest, NextApiResponse } from "next";

import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL).hostname;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
      if (new URL(url).hostname === hostName) return Promise.resolve(url);
      return Promise.resolve(baseUrl);
    },
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName,
      },
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextAuth(req, res, authOptions);
}
