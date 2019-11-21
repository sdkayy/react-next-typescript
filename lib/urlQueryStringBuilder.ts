export const RedirectParam = {
  InternalUrl: 'r',
  ExternalUrl: 'e',
  ContentId: 'hourly_content',
  OfferId: 'hourly_offer',
};

export const authRedirectUrlParams = (queryObj: any) => {
  let internalRedirect;
  let externalRedirect;
  let contentId;
  let offerId;
  if (queryObj) {
    internalRedirect = queryObj[RedirectParam.InternalUrl];
    externalRedirect = queryObj[RedirectParam.ExternalUrl];
    contentId = queryObj[RedirectParam.ContentId];
    offerId = queryObj[RedirectParam.OfferId];
  } else {
    // no redirect params provided
    return '';
  }
  return (
    (internalRedirect ? `?${RedirectParam.InternalUrl}=${internalRedirect}` : '?') +
    (externalRedirect ? `&${RedirectParam.ExternalUrl}=${externalRedirect}` : '') +
    (contentId ? `&${RedirectParam.ContentId}=${contentId}` : '') +
    (offerId ? `&${RedirectParam.OfferId}=${offerId}` : '')
  );
};
