import { motion } from 'framer-motion';

const SlideUp = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUp;
