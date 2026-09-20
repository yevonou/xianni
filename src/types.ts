export interface ResumeAchievement {
  number: string;
  category: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

export interface ProjectData {
  id: string;
  number: string;
  category: string;
  name: string;
  headline: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  caseDetails: {
    testedTool: string;
    objective: string;
    metrics: { label: string; value: string }[];
    reproducibleTakeaways: string[];
    hardwareEnvironment: string;
  };
}

export interface MarqueeItem {
  id: number;
  url: string;
  alt: string;
}
