import { type GetServerSidePropsContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && <h1>Signed in as {session.user.email}</h1>}
      {session ? (
        <button onClick={() => void signOut()}>Sign out</button>
      ) : (
        <button onClick={() => void signIn("google")}>Sign in</button>
      )}

      <Link href={"/"}>
        <h3>take me home</h3>
      </Link>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: null,
    },
  };
};

export default Login;
