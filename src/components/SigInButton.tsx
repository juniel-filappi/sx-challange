import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function SigInButton() {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleSignOut = () => {
    push("/");
    setTimeout(() => {
      signOut();
    }, 500);
  };

  return session ? (
    <button
      type="button"
      className="h-12 rounded-[3rem] bg-[#1f2729] border-0 px-6 flex items-center justify-center font-bold hover:brightness-90 transition-all duration-200"
      onClick={handleSignOut}
    >
      <img src={session.user?.image!} className="w-5 h-5 mr-4 rounded-full" />
      {session.user?.name}
      <FiX color="#737380" className="w-5 h-5 ml-4" />
    </button>
  ) : (
    <button
      type="button"
      className="h-12 rounded-[3rem] bg-[#1f2729] border-0 px-6 flex items-center justify-center font-bold hover:brightness-90 transition-all duration-200"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" className="w-5 h-5 mr-4" />
      Sign In with GitHub
    </button>
  );
}
