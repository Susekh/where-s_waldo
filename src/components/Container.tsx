import { ReactNode } from "react"

type ContainerProps = {
    children: ReactNode;
};

function Container({ children } : ContainerProps) {
  return (
    <main className=" h-fill bg-neutral-800 p-8 pt-20">
        { children }
    </main>
  )
}

export default Container