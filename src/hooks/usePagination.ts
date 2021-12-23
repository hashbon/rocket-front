export default (props: any) => {
  const paginationEntity = props;
  const pageCurrent = Math.floor(paginationEntity.start / paginationEntity.length) + 1;
  const pageCount = Math.ceil(paginationEntity.recordsTotal / paginationEntity.length) || 1;
  const withPrev = pageCurrent !== 1;
  const withNext = pageCurrent !== pageCount;
  const prevStart = (pageCurrent - 2) * paginationEntity.length;
  const nextStart = pageCurrent * paginationEntity.length;

  let date: any = "";
  if (paginationEntity.data !== undefined) {
    if (paginationEntity.data.length > 0) {
      date = paginationEntity.data[paginationEntity.data.length - 1].date - 1;
    }
  }

  return {
    pageCurrent,
    pageCount,
    withPrev,
    withNext,
    prevStart,
    nextStart,
    date,
  };
};
