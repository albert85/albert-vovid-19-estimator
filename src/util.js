// eslint-disable-next-line import/prefer-default-export
export const periodConverter = (peroidType, timeToElapse) => {
  switch (peroidType) {
    case 'weeks':
      return 7 * timeToElapse;
    case 'months':
      return 30 * timeToElapse;
    default:
      return timeToElapse;
  }
};
