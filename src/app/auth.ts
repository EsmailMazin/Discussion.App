import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'; // Correct provider import
import { PrismaAdapter } from 'auth/prisma-adapter'; // Ensure the correct path for the adapter
import { db } from './db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing GitHub OAuth credentials');
}

// Correct NextAuth configuration without destructuring
export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id; // Attach user ID to session
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
