import React from "react";

export default function About() {
  return (
    <div className="px-4 py-7 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">About</h1>

      <p className="text-slate-700 mb-4">
        Frontend Development: On the frontend, React is used to build the user
        interface. When a user attempts to log in or register, React components
        handle the form submissions and communicate with the backend via API
        calls. Upon successful authentication, the JWT token received from the
        server is stored, and the user state is updated to reflect that the user
        is logged in.React Router can be used to create protected routes,
        ensuring that only authenticated users can access certain pages. If an
        unauthenticated user tries to access a protected route, they can be
        redirected to the login page. Additionally, we can use context or Redux
        to manage the global authentication state, making it easier to maintain
        and update the authentication status across different components.
      </p>
      <p className="text-slate-700 mb-4">
        Backend Development: In the backend, we use Node.js along with
        Express.js to set up the server and handle HTTP requests. MongoDB is
        used as the database to store user credentials and other related
        information. For user authentication, we typically use JWT (JSON Web
        Tokens). When a user logs in or registers, the server validates the
        credentials and, if valid, generates a JWT token. This token is then
        sent to the client and stored, usually in localStorage or cookies. The
        token is included in the header of subsequent requests to the server to
        verify the user's identity.To enhance security, we use bcrypt.js to hash
        passwords before storing them in the database. This ensures that even if
        the database is compromised, the actual passwords remain protected.
        Middleware functions in Express.js help to protect certain routes,
        allowing only authenticated users to access them by validating the JWT
        tokens
      </p>
      <p className="text-slate-700 mb-4">
        Security Considerations: Security is paramount in authentication
        systems. Implementing HTTPS to encrypt data transmitted between the
        client and server, using secure cookies with HTTPOnly and Secure flags,
        and setting up proper CORS policies are essential steps to protect
        against common vulnerabilities such as man-in-the-middle attacks and
        cross-site scripting (XSS). In summary, building an authentication
        system in a MERN stack application involves a combination of server-side
        and client-side development. By leveraging JWT, bcrypt, and secure
        coding practices, we can create a robust and secure authentication
        system that protects user data and provides a smooth user experience.
      </p>
    </div>
  );
}
