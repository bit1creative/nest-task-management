import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// this is a Data Mapper pattern
// which includes only the entity's properties

// there is also an Active Record pattern which extends BaseEntity
// with which we use entity to interact with the database directly
// and we don't have to use a repository
// when using this pattern, we can write the queries directly in the model

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
