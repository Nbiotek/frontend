export function ccyFormatter(
  p: number,
  notation: Intl.NumberFormatOptions['notation'] = 'standard'
) {
  return new Intl.NumberFormat('en-NG', {
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
    currency: 'NGN',
    notation
  }).format(p);
}
