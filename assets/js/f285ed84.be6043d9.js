(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{111:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return s}));var o=n(3),r=(n(0),n(115));const a={id:"h3ToGeoDesc",title:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",sidebar_label:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",slug:"/core-library/h3ToGeoDesc"},i={unversionedId:"core-library/h3ToGeoDesc",id:"core-library/h3ToGeoDesc",isDocsHomePage:!1,title:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",description:"This operation is performed by function h3ToGeo. See the comments in the function source code for more detail.",source:"@site/docs/core-library/h3ToGeoDesc.md",slug:"/core-library/h3ToGeoDesc",permalink:"/docs/core-library/h3ToGeoDesc",editUrl:"https://github.com/uber/h3/edit/master/website/docs/core-library/h3ToGeoDesc.md",version:"current",sidebar_label:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",sidebar:"someSidebar",previous:{title:"Conversion from latitude/longitude to containing H3 cell index",permalink:"/docs/core-library/geoToH3desc"},next:{title:"Generate the cell boundary in latitude/longitude coordinates of an H3Index cell",permalink:"/docs/core-library/h3ToGeoBoundaryDesc"}},c=[],l={toc:c};function s({components:e,...t}){return Object(r.b)("wrapper",Object(o.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"This operation is performed by function ",Object(r.b)("inlineCode",{parentName:"p"},"h3ToGeo"),". See the comments in the function source code for more detail."),Object(r.b)("p",null,"The conversion is performed as a series of coordinate system conversions described below. See the page ",Object(r.b)("a",{parentName:"p",href:"/docs/core-library/coordsystems"},"Coordinate Systems used by the H3 Core Library")," for more information on each of these coordinate systems."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"The function ",Object(r.b)("inlineCode",{parentName:"li"},"_h3ToFaceIjk")," then converts the H3 index to the appropriate icosahedron face number and normalized ",Object(r.b)("em",{parentName:"li"},"ijk")," coordinate's on that face's coordinate system as follows:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"We start by assuming that the cell center point falls on the same icosahedron face as its base cell."),Object(r.b)("li",{parentName:"ul"},"It is possible that the the cell center point lies on an adjacent face (termed an ",Object(r.b)("em",{parentName:"li"},"overage")," in the code), in which case we would need to use a projection centered on that adjacent face instead. We recall that normalized ",Object(r.b)("em",{parentName:"li"},"ijk")," coordinates have at most two non-zero components, and that in a face-centered Class II system the sum of those components is a resolution-specific constant value for cells that lie on the edge of that icosahedral face.\nWe determine whether an overage exists by taking the sum of the ",Object(r.b)("em",{parentName:"li"},"ijk")," components, and if there is an overage the positive ",Object(r.b)("em",{parentName:"li"},"ijk")," components indicate which adjacent face the cell center lies on. A lookup operation is then performed to find the appropriate rotation and translation to transform the ",Object(r.b)("em",{parentName:"li"},"ijk")," coordinates into the adjacent face-centered ",Object(r.b)("em",{parentName:"li"},"ijk")," system.")))),Object(r.b)("div",{align:"center"},Object(r.b)("img",{height:"300",src:"/images/triEdge.png"})),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"The face-centered ",Object(r.b)("em",{parentName:"li"},"ijk")," coordinates are then converted into corresponding ",Object(r.b)("em",{parentName:"li"},"Hex2d")," coordinates using the function ",Object(r.b)("inlineCode",{parentName:"li"},"_ijkToHex2d"),"."),Object(r.b)("li",{parentName:"ul"},"The function ",Object(r.b)("inlineCode",{parentName:"li"},"_hex2dToGeo")," takes the ",Object(r.b)("em",{parentName:"li"},"Hex2d")," coordinates and scales them into face-centered gnomonic coordinates, and then performs an inverse gnomonic projection to get the latitude/longitude coordinates.")))}s.isMDXComponent=!0},115:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),d=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=d(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=d(n),b=o,m=p["".concat(i,".").concat(b)]||p[b]||u[b]||a;return n?r.a.createElement(m,c(c({ref:t},s),{},{components:n})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);