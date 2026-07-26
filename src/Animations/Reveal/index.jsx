import { motion } from 'framer-motion';

/**
 * Entrada al hacer scroll: desplazamiento corto y opacidad, sin escalado.
 * El AnimatedSection anterior usaba scale 0.8, que hace "saltar" el bloque;
 * un recorrido corto con easing suave se lee como intencional, no como efecto.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-80px' }}
    transition={{
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
);

export default Reveal;
