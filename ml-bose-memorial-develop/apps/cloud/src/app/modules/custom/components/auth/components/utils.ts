export function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace('-', '').replace(/\s/g, '').replace('(', '').replace(')', '');
}
