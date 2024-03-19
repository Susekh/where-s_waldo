import { ReactNode } from "react"

type ContainerProps = {
    children: ReactNode;
};

function Container({ children } : ContainerProps) {
  return (
    <main className=" h-screen bg-neutral-800 p-8">
        { children }
    </main>
  )
}

export default Container