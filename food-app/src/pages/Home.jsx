import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuPreview from "../components/MenuPreview";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-black text-white">

      <Navbar />

      {/* PAGE ENTER ANIMATION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >

        <section id="home">
          <Hero />
        </section>

        <section id="menu" className="px-10 py-16">
          <MenuPreview />
        </section>

      </motion.div>
    </div>
  );
}