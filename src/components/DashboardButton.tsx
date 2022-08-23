import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export function DashboardButton() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!session) {
      signIn("github", { callbackUrl: "/companies" });
      return;
    }

    push("/companies");
    setLoading(false);
  };
  return (
    <button
      type="button"
      className={`w-64 h-16 b-0 rounded-[2rem] bg-bluesx text-black text-xl font-bold flex justify-center items-center hover:brightness-90 transition-all duration-200 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading ? "Carregando..." : "Acessar dashboard"}
    </button>
  );
}
