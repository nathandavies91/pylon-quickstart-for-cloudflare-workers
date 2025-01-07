export const asPaginatedResponse = <T>(items: T[], totalCount: number) => {
  return {
    items: items ?? [],
    totalCount: totalCount ?? 0,
  };
}