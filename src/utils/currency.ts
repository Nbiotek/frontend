export function ccyFormatter(p: number) {
  return new Intl.NumberFormat('en-NG', {
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
    currency: 'NGN',
    notation: 'compact'
  }).format(p);
}
