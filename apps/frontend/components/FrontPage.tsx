import { useAuth } from "@/context/authContext"
import ButtonGroup from "./ButtonGroup"
function FrontPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
     
      {/* Container Card (Darker, High Contrast) */}
      <div className="
        text-center 
        p-8 
        md:p-12 
        bg-gray-800 
        rounded-xl 
        shadow-2xl 
        shadow-gray-700/50
        max-w-md 
        w-full 
        border border-gray-700
      ">
        
        {/* Title and Description */}
        <h1 className="text-4xl font-extrabold text-white mb-2">
          <span className="text-lime-400">✍️</span> Live Sketchboard
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Start collaborating on your visual ideas in real-time.
        </p>

        {/* Button Group */}
        <ButtonGroup />

      </div>
    </div>
  )
}
export default FrontPage