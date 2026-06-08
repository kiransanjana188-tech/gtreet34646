export interface StoryParity {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  theme: "sunset" | "happy" | "sad" | "painful" | "recovery" | "success" | "ending";
  timeEstimate: string; // Reading duration label
}

export type ParticleType = 
  | "sunset_sparkle" 
  | "heart" 
  | "rain" 
  | "torn_paper" 
  | "falling_leaf" 
  | "rising_orb" 
  | "candle_glow" 
  | "lantern";
