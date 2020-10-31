import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Field, ID, Int, ObjectType } from "type-graphql"

enum DayOfWeek {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

enum MealType {
  breakfast,
  brunch,
  lunch,
  tea,
  dinner,
  supper,
  snack,
}

@Entity()
@ObjectType()
export class Meal extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => Int)
  @Column()
  year: number

  @Field(() => Int)
  @Column()
  week: number

  @Field(() => Int)
  @Column()
  day: DayOfWeek

  @Field(() => Int)
  @Column()
  mealType: MealType

  @Field(() => String)
  @Column()
  description: string
}
