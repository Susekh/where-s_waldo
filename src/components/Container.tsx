import { useEffect, useState } from "react";
import { Toaster } from "./ui/toaster";
import FetchServerData from "@/utils/FetchServerData";
import ServerLoader from "./ServerLoader";

type ReactNodeProps = {
    children: JSX.Element;
};

function Container({ children } : ReactNodeProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      const res = await FetchServerData("/test");
      if(res.message === "server is working"){
        setLoading(false);
      }
      console.log(res);
      
    })()
  }, [])

  return (
    <main className=" bg-neutral-900 h-fit md:pl-4 md:pr-4 pl-2 pr-2 pb-6  pt-20">
        { 
        loading? 
        <ServerLoader />
        :
        children
         }
        <Toaster/>
    </main>
  )
}

export default Container