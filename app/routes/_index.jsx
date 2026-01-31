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

      {/* TOP COUNTDOWN BAR - Black Background */}
      <div className="bg-black text-white py-3 text-center">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-base font-bold tracking-wide flex items-center gap-2">
            <span className="text-xl">❤️</span>
            VALENTINES DAY COUNTDOWN!
            <span className="text-xl">❤️</span>
          </span>
          <div className="flex items-center gap-3 border-2 border-white px-6 py-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider">D</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider">H</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider">M</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE BANNER - Dark Red Background */}
      <div className="w-full bg-[#8B2020] text-white overflow-hidden py-4">
        <div className="animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 whitespace-nowrap">
              <span className="text-white text-xl font-serif italic tracking-widest">
                THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER
              </span>
              <span className="text-2xl ml-3">💝</span>
              <div className="ml-8 flex items-center gap-2 opacity-50">
                <span className="text-white text-xs">✦</span>
                <span className="w-16 h-[1px] bg-white"></span>
                <span className="text-white text-xs">✦</span>
              </div>
              <span className="text-2xl ml-3">❤️</span>
              <span className="text-white text-xl font-serif italic tracking-widest ml-8">
                THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS SECTION - Split Gold/White Background */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Gold Background */}
        <div className="bg-[#D4AF69] py-8 px-6 md:w-1/2 flex items-center justify-center">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-3xl">💝</span>
              <span className="text-[#2C2C2C] font-bold text-xl">Valentine's Watch Privileges</span>
              <span className="text-4xl font-serif text-[#8B7355]">&</span>
              <span className="text-3xl">🎁</span>
              <span className="text-[#2C2C2C] font-bold text-xl">Unwrap Luxury</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <span className="text-xl">💋</span>
              <span className="text-[#2C2C2C] font-semibold">Use code:</span>
              <span className="bg-[#2C3E50] text-white font-bold px-4 py-2 text-lg">VDAY25</span>
              <span className="text-[#2C2C2C] font-semibold">for 25% OFF</span>
            </div>
            <p className="text-[#2C2C2C] text-sm mt-3">
              Limited New Year's selection available now! Offer ends soon.
            </p>
          </div>
        </div>

        {/* Right Side - White Background */}
        <div className="bg-white py-8 px-6 md:w-1/2 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Benefits</div>
              <div className="text-gray-600 text-sm">Quality timepieces</div>
            </div>
            <span className="text-4xl font-serif text-[#D4AF69]">&</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Guaranteed</div>
              <div className="text-gray-600 text-sm">1 Year Warranty</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">Plus</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$20 Gift Card</div>
              <div className="text-gray-600 text-sm">per $100 spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* FREE SHIPPING BANNER - Red Background */}
      <div className="bg-[#C53030] text-white py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="font-bold">FREE SHIPPING to USA, UK, Canada & Australia!</span>
        </div>
      </div>

      {/* SHOP WITH CONFIDENCE SECTION - Beige Background */}
      <div className="bg-[#F5F5DC] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl font-serif text-gray-900 mb-8 flex items-center justify-center gap-2">
            <span className="text-3xl">🎁</span>
            <span className="font-bold">SHOP WATCHES WITH CONFIDENCE:</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center text-sm">
            <div>
              <div className="mb-2">
                <span className="font-bold text-orange-600">Guaranteed</span>
                <span className="text-gray-900"> in Time for Valentines Day</span>
              </div>
              <div className="text-gray-700">
                <span className="text-xl">💝</span> Order by 02/11 at 5PM ET (USA/UK/CAN). 
                <a href="#" className="text-gray-900 underline ml-1">Details</a>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="font-bold text-orange-600">Best</span>
                <span className="text-gray-900"> Watch Price Guarantee</span>
              </div>
              <div className="text-gray-700">
                Price match within 30 days.
                <a href="#" className="text-gray-900 underline ml-1">Details</a>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="font-bold text-orange-600">Easy</span>
                <span className="text-gray-900"> Returns</span>
              </div>
              <div className="text-gray-700">
                Free returns until 3/03.
                <a href="#" className="text-gray-900 underline ml-1">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION - White Background */}
      <nav className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-3xl font-serif font-bold text-gray-900 tracking-wider">
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
              <button className="text-gray-800 hover:text-gray-600">
                <span className="text-sm">👤 Account</span>
              </button>
              <button className="text-gray-800 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-800 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SECONDARY NAV - Dark Green Background */}
      <div className="bg-[#1a4d2e] text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-xs font-medium flex-wrap">
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

