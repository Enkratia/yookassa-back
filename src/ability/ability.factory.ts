import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';

import { User } from '../users/entities/user.entity';
// import { Post } from '../posts/entities/post.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// export type Subjects = InferSubjects<typeof Post | typeof User> | 'all';
export type Subjects = InferSubjects<typeof User> | 'all';

type Conditions = MongoQuery;

export type AppAbility = MongoAbility<[Action, Subjects], Conditions>;

// **
// type FlatPost = Post & {
//   'user.id': Post['user']['id'];
// };

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');

      cannot(Action.Update, User);
    } else {
    }

    can(Action.Update, User, { id: { $eq: user.id } });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

/////////////////////////////////////////////////////////////////////////
// type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// export type Subjects = InferSubjects<typeof User | typeof Post | 'all'>;
// export type Subjects = InferSubjects<typeof User | 'all'>;

// export type AppAbility = Ability<[Action, Subjects]>
// export type AppAbility = Ability<[Action, Subjects]>;

// const ability = createMongoAbility<[Actions, Subjects]>();

// **
// can(Action.Read, 'all').because('only users');
// can(Action.Create, Post, { user: { id: user.id } }).because('not a John');
// can(Action.Create, Post).because('Only users');

// Example:
// @Injectable()
// export class AbilityFactory {
//   defineAbility(user: User) {
//     const { can, cannot, build } = new AbilityBuilder<AppAbility>(
//       createMongoAbility,
//     );

//     if (user.isAdmin) {
//       can(Action.Manage, 'all');

//       cannot(Action.Update, User);
//     } else {
//       can<FlatPost>(Action.Update, Post, { 'user.id': { $eq: user.id } });
//       can<FlatPost>(Action.Delete, Post, { 'user.id': { $eq: user.id } });

//       cannot(Action.Update, Post, ['isFeatured']);
//     }

//     can(Action.Update, User, { id: { $eq: user.id } });

//     return build({
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }
