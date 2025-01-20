const HomeQuote = () => {
  return (
    <div className="relative h-[400px] flex items-center overflow-hidden mt-5">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/image3.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1,
          filter: 'brightness(0.6)' 
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-500/30" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Trip Advisor Rating */}
        <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
          <img 
            src="https://www.tripadvisor.com/img/cdsi/img2/branding/tripadvisor_logo_transp_340x80-41956-1.png" 
            alt="TripAdvisor" 
            className="h-8 mr-3"
          />
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`text-2xl ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-white text-lg ml-2">(5/5)</span>
          </div>
        </div>

        {/* Quote Text */}
        <h2 className="text-white text-3xl md:text-5xl font-serif text-center max-w-3xl leading-tight">
          "Travelling is the only thing you buy that makes you richer"
        </h2>

        {/* Subtle Subtitle */}
        <p className="text-white text-xl mt-4 opacity-80 italic">
          Explore. Dream. Discover.
        </p>
      </div>
    </div>
  );
};

export default HomeQuote;