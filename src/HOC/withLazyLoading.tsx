import React from "react";
import Preloader from "../assets/Preloader/Preloader";
const LazyLoading = (Component: React.ComponentType) => {
  return (
    <React.Suspense fallback={<Preloader/>}>
      <Component />
    </React.Suspense>
  );
};
export default LazyLoading;

// return (props) => {
//   return (
//     <React.Suspense fallback={Preloader}>
//       <Component />
//     </React.Suspense>
//   )
// }
