import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenError } from '@casl/ability';

import { AbilityFactory } from './ability.factory';
import { IRequiredRule, CHECK_ABILITY } from './abilities.decorator';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<IRequiredRule[]>(
        CHECK_ABILITY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject,
          rule.field,
        ),
      );

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
