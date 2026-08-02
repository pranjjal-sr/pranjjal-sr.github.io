// All image URLs loaded from environment variables
// To update images: edit .env file only, no code changes needed

export const images = {
  heroBg: import.meta.env.VITE_HERO_BG_URL,
  about: import.meta.env.VITE_ABOUT_IMG_URL,
  featureSip: import.meta.env.VITE_FEATURE_SIP_URL,
  featureMarket: import.meta.env.VITE_FEATURE_MARKET_URL,
  featurePortfolio: import.meta.env.VITE_FEATURE_PORTFOLIO_URL,
}
