import { useState } from 'react';
import recipeData from '../recipeData';

export default function Form() {

    const [formData, setFormData] = useState({
        flavorProfile: "savory", 
        vegan: false, vegetarian: false, glutenFree: false, 
        inspiredFrom: "indian"
    })

    const [recipe, setRecipe] = useState({
        name: "",
        url: "",
        image: ""
    });

    function getRecipe() {
        const allRecipes = recipeData.data.recipes
        let recipeArray = allRecipes.filter(recipe => {

            return recipe.flavorProfile.includes(formData.flavorProfile) 
                   && recipe.inspiredFrom.includes(formData.inspiredFrom)
        })
        if(formData.vegetarian) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.vegetarian
            })
        }
        if(formData.vegan) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.vegan
            })
        }
        if(formData.glutenFree) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.glutenFree
            })
        }

        const randomNumber = Math.floor(Math.random() * recipeArray.length)

        if (recipeArray.length > 0) {
            const url = recipeArray[randomNumber].url
            const name = recipeArray[randomNumber].name
            setRecipe({
                name: name,
                url: url,
                image: ""
            })
        } else {
            console.log("wat")
        }
    }

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {

            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="dietaryRestriction">Vegan: </label>
            <input type="checkbox" 
                type="checkbox"
                id="dietaryRestriction"
                checked={formData.vegan}
                onChange={handleChange}
                name="vegan"               
            />
            <label htmlFor="dietaryRestriction">Vegetarian: </label>
            <input type="checkbox" 
                type="checkbox"
                id="dietaryRestriction"
                checked={formData.vegetarian}
                onChange={handleChange}
                name="vegetarian"               
            />
            <label htmlFor="dietaryRestriction">Gluten Free: </label>
            <input type="checkbox" 
                type="checkbox"
                id="dietaryRestriction"
                checked={formData.glutenFree}  
                onChange={handleChange}
                name="glutenFree"              
            />
            <label htmlFor="flavorProfile">Flavor Profile: </label>
            <select
                id="flavorProfile"
                value={formData.flavorProfile}
                onChange={handleChange}
                name="flavorProfile"
            >
                <option value="savory">Savory</option>
                <option value="sweet">Sweet</option>
                <option value="salty">Salty</option>
            </select>

            <label htmlFor="inspiredFrom">Inspired: </label>
            <select
                id="inspiredFrom"
                value={formData.inspiredFrom}
                onChange={handleChange}
                name="inspiredFrom"
            >
                <option value="indian">Indian</option>
                <option value="mexican">Mexican</option>
                <option value="japanese">Japanese</option>
                <option value="thai">Thai</option>
                <option value="korean">Korean</option>
                <option value="american">American</option>
            </select>
            <button onClick={getRecipe}>Submit</button>
        </form>
        <div id="recipe-display">
            <h2>{recipe.name}</h2>
            <a href={recipe.url}>Recipe</a>
        </div>
        </div>
    )
}