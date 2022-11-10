import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../components/RedirectContext";
import LeftMenu from "../components/LeftMenu";
import { defaultList } from "../helpers/functions";
import Task from "../components/Tasks";

const ToDo = () => {
  const [closeState, setCloseState] = useState(false);
  const [list, setList] = useState(defaultList[0]);
  const router = useRouter();
  const { setRedirect } = useRedirect();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      setRedirect(true);
    }
  }, []);

  console.log(list)

  const handleSelectedList = (list) => {
      setList(list)
  }

  return (
        <div className="w-screen h-screen bg-background1 bg-cover bg-no-repeat">
            <div className="black-overlay w-full h-full flex">
                <div className="bg-secondGrayColor w-4/5 h-90% m-auto flex">
                  <div className="w-1/6 h-full">
                    {!closeState && <LeftMenu close={setCloseState} selectedList={handleSelectedList}/>}
                  </div>
                  <div className="w-full flex flex-col">
                      <h1 className="p-10 mt-6">{list.title}</h1>
                      <Task itsNew={true}/>
                  </div>
                </div>
            </div>
        </div>
    )
};

export default ToDo;
