import { useEffect, useRef } from "react";
import { useInView, useAnimation, motion } from "framer-motion";


interface props {
    children : JSX.Element;
    width?: string;
    className? : string;
}

function RevealOnScroll( {children, width = "fit-content", className}: props ) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if(isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

  return (
    <div ref={ref} style={{width}} className={className}>
        <motion.div
            variants={
                {
                    hidden : { opacity: 0, y : 75 },
                    visible : { opacity: 1, y : 0 },
                }
            }
            initial = "hidden"
            animate= {mainControls}
            transition={{ duration: 0.5, delay : 0.25 }}
        >
            {children}
        </motion.div>
    </div>
  )
}

export default RevealOnScroll