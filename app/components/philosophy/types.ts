export type PhilosophyContent = {
  heading: string;
  introduction: string;
  sirraHeading: string;
  sirraIntroduction: string;
  principles: { _key?: string; letter: string; title: string; text: string }[];
  closingText: string;
  closingAction: string;
  closingActionUrl: string;
};
