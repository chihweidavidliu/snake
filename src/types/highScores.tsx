export interface IScore {
  name: string;
  finalScore: number;
}

export interface IHighScores {
  [index: string]: IScore[];
}
