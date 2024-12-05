import { useEffect, useState } from "react";
import axios from "axios";
import { getTransferData } from "../../api/Route";
import { ChevronLeft, ChevronRight, Star, Clock, Users } from 'lucide-react';
import { BASE_URL } from "../../api/Route";
import { Link } from "react-router-dom";
import HeroCarousel from "../../components/home/HeroCarousal";
import Review from "../../components/Review";
import BlogSection from "../../components/home/BlogSection";
import QatarAdventuresSection from "../../components/home/QatarAdventureSection";
import QatarCulture from "../../components/home/QatarCulture";
import Partner from "../../components/home/Partner";
import TourCards from "../../components/home/TourCards";
import SupportChat from "../../components/home/SupportChat";
import HomeTransfer from "../../components/home/HomeTransfer";
import HomeQuote from "../../components/home/HomeQuote";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransferData();
        console.log(data,"transferr")
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL}/tours/`)
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tours!", error);
      });
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-hidden">

      <HeroCarousel />

      <QatarAdventuresSection />
      {/* <QatarCulture /> */}
      {/* <ServiceSection /> */}

      <HomeTransfer />
      <div>
        <HomeQuote />

    <TourCards />
      </div>
      <div>
        <Review />
        <Partner />
      </div>
      <div>
        <BlogSection />
      </div>
      <SupportChat />
    </div>
  );
};


export default Home;