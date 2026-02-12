import {Link, useRouteLoaderData} from 'react-router';

export function NavigationMenu({rootData}) {
  const {menu} = rootData || {};

  return (
    <nav className="bg-[#0A3D2F] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            BrinqueTEAndo
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menu?.items?.map((item) => (
              item.url?.startsWith('http') ? (
                <a
                  key={item.id}
                  href={item.url}
                  className="text-white hover:text-[#D4AF69] transition-colors text-sm font-medium tracking-wide"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.url || '/'}
                  className="text-white hover:text-[#D4AF69] transition-colors text-sm font-medium tracking-wide"
                >
                  {item.title}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
