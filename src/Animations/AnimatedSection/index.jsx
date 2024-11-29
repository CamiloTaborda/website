import { motion } from 'framer-motion';

const AnimatedSection = ({ children }) => {
  return (
   <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div> 
  );
};

export default AnimatedSection;
