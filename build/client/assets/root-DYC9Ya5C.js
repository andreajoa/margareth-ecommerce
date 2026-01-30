import{o as qt,p as Mt,q as Ft,t as Ht,r as d,_ as Bt,v as ht,w as Dt,n as c,L as X,x as Yt,M as Zt,y as Qt,O as Wt,S as zt}from"./components-DIzj77dM.js";/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let _t="positions";function Kt({getKey:t,...e}){let{isSpaMode:r}=qt(),n=Mt(),a=Ft();Ht({getKey:t,storageKey:_t});let o=d.useMemo(()=>{if(!t)return null;let l=t(n,a);return l!==n.key?l:null},[]);if(r)return null;let i=((l,f)=>{if(!window.history.state||!window.history.state.key){let T=Math.random().toString(32).slice(2);window.history.replaceState({key:T},"")}try{let m=JSON.parse(sessionStorage.getItem(l)||"{}")[f||window.history.state.key];typeof m=="number"&&window.scrollTo(0,m)}catch(T){console.error(T),sessionStorage.removeItem(l)}}).toString();return d.createElement("script",Bt({},e,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${i})(${ht(JSON.stringify(_t))}, ${ht(JSON.stringify(o))})`}}))}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function Tt(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n,a,o=r.call(t),i=[];try{for(;(e===void 0||e-- >0)&&!(n=o.next()).done;)i.push(n.value)}catch(l){a={error:l}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(a)throw a.error}}return i}var H;(function(t){t[t.NotStarted=0]="NotStarted",t[t.Running=1]="Running",t[t.Stopped=2]="Stopped"})(H||(H={}));var $t={type:"xstate.init"};function ot(t){return t===void 0?[]:[].concat(t)}function Z(t){return{type:"xstate.assign",assignment:t}}function mt(t,e){return typeof(t=typeof t=="string"&&e&&e[t]?e[t]:t)=="string"?{type:t}:typeof t=="function"?{type:t.name,exec:t}:t}function et(t){return function(e){return t===e}}function wt(t){return typeof t=="string"?{type:t}:t}function Ct(t,e){return{value:t,context:e,actions:[],changed:!1,matches:et(t)}}function At(t,e,r){var n=e,a=!1;return[t.filter(function(o){if(o.type==="xstate.assign"){a=!0;var i=Object.assign({},n);return typeof o.assignment=="function"?i=o.assignment(n,r):Object.keys(o.assignment).forEach(function(l){i[l]=typeof o.assignment[l]=="function"?o.assignment[l](n,r):o.assignment[l]}),n=i,!1}return!0}),n,a]}function Nt(t,e){e===void 0&&(e={});var r=Tt(At(ot(t.states[t.initial].entry).map(function(i){return mt(i,e.actions)}),t.context,$t),2),n=r[0],a=r[1],o={config:t,_options:e,initialState:{value:t.initial,actions:n,context:a,matches:et(t.initial)},transition:function(i,l){var f,T,m=typeof i=="string"?{value:i,context:t.context}:i,E=m.value,h=m.context,A=wt(l),g=t.states[E];if(g.on){var y=ot(g.on[A.type]);try{for(var R=function(U){var z=typeof Symbol=="function"&&Symbol.iterator,F=z&&U[z],w=0;if(F)return F.call(U);if(U&&typeof U.length=="number")return{next:function(){return U&&w>=U.length&&(U=void 0),{value:U&&U[w++],done:!U}}};throw new TypeError(z?"Object is not iterable.":"Symbol.iterator is not defined.")}(y),P=R.next();!P.done;P=R.next()){var O=P.value;if(O===void 0)return Ct(E,h);var S=typeof O=="string"?{target:O}:O,b=S.target,s=S.actions,u=s===void 0?[]:s,p=S.cond,_=p===void 0?function(){return!0}:p,C=b===void 0,I=b??E,x=t.states[I];if(_(h,A)){var B=Tt(At((C?ot(u):[].concat(g.exit,u,x.entry).filter(function(U){return U})).map(function(U){return mt(U,o._options.actions)}),h,A),3),Q=B[0],W=B[1],rt=B[2],J=b??E;return{value:J,context:W,actions:Q,changed:b!==E||Q.length>0||rt,matches:et(J)}}}}catch(U){f={error:U}}finally{try{P&&!P.done&&(T=R.return)&&T.call(R)}finally{if(f)throw f.error}}}return Ct(E,h)}};return o}var St=function(t,e){return t.actions.forEach(function(r){var n=r.exec;return n&&n(t.context,e)})};function Xt(t){var e=t.initialState,r=H.NotStarted,n=new Set,a={_machine:t,send:function(o){r===H.Running&&(e=t.transition(e,o),St(e,wt(o)),n.forEach(function(i){return i(e)}))},subscribe:function(o){return n.add(o),o(e),{unsubscribe:function(){return n.delete(o)}}},start:function(o){if(o){var i=typeof o=="object"?o:{context:t.config.context,value:o};e={value:i.value,actions:[],context:i.context,matches:et(i.value)}}else e=t.initialState;return r=H.Running,St(e,$t),a},stop:function(){return r=H.Stopped,n.clear(),a},get state(){return e},get status(){return r}};return a}var Gt=d.useLayoutEffect,Ot={exports:{}},it={},ut={exports:{}},st={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bt;function Jt(){if(bt)return st;bt=1;var t=Dt;function e(E,h){return E===h&&(E!==0||1/E===1/h)||E!==E&&h!==h}var r=typeof Object.is=="function"?Object.is:e,n=t.useState,a=t.useEffect,o=t.useLayoutEffect,i=t.useDebugValue;function l(E,h){var A=h(),g=n({inst:{value:A,getSnapshot:h}}),y=g[0].inst,R=g[1];return o(function(){y.value=A,y.getSnapshot=h,f(y)&&R({inst:y})},[E,A,h]),a(function(){return f(y)&&R({inst:y}),E(function(){f(y)&&R({inst:y})})},[E]),i(A),A}function f(E){var h=E.getSnapshot;E=E.value;try{var A=h();return!r(E,A)}catch{return!0}}function T(E,h){return h()}var m=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?T:l;return st.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:m,st}var It;function te(){return It||(It=1,ut.exports=Jt()),ut.exports}/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rt;function ee(){if(Rt)return it;Rt=1;var t=Dt,e=te();function r(T,m){return T===m&&(T!==0||1/T===1/m)||T!==T&&m!==m}var n=typeof Object.is=="function"?Object.is:r,a=e.useSyncExternalStore,o=t.useRef,i=t.useEffect,l=t.useMemo,f=t.useDebugValue;return it.useSyncExternalStoreWithSelector=function(T,m,E,h,A){var g=o(null);if(g.current===null){var y={hasValue:!1,value:null};g.current=y}else y=g.current;g=l(function(){function P(u){if(!O){if(O=!0,S=u,u=h(u),A!==void 0&&y.hasValue){var p=y.value;if(A(p,u))return b=p}return b=u}if(p=b,n(S,u))return p;var _=h(u);return A!==void 0&&A(p,_)?p:(S=u,b=_)}var O=!1,S,b,s=E===void 0?null:E;return[function(){return P(m())},s===null?void 0:function(){return P(s())}]},[m,E,h,A]);var R=a(T,g[0],g[1]);return i(function(){y.hasValue=!0,y.value=R},[R]),f(R),R},it}Ot.exports=ee();var re=Ot.exports;function ne(t){var e=d.useRef();return e.current||(e.current={v:t()}),e.current.v}var ae=function(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),a,o=[],i;try{for(;(e===void 0||e-- >0)&&!(a=n.next()).done;)o.push(a.value)}catch(l){i={error:l}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(i)throw i.error}}return o};function oe(t){return t}var ie=function(t){var e;return t.subscribe(function(r){e=r}).unsubscribe(),e};function ue(t,e){var r=d.useRef(),n=ae(ne(function(){var l=[],f=Xt(Nt(t.config,e||t._options)),T=f.send;return f.send=function(m){if(f.status===H.NotStarted){l.push(m);return}T(m),r.current=f.state},[f,l]}),2),a=n[0],o=n[1];Gt(function(){e&&(a._machine._options=e)});var i=ce(a);return d.useEffect(function(){return a.start(r.current),o.forEach(a.send),r.current=a.state,function(){a.stop()}},[]),i}var se=function(t,e){return e.changed===!1};function ce(t){var e=d.useCallback(function(){return ie(t)},[t]),r=d.useCallback(function(a){var o=t.subscribe(a).unsubscribe;return o},[t]),n=re.useSyncExternalStoreWithSelector(r,e,e,oe,se);return[n,t.send,t]}function le(t){if(!t){const e=`flattenConnection(): needs a 'connection' to flatten, but received '${t??""}' instead.`;return console.error(e+" Returning an empty array"),[]}return"nodes"in t?t.nodes:"edges"in t&&Array.isArray(t.edges)?t.edges.map(e=>{if(!(e!=null&&e.node))throw new Error("flattenConnection(): Connection edges must contain nodes");return e.node}):[]}const de=t=>`
  mutation CartLineAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,fe=t=>`
  mutation CartCreate(
    $input: CartInput!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,ye=t=>`
  mutation CartLineRemove(
    $cartId: ID!
    $lines: [ID!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,pe=t=>`
  mutation CartLineUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,ve=t=>`
  mutation CartNoteUpdate(
    $cartId: ID!
    $note: String!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,ge=t=>`
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,Ee=t=>`
  mutation CartAttributesUpdate(
    $attributes: [AttributeInput!]!
    $cartId: ID!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,he=t=>`
  mutation CartDiscountCodesUpdate(
    $cartId: ID!
    $discountCodes: [String!]
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...CartFragment
      }
    }
  }

  ${t}
`,_e=t=>`
  query CartQuery(
    $id: ID!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cart(id: $id) {
      ...CartFragment
    }
  }

  ${t}
`,Te=`
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`,ft="2024-10";function me(t,e,r){return{"content-type":t==="graphql"?"application/graphql":"application/json","X-SDK-Variant":"hydrogen-react","X-SDK-Variant-Source":"react","X-SDK-Version":e,"X-Shopify-Storefront-Access-Token":r}}const Ce={storeDomain:"test",storefrontToken:"abc123",storefrontApiVersion:ft,countryIsoCode:"US",languageIsoCode:"EN",getStorefrontApiUrl(){return""},getPublicTokenHeaders(){return{}},getShopifyDomain(){return""}},Lt=d.createContext(Ce);function Ae(){var t,e,r;if(typeof window>"u")return!1;try{const n=(e=(t=window.performance)==null?void 0:t.getEntriesByType)==null?void 0:e.call(t,"navigation")[0];return!!((r=n==null?void 0:n.serverTiming)!=null&&r.some(a=>a.name==="_sfapi_proxy"))}catch{return!1}}function Se({children:t,...e}){if(!e.countryIsoCode||!e.languageIsoCode||!e.storeDomain||!e.storefrontToken||!e.storefrontApiVersion)throw new Error("Please provide the necessary props to '<ShopifyProvider/>'");e.storefrontApiVersion!==ft&&console.warn(`<ShopifyProvider/>: This version of Hydrogen React is built for Shopify's Storefront API version ${ft}, but it looks like you're using version ${e.storefrontApiVersion}. There may be issues or bugs if you use a mismatched version of Hydrogen React and the Storefront API.`);const r=d.useMemo(()=>{const n=e.sameDomainForStorefrontApi??Ae();function a(o){const i=(o==null?void 0:o.storeDomain)??e.storeDomain;return i.includes("://")?i:`https://${i}`}return{...e,sameDomainForStorefrontApi:n,getPublicTokenHeaders(o){return me(o.contentType,e.storefrontApiVersion,o.storefrontToken??e.storefrontToken)},getShopifyDomain:a,getStorefrontApiUrl(o){const i=n&&typeof window<"u"?window.location.origin:a({storeDomain:(o==null?void 0:o.storeDomain)??e.storeDomain});return`${i}${i.endsWith("/")?"":"/"}api/${(o==null?void 0:o.storefrontApiVersion)??e.storefrontApiVersion}/graphql.json`}}},[e]);return c.jsx(Lt.Provider,{value:r,children:t})}function Pt(){const t=d.useContext(Lt);if(!t)throw new Error("'useShop()' must be a descendent of <ShopifyProvider/>");return t}const ct="shopifyCartId",be="Shopify-Storefront-Id",Ie="Shopify-Storefront-Y",Re="Shopify-Storefront-S",xe="X-Shopify-VisitToken",Ue="X-Shopify-UniqueToken",lt={current:null};function De(t){var e,r,n;let a;if(typeof window<"u"&&typeof window.performance<"u")try{const o=/^https?:\/\/([^/]+)(\/api\/(?:unstable|2\d{3}-\d{2})\/graphql\.json(?=$|\?))?/,i=performance.getEntriesByType("resource");let l;for(let f=i.length-1;f>=0;f--){const T=i[f];if(T.initiatorType!=="fetch")continue;const m=window.location.host,E=T.name.match(o);if(!E)continue;const[,h,A]=E;if(h===m||A&&(h==null?void 0:h.endsWith(`.${m}`))){const y=xt(T);if(y){l=y;break}}}if(l&&(a=l),a?lt.current=a:lt.current&&(a=lt.current),!a){const f=performance.getEntriesByType("navigation")[0];a=xt(f,!1)}}catch{}if(!a){const o=typeof document<"u"?document.cookie:"";a={uniqueToken:((e=o.match(/\b_shopify_y=([^;]+)/))==null?void 0:e[1])||"",visitToken:((r=o.match(/\b_shopify_s=([^;]+)/))==null?void 0:r[1])||"",consent:((n=o.match(/\b_tracking_consent=([^;]+)/))==null?void 0:n[1])||""}}return a}function xt(t,e=!0){let r="",n="",a="";const o=t.serverTiming;if(o&&o.length>=3)for(let i=o.length-1;i>=0;i--){const{name:l,description:f}=o[i];if(!(!l||!f)&&(l==="_y"?r=f:l==="_s"?n=f:l==="_cmp"&&(a=f),r&&n&&a))break}return r&&n&&(!e||a)?{uniqueToken:r,visitToken:n,consent:a}:void 0}function $e(){const{storefrontId:t,getPublicTokenHeaders:e,getStorefrontApiUrl:r,sameDomainForStorefrontApi:n}=Pt();return d.useCallback(({query:a,variables:o})=>{const i=e({contentType:"json"});if(t&&(i[be]=t),!n){const{uniqueToken:l,visitToken:f}=De();l&&(i[Ie]=l,i[Ue]=l),f&&(i[Re]=f,i[xe]=f)}return fetch(r(),{method:"POST",headers:i,body:JSON.stringify({query:a.toString(),variables:o})}).then(l=>l.json()).catch(l=>({data:void 0,errors:l==null?void 0:l.toString()}))},[e,t,r,n])}function we({numCartLines:t,cartFragment:e,countryCode:r="US",languageCode:n="EN"}){const a=$e(),o=d.useCallback(g=>a({query:_e(e),variables:{id:g,numCartLines:t,country:r,language:n}}),[a,e,t,r,n]),i=d.useCallback(g=>a({query:fe(e),variables:{input:g,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),l=d.useCallback((g,y)=>a({query:de(e),variables:{cartId:g,lines:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),f=d.useCallback((g,y)=>a({query:pe(e),variables:{cartId:g,lines:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),T=d.useCallback((g,y)=>a({query:ye(e),variables:{cartId:g,lines:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),m=d.useCallback((g,y)=>a({query:ve(e),variables:{cartId:g,note:y,numCartLines:t,country:r,language:n}}),[a,e,t,r,n]),E=d.useCallback((g,y)=>a({query:ge(e),variables:{cartId:g,buyerIdentity:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),h=d.useCallback((g,y)=>a({query:Ee(e),variables:{cartId:g,attributes:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]),A=d.useCallback((g,y)=>a({query:he(e),variables:{cartId:g,discountCodes:y,numCartLines:t,country:r,language:n}}),[e,r,a,t,n]);return d.useMemo(()=>({cartFetch:o,cartCreate:i,cartLineAdd:l,cartLineUpdate:f,cartLineRemove:T,noteUpdate:m,buyerIdentityUpdate:E,cartAttributesUpdate:h,discountCodesUpdate:A,cartFragment:e}),[o,i,l,f,T,m,E,h,A,e])}function q(t,e){return{entry:[...(e==null?void 0:e.entryActions)||[],Z({lastValidCart:r=>r==null?void 0:r.cart}),"onCartActionEntry","onCartActionOptimisticUI",t],on:{RESOLVE:{target:(e==null?void 0:e.resolveTarget)||"idle",actions:[Z({prevCart:r=>r==null?void 0:r.lastValidCart,cart:(r,n)=>{var a;return(a=n==null?void 0:n.payload)==null?void 0:a.cart},rawCartResult:(r,n)=>{var a;return(a=n==null?void 0:n.payload)==null?void 0:a.rawCartResult},errors:r=>{}})]},ERROR:{target:(e==null?void 0:e.errorTarget)||"error",actions:[Z({prevCart:r=>r==null?void 0:r.lastValidCart,cart:r=>r==null?void 0:r.lastValidCart,errors:(r,n)=>{var a;return(a=n==null?void 0:n.payload)==null?void 0:a.errors}})]},CART_COMPLETED:{target:"cartCompleted",actions:Z({prevCart:r=>{},cart:r=>{},lastValidCart:r=>{},rawCartResult:r=>{},errors:r=>{}})}},exit:["onCartActionComplete",...(e==null?void 0:e.exitActions)||[]]}}const G={CART_FETCH:{target:"cartFetching"},CART_CREATE:{target:"cartCreating"},CART_SET:{target:"idle",actions:[Z({rawCartResult:(t,e)=>e.payload.cart,cart:(t,e)=>yt(e.payload.cart)})]}},Ut={CARTLINE_ADD:{target:"cartLineAdding"},CARTLINE_UPDATE:{target:"cartLineUpdating"},CARTLINE_REMOVE:{target:"cartLineRemoving"},NOTE_UPDATE:{target:"noteUpdating"},BUYER_IDENTITY_UPDATE:{target:"buyerIdentityUpdating"},CART_ATTRIBUTES_UPDATE:{target:"cartAttributesUpdating"},DISCOUNT_CODES_UPDATE:{target:"discountCodesUpdating"}};function Ne(t){return Nt({id:"Cart",initial:t?"idle":"uninitialized",context:{cart:t&&yt(t)},states:{uninitialized:{on:G},cartCompleted:{on:G},initializationError:{on:G},idle:{on:{...G,...Ut}},error:{on:{...G,...Ut}},cartFetching:q("cartFetchAction",{errorTarget:"initializationError"}),cartCreating:q("cartCreateAction",{errorTarget:"initializationError"}),cartLineRemoving:q("cartLineRemoveAction"),cartLineUpdating:q("cartLineUpdateAction"),cartLineAdding:q("cartLineAddAction"),noteUpdating:q("noteUpdateAction"),buyerIdentityUpdating:q("buyerIdentityUpdateAction"),cartAttributesUpdating:q("cartAttributesUpdateAction"),discountCodesUpdating:q("discountCodesUpdateAction")}})}function Oe({numCartLines:t,onCartActionEntry:e,onCartActionOptimisticUI:r,onCartActionComplete:n,data:a,cartFragment:o,countryCode:i,languageCode:l}){const{cartFetch:f,cartCreate:T,cartLineAdd:m,cartLineUpdate:E,cartLineRemove:h,noteUpdate:A,buyerIdentityUpdate:g,cartAttributesUpdate:y,discountCodesUpdate:R}=we({numCartLines:t,cartFragment:o,countryCode:i,languageCode:l}),P=d.useMemo(()=>Ne(a),[a]),[O,S,b]=ue(P,{actions:{cartFetchAction:async(s,u)=>{var p;if(u.type!=="CART_FETCH")return;const{data:_,errors:C}=await f((p=u==null?void 0:u.payload)==null?void 0:p.cartId),I=M(u,_==null?void 0:_.cart,C);S(I)},cartCreateAction:async(s,u)=>{var p;if(u.type!=="CART_CREATE")return;const{data:_,errors:C}=await T(u==null?void 0:u.payload),I=M(u,(p=_==null?void 0:_.cartCreate)==null?void 0:p.cart,C);S(I)},cartLineAddAction:async(s,u)=>{var p,_;if(u.type!=="CARTLINE_ADD"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await m(s.cart.id,u.payload.lines),x=M(u,(_=C==null?void 0:C.cartLinesAdd)==null?void 0:_.cart,I);S(x)},cartLineUpdateAction:async(s,u)=>{var p,_;if(u.type!=="CARTLINE_UPDATE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await E(s.cart.id,u.payload.lines),x=M(u,(_=C==null?void 0:C.cartLinesUpdate)==null?void 0:_.cart,I);S(x)},cartLineRemoveAction:async(s,u)=>{var p,_;if(u.type!=="CARTLINE_REMOVE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await h(s.cart.id,u.payload.lines),x=M(u,(_=C==null?void 0:C.cartLinesRemove)==null?void 0:_.cart,I);S(x)},noteUpdateAction:async(s,u)=>{var p,_;if(u.type!=="NOTE_UPDATE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await A(s.cart.id,u.payload.note),x=M(u,(_=C==null?void 0:C.cartNoteUpdate)==null?void 0:_.cart,I);S(x)},buyerIdentityUpdateAction:async(s,u)=>{var p,_;if(u.type!=="BUYER_IDENTITY_UPDATE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await g(s.cart.id,u.payload.buyerIdentity),x=M(u,(_=C==null?void 0:C.cartBuyerIdentityUpdate)==null?void 0:_.cart,I);S(x)},cartAttributesUpdateAction:async(s,u)=>{var p,_;if(u.type!=="CART_ATTRIBUTES_UPDATE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await y(s.cart.id,u.payload.attributes),x=M(u,(_=C==null?void 0:C.cartAttributesUpdate)==null?void 0:_.cart,I);S(x)},discountCodesUpdateAction:async(s,u)=>{var p,_;if(u.type!=="DISCOUNT_CODES_UPDATE"||!((p=s==null?void 0:s.cart)!=null&&p.id))return;const{data:C,errors:I}=await R(s.cart.id,u.payload.discountCodes),x=M(u,(_=C==null?void 0:C.cartDiscountCodesUpdate)==null?void 0:_.cart,I);S(x)},...e&&{onCartActionEntry:(s,u)=>{Le(u)&&e(s,u)}},...r&&{onCartActionOptimisticUI:Z((s,u)=>r(s,u))},...n&&{onCartActionComplete:(s,u)=>{Pe(u)&&n(s,u)}}}});return d.useMemo(()=>[O,S,b],[O,S,b])}function yt(t){return{...t,lines:le(t==null?void 0:t.lines),note:t.note??void 0}}function M(t,e,r){return r?{type:"ERROR",payload:{errors:r,cartActionEvent:t}}:e?{type:"RESOLVE",payload:{cart:yt(e),rawCartResult:e,cartActionEvent:t}}:{type:"CART_COMPLETED",payload:{cartActionEvent:t}}}function Le(t){return t.type==="CART_CREATE"||t.type==="CARTLINE_ADD"||t.type==="CARTLINE_UPDATE"||t.type==="CARTLINE_REMOVE"||t.type==="NOTE_UPDATE"||t.type==="BUYER_IDENTITY_UPDATE"||t.type==="CART_ATTRIBUTES_UPDATE"||t.type==="DISCOUNT_CODES_UPDATE"}function Pe(t){return t.type==="RESOLVE"||t.type==="ERROR"||t.type==="CART_COMPLETED"}const ke=d.createContext(null);function je({children:t,numCartLines:e,onCreate:r,onLineAdd:n,onLineRemove:a,onLineUpdate:o,onNoteUpdate:i,onBuyerIdentityUpdate:l,onAttributesUpdate:f,onDiscountCodesUpdate:T,onCreateComplete:m,onLineAddComplete:E,onLineRemoveComplete:h,onLineUpdateComplete:A,onNoteUpdateComplete:g,onBuyerIdentityUpdateComplete:y,onAttributesUpdateComplete:R,onDiscountCodesUpdateComplete:P,data:O,cartFragment:S=Te,customerAccessToken:b,countryCode:s,languageCode:u}){var p,_,C,I,x,B,Q;const W=Pt();if(!W)throw new Error("<CartProvider> needs to be a descendant of <ShopifyProvider>");s=(s??W.countryIsoCode??"US").toUpperCase(),u=(u??W.languageIsoCode??"EN").toUpperCase(),s&&(s=s.toUpperCase());const[rt,J]=d.useState(s),[U,z]=d.useState(b),F=d.useRef(!1);(rt!==s||U!==b)&&(J(s),z(b),F.current=!1);const[w,Y]=Oe({numCartLines:e,data:O,cartFragment:S,countryCode:s,languageCode:u,onCartActionEntry(v,D){try{switch(D.type){case"CART_CREATE":return r==null?void 0:r();case"CARTLINE_ADD":return n==null?void 0:n();case"CARTLINE_REMOVE":return a==null?void 0:a();case"CARTLINE_UPDATE":return o==null?void 0:o();case"NOTE_UPDATE":return i==null?void 0:i();case"BUYER_IDENTITY_UPDATE":return l==null?void 0:l();case"CART_ATTRIBUTES_UPDATE":return f==null?void 0:f();case"DISCOUNT_CODES_UPDATE":return T==null?void 0:T()}}catch(N){console.error("Cart entry action failed",N)}},onCartActionOptimisticUI(v,D){var N,V,$,K;if(!v.cart)return{...v};switch(D.type){case"CARTLINE_REMOVE":return{...v,cart:{...v.cart,lines:(V=(N=v==null?void 0:v.cart)==null?void 0:N.lines)==null?void 0:V.filter(k=>(k==null?void 0:k.id)&&!D.payload.lines.includes(k==null?void 0:k.id))}};case"CARTLINE_UPDATE":return{...v,cart:{...v.cart,lines:(K=($=v==null?void 0:v.cart)==null?void 0:$.lines)==null?void 0:K.map(k=>{const at=D.payload.lines.find(({id:Vt})=>Vt===(k==null?void 0:k.id));return at&&at.quantity?{...k,quantity:at.quantity}:k})}}}return{...v}},onCartActionComplete(v,D){const N=D.payload.cartActionEvent;try{switch(D.type){case"RESOLVE":switch(N.type){case"CART_CREATE":return m==null?void 0:m();case"CARTLINE_ADD":return E==null?void 0:E();case"CARTLINE_REMOVE":return h==null?void 0:h();case"CARTLINE_UPDATE":return A==null?void 0:A();case"NOTE_UPDATE":return g==null?void 0:g();case"BUYER_IDENTITY_UPDATE":return Me(v,N)&&(F.current=!0),y==null?void 0:y();case"CART_ATTRIBUTES_UPDATE":return R==null?void 0:R();case"DISCOUNT_CODES_UPDATE":return P==null?void 0:P()}}}catch(V){console.error("onCartActionComplete failed",V)}}}),tt=d.useRef(!1),[pt,kt]=d.useState(!1),vt=w.matches("cartCompleted"),gt=(w.value==="idle"||w.value==="error"||w.value==="cartCompleted")&&s!==((C=(_=(p=w==null?void 0:w.context)==null?void 0:p.cart)==null?void 0:_.buyerIdentity)==null?void 0:C.countryCode)&&!w.context.errors,Et=d.useRef(!1);d.useEffect(()=>{if(!tt.current&&!Et.current){if(!O&&dt("localStorage")){Et.current=!0;try{const v=window.localStorage.getItem(ct);v&&Y({type:"CART_FETCH",payload:{cartId:v}})}catch(v){console.warn("error fetching cartId"),console.warn(v)}}tt.current=!0,kt(!0)}},[O,tt,Y]),d.useEffect(()=>{!gt||F.current||Y({type:"BUYER_IDENTITY_UPDATE",payload:{buyerIdentity:{countryCode:s,customerAccessToken:b}}})},[s,b,gt,F,Y]);const j=d.useCallback(v=>{if(!tt.current)return console.warn("Cart isn't ready yet");Y(v)},[Y]);d.useEffect(()=>{var v,D,N;if((D=(v=w==null?void 0:w.context)==null?void 0:v.cart)!=null&&D.id&&dt("localStorage"))try{window.localStorage.setItem(ct,(N=w.context.cart)==null?void 0:N.id)}catch(V){console.warn("Failed to save cartId to localStorage",V)}},[(x=(I=w==null?void 0:w.context)==null?void 0:I.cart)==null?void 0:x.id]),d.useEffect(()=>{if(vt&&dt("localStorage"))try{window.localStorage.removeItem(ct)}catch(v){console.warn("Failed to delete cartId from localStorage",v)}},[vt]);const nt=d.useCallback(v=>{var D,N;s&&!((D=v.buyerIdentity)!=null&&D.countryCode)&&(v.buyerIdentity==null&&(v.buyerIdentity={}),v.buyerIdentity.countryCode=s),b&&!((N=v.buyerIdentity)!=null&&N.customerAccessToken)&&(v.buyerIdentity==null&&(v.buyerIdentity={}),v.buyerIdentity.customerAccessToken=b),j({type:"CART_CREATE",payload:v})},[s,b,j]),L=qe(w),jt=d.useMemo(()=>{var v,D,N,V;return{...((v=L==null?void 0:L.context)==null?void 0:v.cart)??{lines:[],attributes:[]},status:Ve(L.value),error:(D=L==null?void 0:L.context)==null?void 0:D.errors,totalQuantity:((V=(N=L==null?void 0:L.context)==null?void 0:N.cart)==null?void 0:V.totalQuantity)??0,cartCreate:nt,cartReady:pt,linesAdd($){var K,k;(k=(K=L==null?void 0:L.context)==null?void 0:K.cart)!=null&&k.id?j({type:"CARTLINE_ADD",payload:{lines:$}}):nt({lines:$})},linesRemove($){j({type:"CARTLINE_REMOVE",payload:{lines:$}})},linesUpdate($){j({type:"CARTLINE_UPDATE",payload:{lines:$}})},noteUpdate($){j({type:"NOTE_UPDATE",payload:{note:$}})},buyerIdentityUpdate($){j({type:"BUYER_IDENTITY_UPDATE",payload:{buyerIdentity:$}})},cartAttributesUpdate($){j({type:"CART_ATTRIBUTES_UPDATE",payload:{attributes:$}})},discountCodesUpdate($){j({type:"DISCOUNT_CODES_UPDATE",payload:{discountCodes:$}})},cartFragment:S}},[nt,pt,(B=L==null?void 0:L.context)==null?void 0:B.cart,(Q=L==null?void 0:L.context)==null?void 0:Q.errors,L.value,S,j]);return c.jsx(ke.Provider,{value:jt,children:t})}function Ve(t){switch(t){case"uninitialized":case"initializationError":return"uninitialized";case"idle":case"cartCompleted":case"error":return"idle";case"cartFetching":return"fetching";case"cartCreating":return"creating";case"cartLineAdding":case"cartLineRemoving":case"cartLineUpdating":case"noteUpdating":case"buyerIdentityUpdating":case"cartAttributesUpdating":case"discountCodesUpdating":return"updating"}}function qe(t){const[e,r]=d.useTransition(),[n,a]=d.useState(t),o=d.useRef(!1);e&&(o.current=!0);const i=d.useRef(!1);return!e&&o.current&&(i.current=!0),d.useEffect(()=>{r(()=>{i.current||a(t)})},[t]),i.current?t:n}function dt(t){let e;try{e=window[t];const r="__storage_test__";return e.setItem(r,r),e.removeItem(r),!0}catch(r){return!!(r instanceof DOMException&&(r.code===22||r.code===1014||r.name==="QuotaExceededError"||r.name==="NS_ERROR_DOM_QUOTA_REACHED")&&e&&e.length!==0)}}function Me(t,e){var r,n;return!!(e.payload.buyerIdentity.countryCode&&((n=(r=t.cart)==null?void 0:r.buyerIdentity)==null?void 0:n.countryCode)!==e.payload.buyerIdentity.countryCode)}function Fe({menu:t}){var e;return c.jsx("header",{children:c.jsxs("div",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[c.jsx("a",{href:"/",className:"brand","aria-label":"Página inicial",style:{display:"inline-flex",alignItems:"center"},children:c.jsx("img",{src:"/logo.svg",alt:"BrinqueTEAndo",style:{height:"40px"}})}),c.jsx("nav",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:(e=t==null?void 0:t.items)!=null&&e.length?t.items.map(r=>{var n;return(n=r.url)!=null&&n.startsWith("http")?c.jsx("a",{href:r.url,rel:"noopener",style:{color:"var(--brand-blue)"},children:r.title},r.id):c.jsx(X,{to:r.url||"/",style:{color:"var(--brand-blue)"},children:r.title},r.id)}):c.jsxs(c.Fragment,{children:[c.jsx(X,{to:"/",children:"Início"}),c.jsx(X,{to:"/collections/sensory-toys",children:"Coleções"}),c.jsx(X,{to:"/collections/by-age",children:"Por Idade"}),c.jsx(X,{to:"/collections/by-skill",children:"Por Habilidade"})]})})]})})}function He({menu:t}){return c.jsxs("footer",{children:[c.jsxs("div",{className:"container",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[c.jsxs("div",{children:[c.jsx("strong",{children:"BrinqueTEAndo"}),c.jsx("p",{children:"Brinquedos educativos com foco em TEA/TDAH."})]}),c.jsxs("div",{children:[c.jsx("strong",{children:"Menu"}),c.jsx("ul",{style:{listStyle:"none",padding:0},children:((t==null?void 0:t.items)||[]).map(e=>c.jsx("li",{children:c.jsx("a",{href:e.url||"/",children:e.title})},e.id))})]}),c.jsxs("div",{children:[c.jsx("strong",{children:"Contato"}),c.jsx("p",{children:"WhatsApp: (xx) xxxx-xxxx"}),c.jsx("p",{children:"Email: contato@brinqueteando.com"})]}),c.jsxs("div",{children:[c.jsx("strong",{children:"Newsletter"}),c.jsxs("form",{onSubmit:e=>e.preventDefault(),children:[c.jsx("input",{type:"email",placeholder:"Seu e-mail",required:!0}),c.jsx("button",{className:"btn-primary",type:"submit",children:"Assinar"})]})]})]}),c.jsx("div",{className:"container",style:{marginTop:"12px"},children:c.jsx("small",{children:"© 2026 BrinqueTEAndo. Todos os direitos reservados."})})]})}const Ye=()=>[{title:"BrinqueTEAndo"}],Ze=()=>[{rel:"stylesheet",href:"/app.css"}];function Qe(){const t=Yt();return c.jsxs("html",{lang:"pt-BR",children:[c.jsxs("head",{children:[c.jsx("meta",{charSet:"utf-8"}),c.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),c.jsx(Zt,{}),c.jsx(Qt,{}),c.jsx("style",{children:`
          :root {
            --brand-blue-light: #8ECAE7;
            --brand-blue-dark: #21388D;
            --brand-blue: #3292D8;
            --brand-red: #CF111A;
            --brand-yellow: #DEC91F;
            --brand-gray-blue: #7D8FA4;
            --brand-beige: #EAD9B9;
          }
          body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; background: #fff; color: #111; }
          a { color: var(--brand-blue); text-decoration: none; }
          .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
          .btn-primary { background: var(--brand-blue-light); color: var(--brand-blue-dark); padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          .btn-secondary { background: var(--brand-blue); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          header { padding: 12px 16px; border-bottom: 1px solid #eee; }
          header .brand { font-weight: 800; color: var(--brand-blue-dark); }
          footer { margin-top: 48px; padding: 24px 16px; background: #f8fafc; border-top: 1px solid #eee; }
        `})]}),c.jsxs("body",{children:[c.jsx(Se,{storefrontApiVersion:t.shop.apiVersion,storeDomain:`https://${t.shop.storeDomain}`,storefrontToken:t.shop.storefrontToken,country:t.shop.country,language:t.shop.language,children:c.jsxs(je,{children:[c.jsx(Fe,{menu:t.menus.header}),c.jsx("main",{className:"container",children:c.jsx(Wt,{})}),c.jsx(He,{menu:t.menus.footer})]})}),c.jsx(Kt,{}),c.jsx(zt,{})]})]})}export{Qe as default,Ze as links,Ye as meta};
