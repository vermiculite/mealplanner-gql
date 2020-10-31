import { Query, Resolver } from "type-graphql"
import { Meal } from "../models/Meal"

@Resolver()
export class MealResolver {
  @Query(() => [Meal])
  meals() {
    return Meal.find()
  }
}
