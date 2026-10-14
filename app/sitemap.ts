import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/legal";

const ROUTES = [
  "", "/about-us", "/trading-account", "/market", "/market/forex-detail", "/market/commodities-detail", "/market/indices-detail",
  "/market/us-shares-detail", "/market/uae-shares-detail", "/meta-trader-5", "/trading-conditions", "/trading-calculators",
  "/fast-execution", "/fund-security", "/risk-management", "/acuity", "/partnership", "/institutional-solutions", "/promotion",
  "/news-insights", "/economic-calendar", "/help-centre", "/contact-us", ...Object.keys(LEGAL).map((k) => `/${k}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `https://tattvammarkets.com/en${r}`, changeFrequency: "weekly", priority: r === "" ? 1 : 0.7 }));
}
