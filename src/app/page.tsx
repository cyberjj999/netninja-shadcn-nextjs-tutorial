import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importing UI components for displaying recipe cards
import { Badge } from "@/components/ui/badge"; // Importing badge component to show "Vegan" label
import { Button } from "@/components/ui/button"; // Importing button component for interaction
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Importing avatar components for user/recipe image fallback

// Define the structure of a Recipe object
interface Recipe {
	title: string; // Recipe title
	image: string; // Image filename for the recipe
	time: number; // Cooking time in minutes
	description: string; // Short description of the recipe
	vegan: boolean; // Boolean flag indicating if the recipe is vegan
	id: string; // Unique identifier for the recipe
}

// Fetches a list of recipes from the backend API
async function getRecipes(): Promise<Recipe[]> {
	const result = await fetch("http://localhost:4000/recipes"); // API call to get recipes
	return result.json(); // Convert the response to JSON format
}

// Home component which displays the list of recipes
export default async function Home() {
	const recipes = await getRecipes(); // Fetch recipes from API

	return (
		<main>
			{/* Display recipes in a responsive grid layout with 3 columns */}
			<div className="grid grid-cols-3 gap-8">
				{recipes.map((recipe) => (
					<Card key={recipe.id} className="flex flex-col justify-between">
						{/* Card Header containing an avatar and recipe title */}
						<CardHeader className="flex-row gap-4 items-center">
							<Avatar>
								<AvatarImage src={`/img/${recipe.image}`} alt={recipe.title} />
								<AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
								{/* Show first two letters of title as fallback */}
							</Avatar>
							<div>
								<CardTitle>{recipe.title}</CardTitle>
								<CardDescription>{recipe.time} mins to cook.</CardDescription>
							</div>
						</CardHeader>

						{/* Card Content showing recipe description */}
						<CardContent>
							<p>{recipe.description}</p>
						</CardContent>

						{/* Card Footer with a button and a vegan badge if applicable */}
						<CardFooter className="flex justify-between">
							<Button>View Recipe</Button>
							{recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
							{/* Show Vegan badge only if the recipe is vegan */}
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
