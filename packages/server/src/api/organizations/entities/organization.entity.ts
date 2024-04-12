import {
  Account,
  PushFirebasePlatforms,
} from '@/api/accounts/entities/accounts.entity';
import { PushPlatforms } from '@/api/templates/entities/template.entity';
import { Workspaces } from '@/api/workspaces/entities/workspaces.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationTeam } from './organization-team.entity';
import { OrganizationPlan } from './organization-plan.entity';

export enum PlanType {
  FREE = 'free',
  PAID = 'paid',
  ENTERPRISE = 'enterprise',
}

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar' })
  public companyName!: string;

  @OneToMany(() => OrganizationTeam, (team) => team.organization, {
    onDelete: 'CASCADE',
  })
  public teams: OrganizationTeam[];

  @JoinColumn()
  @OneToOne(() => OrganizationPlan, (organizationPlan) => organizationPlan.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public plan: OrganizationPlan;

  @OneToMany(() => Workspaces, (workspace) => workspace.organization, {
    onDelete: 'CASCADE',
  })
  public workspaces: Workspaces[];

  @JoinColumn()
  @OneToOne(() => Account, (account) => account.id, { onDelete: 'CASCADE' })
  public owner: Account;

  @Column({ nullable: true })
  planId: string;
}
