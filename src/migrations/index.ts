import * as migration_20260316_013603 from './20260316_013603';
import * as migration_20260318_221037 from './20260318_221037';

export const migrations = [
  {
    up: migration_20260316_013603.up,
    down: migration_20260316_013603.down,
    name: '20260316_013603',
  },
  {
    up: migration_20260318_221037.up,
    down: migration_20260318_221037.down,
    name: '20260318_221037'
  },
];
