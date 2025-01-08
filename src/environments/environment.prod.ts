
export const environment = {
  production: true,
  name: (window as { [key: string]: any })['env']['name'],
  sitePath: (window as { [key: string]: any })['env']['sitePath'] || '',
  organisation: (window as { [key: string]: any })['env']['organisation'] || '',
  framework: (window as { [key: string]: any })['env']['framework'] || '',
  channelId: (window as { [key: string]: any })['env']['channelId'] || '',
  azureHost: (window as { [key: string]: any })['env']['azureHost'] || '',
  contentHost: (window as { [key: string]: any })['env']['contentHost'] || '',
  azureBucket: (window as { [key: string]: any })['env']['azureBucket'] || '',
  azureOldHost: (window as { [key: string]: any })['env']['azureOldHost'] || '',
  azureOldBuket: (window as { [key: string]: any })['env']['azureOldBuket'] || '',
  portalRoles: (((window as { [key: string]: any })['env']['portalRoles'] || '').split(',')) || [],
  portals: (window as { [key: string]: any })['env']['portals'] || [],
  recaptchaKey: (window as { [key: string]: any })['env']['recaptchaKey'] || [],
  contentBucket: (window as { [key: string]: any })['env']['azureBucket'] || '',
  cdnContentHost: (window as { [key: string]: any })['env']['cdnContentHost'] || '',
  cdnContentBucket: (window as { [key: string]: any })['env']['cdnContentBucket'] || '',
  dicussV2Bucket: (window as { [key: string]: any })['env']['dicussV2Bucket'] || '',
  certificateassets: (window as { [key: string]: any })['env']['certificateassets'] || '',
  assessmentBuffer: (window as { [key: string]: any })['env']['assessmentBuffer'] || 0,
  staticHomePageUrl: (window as { [key: string]: any })['env']['staticHomePageUrl'] || '',
  resendOTPTIme: (window as { [key: string]: any })['env']['resendOTPTIme'] || 120,
  cscmsUrl: (window as { [key: string]: any })['env']['cscmsUrl'] || '',
  dakshtaName: (window as { [key: string]: any })['env']['dakshtaName'] || '',
  contactMeetLink: (window as { [key: string]: any })['env']['contactMeetLink'] || '',
  programStripName: (window as { [key: string]: any })['env']['programStripName'] || '',
  programStripPrimaryCategory: (window as { [key: string]: any })['env']['programStripPrimaryCategory'] || '',
  programStripKey: (window as { [key: string]: any })['env']['programStripKey'] || '',
  quizResultTimeout: (window as { [key: string]: any })['env']['quizResultTimeout'] || '',
  meetingLinkDetail: (window as { [key: string]: any })['env']['meetingLinkDetail'] || '',
  karmayogiBharatLink: (window as { [key: string]: any })['env']['karmayogiBharatLink'] || '',
  helpEmail: (window as { [key: string]: any })['env']['helpEmail'] || '',
  supportEmail: (window as { [key: string]: any })['env']['supportEmail'] || '',
  apiCache: (window as { [key: string]: any })['env']['apiCache'] || 0,
  spvorgID: (window as { [key: string]: any })['env']['spvorgID'] || '',
  doptOrg: (window as { [key: string]: any })['env']['doptOrg'] || '',
  mdoChannelsBookmarkId: (window as { [key: string]: any })['env']['mdoChannelsBookmarkId'] || '',
  providerDataKey: (window as { [key: string]: any })['env']['providerDataKey'] || '',
  compentencyVersionKey: (window as { [key: string]: any })['env']['compentencyVersionKey'] || '',
  cbcOrg: (window as { [key: string]: any })['env']['cbcOrg'] || '',
  // mdoPortal: (window as { [key: string]: any })['env']['mdoPath'] || '',
  // spvPortal: (window as { [key: string]: any })['env']['spvPath'] || '',
  // cbcPortal: (window as { [key: string]: any })['env']['cbcPath'] || '',
  // cbpPortal: (window as { [key: string]: any })['env']['cbpPath'] || '',
  // fracPortal: (window as { [key: string]: any })['env']['fracPath'] || '',
  // otherPortalRoles: ((window as { [key: string]: any })['env']['otherPortalRoles'] || '') || {},
}
