import fs from 'fs';
import path from 'path';

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

export const readLogsFromFile = () => {
  const databasePath = `${path.join(__dirname, '../database')}/phoneBookTest.txt`;
  fs.openSync(databasePath, 'a');
  const x = fs.readFileSync(databasePath, 'utf8');

  return x;
};
