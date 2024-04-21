import { Toaster } from "./ui/toaster";

type ReactNodeProps = {
    children: JSX.Element;
};

function Container({ children } : ReactNodeProps) {
  return (
    <main className=" bg-neutral-900 h-fit md:pl-4 md:pr-4 pl-2 pr-2 pb-6  pt-20">
        { children }
        <Toaster/>
    </main>
  )
}

export default Container