// Detects if device is on iOS
export const isIos = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

// Detects if device is in standalone mode
export const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;
