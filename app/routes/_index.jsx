import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    {title: 'Brinquedos Educativos TDAH e Autismo | BrinqueTEAndo'},
    {name: 'description', content: 'Brinquedos educativos especializados para crianças com TDAH e autismo. Desenvolvimento cognitivo e sensorial. Frete grátis para todo Brasil.'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  
  // Fetch main menu from Shopify
  const {menu: mainMenu} = await storefront.query(MAIN_MENU_QUERY, {
    variables: {handle: 'main-menu'}
  });

  return {mainMenu};
}

export default function Homepage() {
  const {mainMenu} = useLoaderData();
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({
    name: 'Valentine\'s Day', 
    emoji: '❤️', 
    message: 'VALENTINES DAY COUNTDOWN!'
  });

  const calculateValentinesCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Valentine's Day - February 14
    let valentinesDay = new Date(currentYear, 1, 14, 23, 59, 59);
    
    // If Valentine's Day has passed this year, set it for next year
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
    <div className="w-full overflow-x-hidden bg-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* TOP COUNTDOWN BAR */}
      <div className="bg-red-700 text-white py-3 text-center w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-sm md:text-base font-bold tracking-wide">
            {currentHoliday.emoji} {currentHoliday.message} {currentHoliday.emoji}
          </span>
          <div className="flex items-center gap-2 border-2 border-white px-4 py-2 bg-white/10 rounded">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Days</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Hours</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Minutes</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROMOTIONAL SCROLL BAR */}
      <div className="w-full bg-gradient-to-r from-red-100 via-pink-100 to-red-100 border-y-2 border-red-700 overflow-hidden py-3 relative">
        <div className="animate-marquee flex items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 whitespace-nowrap">
              <span className="text-2xl mr-3">💝</span>
              <span className="text-red-700 font-serif italic text-xl tracking-widest font-medium uppercase">
                THIS VALENTINES DAY, GIFT A WATCH THEY WILL TREASURE FOREVER
              </span>
              <span className="text-2xl ml-3">💕</span>
              <div className="ml-8 flex items-center gap-2 opacity-70">
                <span className="text-red-700 text-xs">✦</span>
                <span className="w-16 h-[1px] bg-red-700"></span>
                <span className="text-red-700 text-xs">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS BAR */}
      <div className="bg-beige-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">💝</span>
              <div>
                <div className="font-semibold text-gray-900">Valentine\'s Watch Privileges</div>
                <div className="text-gray-600">Quality timepieces</div>
              </div>
            </div>
            <span className="text-2xl text-amber-600">&</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <div>
                <div className="font-semibold text-gray-900">Unwrap Luxury</div>
              </div>
            </div>
            <span className="text-2xl text-amber-600">&</span>
            <div className="flex items-center gap-2">
              <div>
                <div className="font-semibold text-gray-900">Benefits</div>
              </div>
            </div>
            <span className="text-2xl text-amber-600">&</span>
            <div className="flex items-center gap-2">
              <div>
                <div className="font-semibold text-gray-900">Guaranteed</div>
                <div className="text-gray-600">1 Year Warranty</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">Plus</span>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="font-bold text-xl text-gray-900">$20 Gift Card</div>
                <div className="text-gray-600 text-xs">per $100 spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMO CODE SECTION */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-2xl">💋</span>
            <span className="font-semibold text-gray-900">Use code:</span>
            <span className="bg-red-700 text-white font-bold px-4 py-2 rounded text-lg">VDAY25</span>
            <span className="font-semibold text-gray-900">for 25% OFF</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Limited New Year\'s selection available now! Offer ends soon.
          </p>
        </div>
      </div>

      {/* FREE SHIPPING BANNER */}
      <div className="bg-red-600 text-white py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="font-bold">FREE SHIPPING to USA, UK, Canada & Australia!</span>
        </div>
      </div>

      {/* CONFIDENCE SECTION */}
      <div className="bg-amber-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl font-serif text-gray-900 mb-6 flex items-center justify-center gap-2">
            <span className="text-3xl">🎁</span>
            SHOP WATCHES WITH CONFIDENCE:
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-1">
                <span className="text-green-600">Guaranteed</span> in Time for Valentines Day
              </div>
              <div className="text-gray-600">
                💝 Order by 2/11 at 5PM ET (USA/UK/CAN). <a href="#" className="underline">Details</a>
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-1">
                <span className="text-green-600">Best</span> Watch Price Guarantee
              </div>
              <div className="text-gray-600">
                Price match within 30 days. <a href="#" className="underline">Details</a>
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-1">
                <span className="text-green-600">Easy</span> Returns
              </div>
              <div className="text-gray-600">
                Free returns until 3/03. <a href="#" className="underline">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      {mainMenu && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl font-serif font-bold text-gray-900">
                VASTARA
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {mainMenu.items?.map((item) => (
                  <Link
                    key={item.id}
                    to={item.url || '/'}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 uppercase tracking-wider"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-700 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="text-gray-700 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button className="text-gray-700 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* SECONDARY NAV */}
      <div className="bg-emerald-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span>🎄</span>
              <span className="font-medium">FREE SHIPPING (USA/UK/CA/AU)</span>
            </div>
            <span>•</span>
            <div className="font-medium">1-YEAR WARRANTY</div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span>🎁</span>
              <span className="font-medium">EASY RETURNS</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif text-center text-gray-900 mb-8">
            Welcome to Our Store
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive Valentine\'s Day collection. Find the perfect timepiece to treasure forever.
          </p>
        </div>
      </main>
    </div>
  );
}

// GraphQL Query for Main Menu from Shopify
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

