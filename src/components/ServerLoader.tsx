function ServerLoader() {
  return (
    <div className="flex flex-col items-center gap-16 p-12  ">
        <svg height={"9rem"} width={"9rem"} className=" fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"/><g><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/><animateTransform attributeName="transform" type="rotate" calcMode="spline" dur="1s" keySplines=".36,.6,.31,1;.36,.6,.31,1" values="0 12 12;180 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
        <p className="text-white text-center">
            The server will enter sleep mode after a period of inactivity to minimize costs. It will awaken promptly when needed.
        </p>
    </div>
  )
}

export default ServerLoader