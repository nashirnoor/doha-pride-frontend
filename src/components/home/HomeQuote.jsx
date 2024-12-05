const HomeQuote = () => {
    return (
      <div className="relative h-[300px] flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://dohapride.qa/wp-content/uploads/2023/07/bg-abt2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            zIndex: -1
          }}
        />
  
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
  
        {/* Quote Text */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-white text-3xl md:text-4xl font-semibold text-center italic">
            "Travelling is the only thing that makes you richer"
          </h2>
        </div>
      </div>
    );
  };
  
  export default HomeQuote;