// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent,
//   LoadEvent,
//   RecoverEvent,
//   RemoveEvent,
//   SoftRemoveEvent,
//   UpdateEvent,
// } from 'typeorm';

// import { Tag } from '../../posts/entities/tag.entity';
// import { Post } from '../../posts/entities/post.entity';

// @EventSubscriber()
// export class TagSubscriber implements EntitySubscriberInterface<Tag> {
//   // oldTags: Tag;

//   listenTo() {
//     return Tag;
//   }

//   async afterLoad(entity: Tag, event: LoadEvent<Tag>) {
// this.oldTags = entity;
// const oldTags = entity;
// console.log('OLDENTITY', oldTags);
// const joinTableTags = await event.manager.query(
//   `SELECT TAG_ID FROM POST_TAGS_TAG`,
// );
// console.log('oldTags', oldTags);
// console.log('joinTableTags', joinTableTags);
// for () {
//   await event.manager.delete(Tag, tag);
// }
// console.log(`AFTER ENTITY LOADED: `, entity);
// }

// async afterInsert(event: InsertEvent<Tag>) {
// const joinTableTags = await event.manager.query(
//   `SELECT TAG_ID FROM POST_TAGS_TAG`,
// );
// console.log('joinTableTags', joinTableTags);
// const allTags = await event.manager.query(`SELECT TAG FROM TAG`);
// const distinctTags = await event.manager.query(
//   `SELECT DISTINCT isFeatured FROM post`,
// );
// console.log(distinctTags);
// await event.manager.delete(Tag, {
//   where: {
//     id: 1,
//   },
// });
// console.log('allTags', allTags);
// const orphanTags = joinTableTags.forEach((tagEntity: Tag) => {
//   joinTableTags.includes
// });
// await event.manager.query(
//   `SELECT TAG_ID FROM POST_TAGS_TAG`,
// );
// console.log('newTags', newTags);
// console.log(`AFTER ENTITY INSERTED: `, event.entity);
// }

// beforeInsert(event: InsertEvent<any>) {
//   console.log(`BEFORE ENTITY INSERTED: `, event.entity);
// }

// beforeUpdate(event: UpdateEvent<any>) {
//   console.log(`BEFORE ENTITY UPDATED: `, event.entity);
// }

// afterUpdate(event: UpdateEvent<any>) {
//   console.log(`AFTER ENTITY UPDATED: `, event.entity);
// }
// }
