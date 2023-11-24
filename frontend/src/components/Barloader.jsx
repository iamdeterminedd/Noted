import { motion } from 'framer-motion';

const Barloader = () => {
  return (
    <div className="barloader">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
      ease: 'circIn',
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="motion-div"
    >
      <motion.div variants={variants} className="motion-insideDiv" />
      <motion.div variants={variants} className="motion-insideDiv" />
      <motion.div variants={variants} className="motion-insideDiv" />
      <motion.div variants={variants} className="motion-insideDiv" />
      <motion.div variants={variants} className="motion-insideDiv" />
    </motion.div>
  );
};

export default Barloader;
