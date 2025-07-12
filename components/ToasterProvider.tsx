// // components/ToasterProvider.tsx
// "use client";

// import { Toaster } from "react-hot-toast";

// export function ToasterProvider() {
//   return <Toaster position="top-center" />;
// }

// "use client";

// import { Toaster } from "react-hot-toast";

// export function ToasterProvider() {
//   return (
//     <Toaster
//       toastOptions={{
//         duration: 4000,
//         style: {
//           fontSize: "14px",
//           fontWeight: 500,
//           borderRadius: "10px",
//           padding: "12px 16px",
//           boxShadow: "0 0 12px rgba(0, 0, 0, 0.08)",
//           background:
//             "linear-gradient(145deg, var(--color-home-warm-100), var(--color-sunlink-orange-100))",
//           color: "var(--color-sky-light-900)",
//         },
//         success: {
//           icon: "☀️",
//           style: {
//             background:
//               "linear-gradient(135deg, var(--color-sunlink-orange-100), var(--color-sunlink-orange-200))",
//             borderLeft: "6px solid var(--color-sunlink-orange-500)",
//             color: "var(--color-sunlink-orange-900)",
//             boxShadow: "0 0 8px var(--color-sunlink-orange-300)",
//           },
//         },
//         error: {
//           icon: "🌧️",
//           style: {
//             background:
//               "linear-gradient(135deg, var(--color-sunlink-blue-100), var(--color-sunlink-blue-200))",
//             borderLeft: "6px solid var(--color-sunlink-blue-500)",
//             color: "var(--color-sunlink-blue-900)",
//             boxShadow: "0 0 8px var(--color-sunlink-blue-300)",
//           },
//         },
//       }}
//     />
//   );
// }

"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        className: "toast-wrapper dark:toast-wrapper",
        style: {
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "10px",
          padding: "12px 16px",
        },
        success: {
          icon: "☀️",
          className: "toast-success dark:toast-success",
        },
        error: {
          icon: "🌧️",
          className: "toast-error dark:toast-error",
        },
      }}
    />
  );
}
