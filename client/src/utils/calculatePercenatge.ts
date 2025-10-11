export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
    return 0;
  }
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
