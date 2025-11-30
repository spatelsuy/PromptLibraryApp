import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
	  authorization: {
		  params: {
			  scope: "openid email profile"
		  }
	  }
    })
  ],
  session: {
    strategy: "jwt",   // stateless (what you wanted)
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // This runs when JWT is created or updated
      if (account) {
        token.idToken = account.id_token; // Store Google ID token	
      }
	  console.log("ID token = " + token.idToken);
      return token;
    },
    async session({ session, token }) {
      console.log("Session object:", session);
      session.idToken = token.idToken;
	  //console.log("The token 2 = " + session.idToken);
      return session;
    },
  },
  
});

export { handler as GET, handler as POST };
