import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';

export const meta = () => {
  return [
    {title: 'Vastara Watches - Valentine\'s Day Special'},
    {name: 'description', content: 'Valentine\'s Day watch collection with exclusive offers and free shipping.'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  
  const {menu: mainMenu} = await storefront.query(MAIN_MENU_QUERY, {
    variables: {handle: 'main-menu'}
  });

  return {mainMenu};
}

export default function Homepage() {
  const {mainMenu} = useLoaderData();
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});

  const calculateValentinesCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let valentinesDay = new Date(currentYear, 1, 14, 23, 59, 59);
    
    if (valentinesDay.getTime() < now.getTime()) {
      valentinesDay = new Date(currentYear + 1, 1, 14, 23, 59, 59);
    }
    
    const difference = valentinesDay.getTime() - now.getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  };

  useEffect(() => {
    setTimeLeft(calculateValentinesCountdown());
    const countdownInterval = setInterval(() => {
      setTimeLeft(calculateValentinesCountdown());
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* TOP COUNTDOWN BAR - BLACK BACKGROUND */}
      <div className="bg-black text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎉</span>
            <span className="text-sm md:text-base font-bold uppercase tracking-wide">COUNTDOWN</span>
            <span className="text-xl">🎉</span>
          </div>
          <div className="flex items-center gap-2 border-2 border-white px-4 py-2">
            <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-xs">D</span>
            <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-xs">H</span>
            <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-xs">M</span>
            <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-xs">S</span>
          </div>
        </div>
      </div>

      {/* MARQUEE BANNER - DARK RED BACKGROUND */}
      <div className="w-full bg-[#8B1A1A] text-white overflow-hidden py-4 border-b-2 border-[#6B0F0F]">
        <div className="animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 whitespace-nowrap">
              <span className="text-white text-lg md:text-xl font-serif italic tracking-wider">
                THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER
              </span>
              <span className="text-2xl ml-4">💝</span>
              <div className="ml-8 flex items-center gap-2 opacity-50">
                <span className="text-white text-xs">✦</span>
                <span className="w-12 h-[1px] bg-white"></span>
                <span className="text-white text-xs">✦</span>
              </div>
              <span className="text-2xl ml-4">❤️</span>
            </div>
          ))}
        </div>
      </div>

      {/* SPLIT SECTION - GOLD LEFT / WHITE RIGHT */}
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDE - GOLD BACKGROUND */}
        <div className="bg-[#D4A574] py-8 px-6 md:w-1/2">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="text-2xl">💝</span>
              <span className="text-[#2C2C2C] font-bold text-lg">Valentine's Watch Privileges</span>
              <span className="text-3xl font-serif text-[#8B6F47]">&</span>
              <span className="text-2xl">🎁</span>
              <span className="text-[#2C2C2C] font-bold text-lg">Unwrap Luxury</span>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-xl">💋</span>
                <span className="text-[#2C2C2C] font-semibold">Use code:</span>
                <span className="bg-[#1a3a3a] text-white font-bold px-4 py-1 text-base">VDAY25</span>
                <span className="text-[#2C2C2C] font-semibold">for 25% OFF</span>
              </div>
              <p className="text-[#2C2C2C] text-sm mt-2">
                Limited New Year's selection available now! Offer ends soon.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - WHITE BACKGROUND */}
        <div className="bg-white py-8 px-6 md:w-1/2">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">Benefits</div>
              <div className="text-gray-600 text-sm">Quality timepieces</div>
            </div>
            <span className="text-3xl md:text-4xl font-serif text-[#D4A574]">&</span>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">Guaranteed</div>
              <div className="text-gray-600 text-sm">1 Year Warranty</div>
            </div>
            <span className="text-xl font-bold text-gray-900">Plus</span>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">$20 Gift Card</div>
              <div className="text-gray-600 text-sm">per $100 spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* FREE SHIPPING BANNER - RED BACKGROUND */}
      <div className="bg-[#C53030] text-white py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="font-bold text-sm md:text-base">FREE SHIPPING to USA, UK, Canada & Australia!</span>
        </div>
      </div>

      {/* SHOP WITH CONFIDENCE - BEIGE BACKGROUND */}
      <div className="bg-[#F5F5DC] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-xl md:text-2xl font-serif text-gray-900 mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-bold">SHOP WATCHES WITH CONFIDENCE:</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="mb-2">
                <span className="font-bold text-[#C86A3C]">Guaranteed</span>
                <span className="text-gray-900"> in Time for Valentines Day</span>
              </div>
              <div className="text-gray-700">
                <span className="text-lg">💝</span> Order by 02/11 at 5PM ET (USA/UK/CAN). 
                <a href="#" className="text-gray-900 underline">Details</a>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <span className="font-bold text-[#C86A3C]">Best</span>
                <span className="text-gray-900"> Watch Price Guarantee</span>
              </div>
              <div className="text-gray-700">
                Price match within 30 days. 
                <a href="#" className="text-gray-900 underline">Details</a>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <span className="font-bold text-[#C86A3C]">Easy</span>
                <span className="text-gray-900"> Returns</span>
              </div>
              <div className="text-gray-700">
                Free returns until 3/03. 
                <a href="#" className="text-gray-900 underline">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION - WHITE BACKGROUND */}
      <nav className="bg-white border-y border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-widest">
              VASTARA
            </Link>
            <div className="hidden lg:flex items-center space-x-6">
              {mainMenu?.items?.map((item) => (
                <Link
                  key={item.id}
                  to={item.url || '/'}
                  className="text-xs font-semibold text-gray-800 hover:text-gray-600 uppercase tracking-wider"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-800 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs">Account</span>
              </button>
              <button className="text-gray-800 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-800 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SECONDARY NAV - DARK GREEN BACKGROUND */}
      <div className="bg-[#1a5238] text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-xs font-semibold flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎄</span>
              <span>FREE SHIPPING (USA/UK/CA/AU)</span>
            </div>
            <span>•</span>
            <span>1-YEAR WARRANTY</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span>EASY RETURNS</span>
              <span className="text-lg">🎁</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MAIN_MENU_QUERY = `#graphql
  fragment MenuItem on MenuItem {
    id
    title
    url
    type
    items {
      id
      title
      url
      type
    }
  }
  
  query MainMenu($handle: String!) {
    menu(handle: $handle) {
      id
      items {
        ...MenuItem
      }
    }
  }
`;

