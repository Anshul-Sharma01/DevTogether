import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = ({ scrolled }) => {
    return (
        <Link
            to="/"
            className="text-2xl font-bold tracking-tight flex items-center space-x-1"
        >
            <motion.div
                initial={false}
                animate={{ scale: scrolled ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex items-center"
            >
                {/* Dev to D Transition */}
                <AnimatePresence mode="wait">
                    {scrolled ? (
                        <motion.span
                            key="D"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4 }}
                            className="text-red-400"
                        >
                            D
                        </motion.span>
                    ) : (
                        <motion.span
                            key="Dev"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4 }}
                            className="text-red-400"
                        >
                            Dev
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Together Text Transition */}
                <AnimatePresence mode="wait">
                    {scrolled ? (
                        <motion.span
                            key="T"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.6 }}
                            className="text-black dark:text-white"
                        >
                            T
                        </motion.span>
                    ) : (
                        <motion.span
                            key="Together"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.6 }}
                            className="dark:text-white"
                        >
                            Together
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

export default Logo;
