type ReactNodeProps = {
    children: JSX.Element;
};

function Container({ children } : ReactNodeProps) {
  return (
    <main className=" h-fill bg-neutral-900 p-8 pt-20">
        { children }
    </main>
  )
}

export default Container