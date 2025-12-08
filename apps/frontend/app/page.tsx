
export default function Home(){
  return(
  
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
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          
          {/* 1. Create Room Button (Primary - Bright Accent) */}
          <button
            className="
              flex-1
              px-8 py-3 
              text-lg font-bold 
              text-gray-900 
              bg-lime-400 
              rounded-lg 
              shadow-lg 
              hover:bg-lime-300 
              focus:outline-none 
              focus:ring-4 
              focus:ring-lime-300 
              transition-all duration-200 
              transform hover:scale-[1.03]
            "
          >
            ➕ Create New Room
          </button>

          {/* 2. Join Room Button (Secondary - Inverse Look) */}
          <button
            
            className="
              flex-1
              px-8 py-3 
              text-lg font-semibold 
              text-lime-400 
              bg-gray-700 
              rounded-lg 
              border border-lime-400
              hover:bg-gray-600 
              focus:outline-none 
              focus:ring-4 
              focus:ring-lime-800
              transition-all duration-200
              transform hover:scale-[1.03]
            "
          >
            🤝 Join Room
          </button>
        </div>

      </div>
    </div>
  )
}




