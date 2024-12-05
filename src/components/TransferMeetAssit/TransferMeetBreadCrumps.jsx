import React from 'react'

const TransferMeetBreadCrumps = () => {
    return (
        <div className="relative h-[200px] md:h-[250px] bg-[#145c74] overflow-hidden">
          {/* Background with Arabic-inspired pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute right-0 top-0 w-48 md:w-96 h-48 md:h-96 border-[20px] md:border-[40px] border-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-0 bottom-0 w-36 md:w-72 h-36 md:h-72 border-[15px] md:border-[30px] border-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
    
          {/* Content container */}
          <div className="relative h-full max-w-6xl mx-auto px-4 md:px-20">
            <div className="h-full flex items-center">
              {/* Main content */}
              <div className="space-y-4 md:space-y-6">
                {/* Title with Arabic-inspired decorative element */}
                <div className="relative">
                  <h1 className="text-4xl md:text-6xl text-white font-light tracking-wider">
                    Transfer, Meet & Assist
                    <span className="absolute -right-8 md:-right-12 top-0 text-xl md:text-2xl text-white/20">●</span>
                  </h1>
                  <div className="absolute -left-4 md:-left-8 top-1/2 w-2 md:w-4 h-[2px] bg-white/40"></div>
                </div>
    
                <p className="text-lg md:text-xl text-white/80 font-sans tracking-wide pl-1">
                  "Explore extraordinary experiences across diverse destinations."
                </p>
    
                <div className="flex items-center gap-2 md:gap-4 pl-1">
                  <a href="/" className="text-white/80 hover:text-white text-sm tracking-wider transition-all duration-300 group">
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white/30"></span>
                  </a>
                  <span className="text-white/30 transform rotate-45">◇</span>
                  <span className="text-white text-sm tracking-wider">Transfer,Meet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default TransferMeetBreadCrumps
