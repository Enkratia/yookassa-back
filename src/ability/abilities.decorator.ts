import { SetMetadata } from '@nestjs/common';

import { Action, Subjects } from './ability.factory';

export interface IRequiredRule {
  action: Action;
  subject: Subjects;
  field?: string;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: IRequiredRule[]) => {
  return SetMetadata(CHECK_ABILITY, requirements);
};
