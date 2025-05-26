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
      const res = await FetchServerData("/status");
      if(res.message === "server is working"){
        setLoading(false);
      }
      
    })()
  }, [])

  return (
    <main className="h-fit md:pl-4 md:pr-4 pl-2 pr-2 pb-6  pt-20">
        { 
        loading? 
        <ServerLoader para="The server will enter sleep mode after a period of inactivity to minimize costs. It will awaken promptly when needed." />
        :
        children
         }
        <Toaster/>
    </main>
  )
}

export default Container