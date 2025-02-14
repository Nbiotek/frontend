interface INextPage<P = {}, S = {}> {
  params: Promise<P>;
  searchParams: Promise<S>;
}
