import HeroCarousel from "../../components/home/HeroCarousal";
import Review from "../../components/home/Review";

import BlogSection from "../../components/home/BlogSection";
import QatarAdventuresSection from "../../components/home/QatarAdventureSection";
import Partner from "../../components/home/Partner";
import TourCards from "../../components/home/TourCards";
import SupportChat from "../../components/home/SupportChat";
import HomeTransfer from "../../components/home/HomeTransfer";
import HomeQuote from "../../components/home/HomeQuote";
import HomeContact from "../../components/home/HomeContact";

const Home = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <HeroCarousel />
      <QatarAdventuresSection />
      <HomeTransfer />
      <HomeQuote />
      <TourCards />
      <Review />
      <Partner />
      <HomeContact />
      <BlogSection />
      <SupportChat />
    </div>
  );
};


export default Home;