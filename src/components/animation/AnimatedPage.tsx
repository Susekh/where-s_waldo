import { motion } from "framer-motion"


interface props{
    children : JSX.Element
}

const animations = {
    initial : { opacity : 0},
    animate : { opacity : 1},
}

function AnimatedPage( { children } : props) {
  return (
    <motion.div
        variants={animations}
        initial="initial"
        animate= "animate"
        exit="exit"
        transition={{ duration : 0.5 }}
    >
        {children}
    </motion.div>
  )
}

export default AnimatedPage