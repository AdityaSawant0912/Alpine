import NextAuth from "next-auth"
import executeQuery from '@/lib/db'
import { compare } from 'bcryptjs';
import CredentialProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        password: {

          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        let dbUser = await executeQuery({
          query: `SELECT * FROM user_auth where user_email=? LIMIT 1`,
          values: [credentials.email]
        })
        if (dbUser.length < 0) return null; // User not fount

        if (! await compare(credentials.password, dbUser[0].user_hash)) return null;  // Passwords do not match


        /* To fetch user data and store it in user object so that you can access in user session object uncomment following code. */
        // By default user object contains only user_id, user_email, user_hash.
        
        let role = await executeQuery({
          query: `SELECT * FROM user_roles where role_id=? LIMIT 1`,
          values: [dbUser[0].user_role_id]
        })
        
        let userData = await executeQuery({
          query: `SELECT * FROM user_account where user_id=? LIMIT 1`,
          values: [dbUser[0].user_id]
        })
        if (userData.length < 0) return null; ;// User Data not found 
       
        let user = {
          user_email: dbUser[0].user_email,
          user_role_id: dbUser[0].user_role_id,
          role_description: role[0].role_description,
          ...userData[0],
        } 

        console.log(user);
        return user // replace this with user object

      },
    })
  ],

  pages: {
    signIn: '/login',   // Uncomment this once you have login page
    error: '/error', // Error code passed in query string as ?error=
  },

  callbacks: {

    async signIn({ }) {
      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...user
        }
      }
      return token
    },
    session: ({ token, session }) => {
      session.user = {
        ...token
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encryption: true
  }
}

export default NextAuth(authOptions)
