// Base types for the data structure
interface SeoMetadata {
  title: string;
  subtitle: string;
  description: string;
}

interface LaunchStats {
  upvotes: number;
  comments: number;
  ranking: number;
  collections: number;
  launchScore: number;
  featured: boolean;
  rejectionReason?: string;
}

interface TimelineEvent {
  time: string;
  event: string;
  impact: string;
  upvoteCount: number;
}

interface TopComment {
  author: string;
  comment: string;
  reaction: string;
  impact: number;
}

interface CompetitorDrama {
  competitor: string;
  comment: string;
  drama: string;
}

interface PlotTwist {
  moment: string;
  reaction: string;
  viralFactor: number;
  memeability: number;
}

interface BingoSquare {
  text: string;
  isChecked: boolean;
  timestamp?: string;
}

interface FounderProfile {
  name: string;
  archetype: string;
  catchphrase: string;
  typicalTweet: string;
  quirks: string[];
  reputation: number;
}

// Raw data from the database
export interface RawGenerationData {
  id: string;
  title: string;
  description: string;
  output_data: {
    seoMetadata: SeoMetadata;
    launchStats: LaunchStats;
    timeline: TimelineEvent[];
    topComments: TopComment[];
    makerMistakes: string[];
    competitorDrama: CompetitorDrama[];
    plotTwists: PlotTwist[];
    bingoCard: BingoSquare[];
    founderProfile: FounderProfile;
  };
}

// Processed data for the component
export interface ProcessedGenerationData {
  name: string;
  description: string;
  parameters: {
    seoMetadata: SeoMetadata;
    launchStats: LaunchStats;
    timeline: TimelineEvent[];
    topComments: TopComment[];
    makerMistakes: string[];
    competitorDrama: CompetitorDrama[];
    plotTwists: PlotTwist[];
    bingoCard: BingoSquare[];
    founderProfile: FounderProfile;
  };
}

export interface OutputProps {
  generationData: ProcessedGenerationData;
}
