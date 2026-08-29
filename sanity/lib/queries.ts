import { defineQuery } from "next-sanity";
export const HOME_PAGE_QUERY = defineQuery(`{
 "intro": *[_type=="homeIntro" && _id=="homeIntro" && contentVersion=="1.6"][0]{eyebrow,heading,problemText},
 "solution": *[_type=="homeSolution" && _id=="homeSolution" && contentVersion=="1.6"][0]{solutionHeading,solutionText,principles,primaryAction,primaryActionUrl,secondaryAction,secondaryActionUrl},
 "focusAreas": *[_type=="homeFocusAreas" && _id=="homeFocusAreas" && contentVersion=="1.6"][0]{expertiseEyebrow,expertiseHeading,expertiseText,expertiseItems},
 "chainKnowledge": *[_type=="homeChainKnowledge" && _id=="homeChainKnowledge" && contentVersion=="1.6"][0]{chainEyebrow,chainHeading,chainText,chainHighlight},
 "collaboration": *[_type=="homeCollaboration" && _id=="homeCollaboration" && contentVersion=="1.6"][0]{collaborationEyebrow,collaborationHeading,collaborationText,collaborationHighlight},
 "scan": *[_type=="homeScan" && _id=="homeScan" && contentVersion=="1.6"][0]{scanEyebrow,scanHeading,scanText,scanAction,scanActionUrl},
 "audience": *[_type=="homeAudience" && _id=="homeAudience" && contentVersion=="1.6"][0]{audienceHeading,audienceText},
 "closingCta": *[_type=="homeClosingCta" && _id=="homeClosingCta" && contentVersion=="1.6"][0]{ctaHeading,ctaAction,ctaActionUrl}
}`);
export const PHILOSOPHY_PAGE_QUERY = defineQuery(`{
 "intro": *[_type=="philosophyIntro" && _id=="philosophyIntroV16" && contentVersion=="1.6"][0]{heading,introduction},
 "principles": *[_type=="philosophyPrinciples" && _id=="philosophyPrinciplesV16" && contentVersion=="1.6"][0]{sirraHeading,sirraIntroduction,principles},
 "closing": *[_type=="philosophyClosing" && _id=="philosophyClosingV16" && contentVersion=="1.6"][0]{closingText,closingAction,closingActionUrl}
}`);
export const SERVICES_PAGE_QUERY = defineQuery(`{
 "intro": *[_type=="servicesIntro" && _id=="servicesIntro" && contentVersion=="1.6"][0]{heading,introduction},
 "area1": *[_type=="servicesStrategic" && _id=="servicesStrategic" && contentVersion=="1.6"][0]{number,title,text},
 "area2": *[_type=="servicesDevelopment" && _id=="servicesDevelopment" && contentVersion=="1.6"][0]{number,title,text},
 "area3": *[_type=="servicesTechnical" && _id=="servicesTechnical" && contentVersion=="1.6"][0]{number,title,text},
 "area4": *[_type=="servicesOrganisation" && _id=="servicesOrganisation" && contentVersion=="1.6"][0]{number,title,text},
 "scan": *[_type=="servicesScan" && _id=="servicesScan" && contentVersion=="1.6"][0]{eyebrow,heading,text,action,actionUrl}
}`);
export const ABOUT_PAGE_QUERY = defineQuery(`{
 "intro": *[_type=="aboutIntro" && _id=="aboutIntro" && contentVersion=="1.6"][0]{heading,introduction},
 "values": *[_type=="aboutValues" && _id=="aboutValues" && contentVersion=="1.6"][0]{heading,values},
 "team": *[_type=="aboutTeam" && _id=="aboutTeamV16Members" && contentVersion=="1.6"][0]{heading,action,actionUrl,members[]{_key,firstName,lastName,role,biography,linkedinUrl,phoneNumber,email,"employeePicture":employeePicture.asset->url}}
}`);
export const CONTACT_PAGE_QUERY = defineQuery(`{
 "intro": *[_type=="contactIntro" && _id=="contactIntro" && contentVersion=="1.6"][0]{heading,introduction},
 "details": *[_type=="contactDetails" && _id=="contactDetailsV4" && contentVersion=="1.6"][0]{heading,email,whatsappPhone,address{street,houseNumber,postalCode,city},chamberOfCommerce,linkedinUrl},
 "form": *[_type=="contactForm" && _id=="contactFormV2" && contentVersion=="1.6"][0]{heading,action,responseText,fields[]{_key,label,inputType,required,placeholder}}
 ,"map": *[_type=="contactMap" && _id=="contactMap" && contentVersion=="1.6"][0]{heading}
}`);
export const PROJECTS_QUERY = defineQuery(
  `*[_type=="project" && defined(slug.current)]|order(title asc){_id,title,clientName,"slug":slug.current,assignment,role,result,"clientLogo":clientLogo.asset->url,"thumbnail":thumbnail.asset->url}`,
);
export const PROJECTS_PAGE_QUERY = defineQuery(
  `*[_type=="projectsPage" && _id=="projectsPage" && contentVersion=="1.6"][0]{visible,heading,trajectoryHeading,trajectoryText,casesHeading}`,
);
export const PROJECTS_VISIBILITY_QUERY = defineQuery(
  `coalesce(*[_type=="projectsPage" && _id=="projectsPage"][0].visible,false)`,
);
export const LATEST_PROJECTS_QUERY = defineQuery(
  `*[_type=="project" && defined(slug.current)]|order(_createdAt desc)[0...2]{_id,title,clientName,"slug":slug.current,assignment,"thumbnail":thumbnail.asset->url}`,
);
export const PROJECT_QUERY = defineQuery(
  `*[_type=="project" && slug.current==$slug][0]{title,clientName,assignment,role,result,detailBlocks[]{..., _type=="projectTextBlock"=>{_key,_type,content}, _type=="projectImage"=>{_key,_type,alt,caption,"url":asset->url}}}`,
);
export const EMPLOYEES_QUERY = defineQuery(
  `*[_type=="employee"]|order(lastName asc,firstName asc){_id,firstName,lastName,role,biography,linkedinUrl,"employeePicture":employeePicture.asset->url,phoneNumber,email}`,
);
export const LEGAL_PAGE_QUERY = defineQuery(
  `*[_type=="legalPage" && _id==$id][0]{pageTitle,intro,blocks[]{..., _type=="legalTextBlock"=>{_key,_type,content}, _type=="legalImage"=>{_key,_type,alt,caption,"url":asset->url}}}`,
);
