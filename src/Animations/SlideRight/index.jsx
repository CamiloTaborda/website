import { motion } from 'framer-motion';

const SlideRight = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideRight;
