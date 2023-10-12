import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


// intergrate next auth and prisma 
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from "@/libs/prismadb";

export default NextAuth ({
    // Configuring NextAuth to use Prisma as the database adapter.

    adapter: PrismaAdapter (prisma),                           
    providers: [

        //Setting up the way users can log in, in this case, using their email and password
        CredentialsProvider ({
            name:'credentials',

            // Defining the fields users will fill in when logging in: an email and a password
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
                },

                // check if creds are provided
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error ('Invalid credentials');
                    }
                
                // Looking up the user in the database using the provided email.
                const user = await prisma.user.findUnique ({
                    where: {
                        email: credentials.email
                    }
                });

                //Checking if a user was found and if that user has a hashed password stored
                if (!user || !user?.hashedPassword) {
                    throw new Error ( "Invalid credentials");
                }

                // Using bcrypt to compare the provided password with the stored hashed password
                const isCorrectPassword = await bcrypt.compare( 
                        credentials.password, 
                        user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error ('Invalid credentials');
                }

                //If the password is correct, the user's data is returned, effectively logging them in.
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development', 

    // Configuring the session to use JWTs (JSON Web Tokens) for tracking logged-in users
    session: {
        strategy: 'jwt'
    },

    //Setting up a secret key, which is used to securely generate and read the JWTs
    jwt: {
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },

    //A general security key for NextAuth functionalities
    secret: process.env.NEXTAUTH_SECRET
});