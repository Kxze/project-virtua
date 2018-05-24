import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;


}