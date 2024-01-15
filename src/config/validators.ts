export class Validators {

  
    static email(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email)
    } 
  
    static trainingCategory(category: string): boolean {

      const categories = ["legs", "pull", "push", "upper", "lower", "full", "cardio", "abs"]
      return categories.includes(category)
    }
}