import { useEffect, useState } from "react";

export default function Home() {
  const [session, setSession] = useState<{
    user?: { name: string; email: string; image: string };
  }>();

  useEffect(() => {
    const getSession = async () => {
      const res = await fetch("http://localhost:3000/api/auth/session", {
        credentials: "include",
      });
      const sess = await res.json();
      if (sess.user) setSession(sess);
    };
    getSession();
  }, []);

  return (
    <>
      {session?.user ? (
        <>
          <div>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>
          <a
            href={`http://localhost:3000/api/auth/signout?callbackUrl=${encodeURIComponent(
              "http://localhost:8080"
            )}`}
          >
            Sign Out
          </a>
        </>
      ) : (
        <a
          href={`http://localhost:3000/api/auth/signin?callbackUrl=${encodeURIComponent(
            "http://localhost:8080"
          )}`}
        >
          Sign In
        </a>
      )}
    </>
  );
}
