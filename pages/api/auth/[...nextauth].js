import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import db from '../../../firebase'
import {getAuth} from 'firebase/auth'
import { providers, session, signIn } from 'next-auth/client'
import CredentialsProvider from "next-auth/providers/credentials";



export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Facebook(
      {
        clientId : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET
      }
    ),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {  label: "Email", type: "text", placeholder: "Email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: credentials.id, name: credentials.name, email: credentials.email ,image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"}
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
           
          return user
          
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
    
    
      
    
   
    //   ...add more providers here 
  ],

 
  pages:{
    signIn:('/login')
  },
    
 

  session:{
    jwt:true,
    
  },
  
  
  
  adapter : FirebaseAdapter(db)

  // // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})