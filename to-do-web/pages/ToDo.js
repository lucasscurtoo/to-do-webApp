import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../components/RedirectContext";
import LeftMenu from "../components/LeftMenu";

const ToDo = () => {
  const router = useRouter();
  const { setRedirect } = useRedirect();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      setRedirect(true);
    }
  }, []);

  return (
        <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
            <div className="black-overlay w-full h-full flex">
                <div className="bg-secondGrayColor w-4/5 h-90% m-auto">
                    <LeftMenu/>
                </div>
            </div>
        </div>
    )
};

export default ToDo;
