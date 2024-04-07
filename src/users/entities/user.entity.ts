import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: false, select: false })
  emailVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// **
// @OneToOne(() => UserLinks, (userLinks) => userLinks.user, {
//   cascade: true,
// })
// @JoinColumn({ name: 'userLinks_id' })
// userLinks: Relation<UserLinks>;

// @OneToMany(() => Post, (post) => post.user, {
//   cascade: true,
// })
// @JoinColumn({ name: 'posts_id' })
// posts: Relation<Post[]>;
