import { Toaster } from "./ui/toaster";

type ReactNodeProps = {
    children: JSX.Element;
};

function Container({ children } : ReactNodeProps) {
  return (
    <main className=" bg-neutral-900 p-8 pt-20">
        { children }
        <Toaster/>
    </main>
  )
}

export default Container