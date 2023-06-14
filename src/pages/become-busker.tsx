import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { becomeBuskerSchema } from "~/server/api/routers/buskers";
import { api } from "~/utils/api";

const BecomeBusker = () => {
  const handleBecomeBusker = api.buskers.becomeABusker.useMutation();
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e);

    try {
      // becomeBuskerSchema.parse(description);
    } catch (e) {
      console.log(e);
    }

    handleBecomeBusker.mutate({ description });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="my-8">
        <input
          type="text"
          placeholder="Tell us a little bit about yourself"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mr-6 w-[300px] rounded-md border border-gray-300 px-6 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-xl text-white hover:bg-blue-600">
          Click here if you want to become a busker!
        </button>
      </form>
      <br />
      <Link href={"/"} className="text-lg text-blue-500 hover:underline">
        Go back to home
      </Link>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
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

export default BecomeBusker;
