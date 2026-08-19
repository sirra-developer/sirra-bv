import { employee } from "./employee";
import { aboutSectionTypes } from "./aboutSections";
import { contactSectionTypes } from "./contactSections";
import { homeSectionTypes } from "./homeSections";
import { legalPage } from "./legalPage";
import { philosophySectionTypes } from "./philosophySections";
import { project } from "./project";
import { projectsPage } from "./projectsPage";
import { servicesSectionTypes } from "./servicesSections";

export const schemaTypes = [
  ...aboutSectionTypes,
  ...contactSectionTypes,
  ...homeSectionTypes,
  ...philosophySectionTypes,
  ...servicesSectionTypes,
  project,
  projectsPage,
  legalPage,
  employee,
];
