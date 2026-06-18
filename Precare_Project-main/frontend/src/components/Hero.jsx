import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

function Hero3D() {
  return (
    <section className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-800 text-white overflow-hidden">
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Replace with a real 3D model (e.g. stethoscope.glb) */}
        <mesh rotation={[0.4, 0.4, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="skyblue" wireframe />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300"
        >
          Smarter Cancer Care
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-lg max-w-2xl mx-auto"
        >
          Experience AI-powered prediction, hospital mapping, and financial planning — all in one platform.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 flex flex-col md:flex-row gap-4 justify-center"
        >
          <a href="#predict" className="px-6 py-3 bg-cyan-500 rounded-lg hover:scale-105 transition">
            Get Started
          </a>
          <a href="#appointment" className="px-6 py-3 bg-white text-blue-800 rounded-lg hover:scale-105 transition">
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
