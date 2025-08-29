import { motion } from 'framer-motion';

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.01,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

export const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const AnimatedContainer = ({ children, className = "" }) => (
  <motion.div
    initial="hidden"
    animate="visible" 
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    variants={containerVariants}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedItem = ({ children, className = "", index = 0, as = "div" }) => {
  const Component = motion[as] || motion.div;
  
  return (
    <Component
      variants={itemVariants}
      transition={{ delay: index * 0.05 }}
      className={className}
    >
      {children}
    </Component>
  );
};