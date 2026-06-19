export interface CartItem {
  id: string;
  placementId: string;
  name: string;
  slug: string;
  dimensions: string;
  durationType: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  durationValue: number;
  price: number;
  imageUrl?: string | null;
}

export interface SiteStats {
  uniqueVisitors: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  monthlyGrowth: number;
  demographics: {
    age: { label: string; value: number }[];
    gender: { label: string; value: number }[];
    device: { label: string; value: number }[];
    geo: { label: string; value: number }[];
  };
}

export type DurationOption = {
  label: string;
  value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  multiplier: number;
  savings?: string;
};
