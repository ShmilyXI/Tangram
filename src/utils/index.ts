/* 创建给定范围内的数字数组 */
const givenRangeArrayNumber = (
  min: number,
  max: number,
  zoom: number = 1,
): number[] => [...Array(max - min + 1).keys()].map((i) => (i + min) * zoom);

export { givenRangeArrayNumber };
