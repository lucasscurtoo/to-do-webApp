import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../components/RedirectContext";

const ToDo = () => {
  const router = useRouter();
  const { setRedirect } = useRedirect();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      setRedirect(true);
    }
  }, []);

  return <div>hola</div>;
};

export default ToDo;
