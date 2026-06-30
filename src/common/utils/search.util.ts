export const buildKeywordSearch = (query: string, fields: string[]) => {
  const keywords = query.trim().split(/\s+/).filter(Boolean);

  if (!keywords.length) {
    return {};
  }

  return {
    $and: keywords.map((keyword) => ({
      $or: fields.map((field) => ({
        [field]: {
          $regex: keyword,
          $options: 'i',
        },
      })),
    })),
  };
};
