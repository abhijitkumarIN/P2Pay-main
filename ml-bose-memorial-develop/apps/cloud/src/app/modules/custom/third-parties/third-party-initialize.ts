/** The idea with this array is to put custom hooks or functions that need to be called at the top of the react chain
 * for example in our own end product we have here this code:
 *
 * export const thirdPartyInitialize = [useIntercom, usePendo];
 *
 * so we can initialize Pendo and Intercom as custom third parties
 * **/
export const thirdPartyInitialize: ((...args: any[]) => void)[] = [];
