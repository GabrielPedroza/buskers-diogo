import { signOut } from "next-auth/react";

const BuskerNavbar = () => {
  return (
    <>
      <div className="text-white">
        Buskers are only allowed to see this! Its a navbar
      </div>
      <button className="text-white" onClick={() => void signOut()}>
        {" "}
        log out
      </button>
    </>
  );
};

export default BuskerNavbar;
