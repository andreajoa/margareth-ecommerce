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

      {/* TOP COUNTDOWN BAR - Light Blue Background */}
      <div className="bg-[#A8D5E2] text-[#2C3E50] py-4 text-center border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xl">❤️</span>
            <span className="text-base md:text-lg font-bold tracking-wide uppercase">
              VALENTINES DAY COUNTDOWN!
            </span>
            <span className="text-xl">❤️</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-bold">
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs font-normal uppercase tracking-wider">Days</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs font-normal uppercase tracking-wider">Hours</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs font-normal uppercase tracking-wider">Minutes</span>
            </div>
            <span>:</span>
            <div className="flex flex-col items-center">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs font-normal uppercase tracking-wider">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE BANNER - Light Blue Background */}
      <div className="w-full bg-[#A8D5E2] border-b-2 border-gray-300 overflow-hidden py-6">
        <div className="animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 whitespace-nowrap">
              <span className="text-2xl mr-3">💝</span>
              <span className="text-[#2C3E50] text-xl md:text-2xl font-medium uppercase tracking-wider">
                THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER
              </span>
              <span className="text-2xl ml-3">💕</span>
              <div className="ml-8 flex items-center gap-2 opacity-50">
                <span className="text-[#2C3E50] text-xs">✦</span>
                <span className="w-16 h-[1px] bg-[#2C3E50]"></span>
                <span className="text-[#2C3E50] text-xs">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS BAR - Light Blue Background */}
      <div className="bg-[#A8D5E2] py-6 border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm md:text-base text-[#2C3E50]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💝</span>
              <div className="text-center">
                <div className="font-bold">Valentine's Watch Privileges</div>
                <div className="text-xs">Quality timepieces</div>
              </div>
            </div>
            
            <span className="text-3xl font-serif text-[#C9A961]">&</span>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="font-bold">Unwrap Luxury</div>
            </div>
            
            <span className="text-3xl font-serif text-[#C9A961]">&</span>
            
            <div className="text-center">
              <div className="font-bold">Benefits</div>
            </div>
            
            <span className="text-3xl font-serif text-[#C9A961]">&</span>
            
            <div className="text-center">
              <div className="font-bold">Guaranteed</div>
              <div className="text-xs">1 Year Warranty</div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Plus</span>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-xl">$20 Gift Card</div>
              <div className="text-xs">per $100 spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMO CODE SECTION - White Background */}
      <div className="bg-white py-5 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-2xl">💋</span>
            <span className="font-semibold text-gray-800">Use code:</span>
            <span className="bg-[#2C3E50] text-white font-bold px-5 py-2 rounded text-lg tracking-wider">
              VDAY25
            </span>
            <span className="font-semibold text-gray-800">for 25% OFF</span>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Limited New Year's selection available now! Offer ends soon.
          </p>
        </div>
      </div>

      {/* FREE SHIPPING BANNER - Red Background */}
      <div className="bg-red-600 text-white py-3 text-center border-b-2 border-red-700">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="font-bold text-sm md:text-base">
            FREE SHIPPING to USA, UK, Canada & Australia!
          </span>
        </div>
      </div>

      {/* CONFIDENCE SECTION - Beige Background */}
      <div className="bg-[#F5F5DC] py-8 border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-serif text-gray-900 mb-8 flex items-center justify-center gap-2">
            <span className="text-3xl">🎁</span>
            <span className="font-bold">SHOP WATCHES WITH CONFIDENCE:</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center text-sm">
            <div>
              <div className="font-bold text-gray-900 mb-2">
                <span className="text-green-600">Guaranteed</span> in Time for Valentines Day
              </div>
              <div className="text-gray-700">
                💝 Order by 2/11 at 5PM ET (USA/UK/CAN). <a href="#" className="underline hover:text-gray-900">Details</a>
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-2">
                <span className="text-green-600">Best</span> Watch Price Guarantee
              </div>
              <div className="text-gray-700">
                Price match within 30 days. <a href="#" className="underline hover:text-gray-900">Details</a>
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-2">
                <span className="text-green-600">Easy</span> Returns
              </div>
              <div className="text-gray-700">
                Free returns until 3/03. <a href="#" className="underline hover:text-gray-900">Details</a>
              </div>
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

