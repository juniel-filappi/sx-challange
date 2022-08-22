import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function DashboardButton() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const handleSubscribe = async () => {
    if (!session) {
      signIn("github", { callbackUrl: "/dashboard" });
      return;
    }

    push("/dashboard");
  };
  return (
    <button
      type="button"
      className="w-64 h-16 b-0 rounded-[2rem] bg-bluesx text-black text-xl font-bold flex justify-center items-center hover:brightness-90 transition-all duration-200"
      onClick={handleSubscribe}
    >
      Acessar dashboard
    </button>
  );
}
