export const authValidators = {
  register: ["username", "email", "password"],
  login: ["email", "password"],
};

export const movieValidators = {
  create: ["title", "slug"],
};

export const personValidators = {
  create: ["name"],
};

export const reviewValidators = {
  create: ["body"],
};

export const ratingValidators = {
  create: ["score"],
};
