import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager = true means that when we fetch a user, we also fetch the tasks automatically
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
