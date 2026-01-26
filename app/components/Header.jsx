import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {menu} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong className="brand-logo">BrinqueTEAndo</strong>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();
  const items = (menu || FALLBACK_HEADER_MENU).items;
  const normalizeUrl = (url) => {
    if (!url) return null;
    return url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;
  };
  const normalizedItems = items.map((item) => ({
    ...item,
    normalizedUrl: normalizeUrl(item.url),
    items: (item.items || []).map((child) => ({
      ...child,
      normalizedUrl: normalizeUrl(child.url),
    })),
  }));
  const hasHome = normalizedItems.some(
    (item) =>
      item.normalizedUrl === '/' ||
      item.normalizedUrl === '' ||
      item.title?.toLowerCase() === 'home',
  );
  const megaMenuGroups = buildMegaMenuGroups(normalizedItems);
  const megaMenuTrigger = megaMenuGroups[0]?.title || 'Explorar';
  const megaMenuTriggerUrl =
    megaMenuGroups[0]?.cta?.to ||
    megaMenuGroups[0]?.items?.[0]?.to ||
    '/collections';
  const megaMenuFeatureLink =
    megaMenuGroups
      .flatMap((group) => group.items)
      .find((item) => item.label?.toLowerCase().includes('sensorial'))?.to ||
    megaMenuGroups[0]?.cta?.to ||
    '/collections';
  const menuItems = hasHome
    ? normalizedItems
    : [
        {
          id: 'home',
          title: 'Home',
          normalizedUrl: '/',
        },
        ...normalizedItems,
      ];

  return (
    <nav className={className} role="navigation">
      {viewport === 'desktop' && megaMenuGroups.length ? (
        <div className="mega-menu">
          <NavLink
            className="header-menu-item mega-menu-trigger"
            end
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={megaMenuTriggerUrl}
          >
            {megaMenuTrigger}
          </NavLink>
          <div className="mega-menu-panel">
            <div className="mega-menu-grid">
              <div className="mega-menu-columns">
                {megaMenuGroups.map((group) => (
                  <div className="mega-menu-column" key={group.title}>
                    <h4 className="mega-menu-title">{group.title}</h4>
                    <div className="mega-menu-list">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.label}
                          className="mega-menu-link"
                          end
                          onClick={close}
                          prefetch="intent"
                          to={item.to}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                    <NavLink
                      className="mega-menu-cta"
                      end
                      onClick={close}
                      prefetch="intent"
                      to={group.cta.to}
                    >
                      {group.cta.label}
                    </NavLink>
                  </div>
                ))}
              </div>
              <div className="mega-menu-feature">
                <img
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"
                  alt="Criança brincando com brinquedos sensoriais"
                  className="mega-menu-feature-image"
                  loading="lazy"
                  decoding="async"
                />
                <p className="mega-menu-feature-text">
                  “Brincar também é uma forma de cuidar.”
                </p>
                <NavLink
                  className="mega-menu-feature-button"
                  end
                  onClick={close}
                  prefetch="intent"
                  to={megaMenuFeatureLink}
                >
                  Descobrir coleção sensorial
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {menuItems.map((item) => {
        if (!item.normalizedUrl) return null;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={item.normalizedUrl}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
const MEGA_MENU_ORDER = [
  'Brinquedos Terapêuticos',
  'Por Necessidade',
  'Por Idade',
  'Ambiente & Rotina',
  'Apoio aos Pais',
];

const MEGA_MENU_CTA_LABELS = {
  'Brinquedos Terapêuticos': 'Ver todos os brinquedos',
  'Por Necessidade': 'Encontrar soluções',
  'Por Idade': 'Ver por idade',
  'Ambiente & Rotina': 'Montar rotina',
  'Apoio aos Pais': 'Aprender com a gente',
};

const buildMegaMenuGroups = (menuItems) => {
  const menuGroups = menuItems.filter(
    (item) => item.items && item.items.length,
  );
  const orderedGroups = MEGA_MENU_ORDER.map((title) =>
    menuGroups.find((item) => item.title?.toLowerCase() === title.toLowerCase()),
  ).filter(Boolean);
  const remainingGroups = menuGroups.filter(
    (item) => !orderedGroups.includes(item),
  );
  return [...orderedGroups, ...remainingGroups]
    .map((item) => {
      const children = (item.items || [])
        .map((child) => ({
          label: child.title,
          to: child.normalizedUrl,
        }))
        .filter((child) => child.to);
      const ctaUrl = item.normalizedUrl || children[0]?.to || '/collections';
      return {
        title: item.title,
        items: children,
        cta: {
          label: MEGA_MENU_CTA_LABELS[item.title] || 'Ver todos',
          to: ctaUrl,
        },
      };
    })
    .filter((group) => group.items.length);
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'var(--color-muted)' : 'var(--color-dark)',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
