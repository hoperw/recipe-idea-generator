import { useState } from 'react';
import recipeData from '../recipeData';
import RecipeDisplay from './RecipeDisplay';


export default function Form() {

    const [formData, setFormData] = useState({
        flavorProfile: "savory", 
        vegan: false, vegetarian: false, glutenFree: false, 
        inspiredFrom: "indian"
    })

    const [recipe, setRecipe] = useState({
        name: "",
        url: "",
        img: "https://www.hhfb.org/wp-content/uploads/2020/09/freshproduce.jpg"
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
            const img = recipeArray[randomNumber].img
            setRecipe({
                name: name,
                url: url,
                img: img
            })
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
        <div className="form-wrapper">
        <form id="recipe-form" onSubmit={handleSubmit}>
            <div className="checkbox-container">
                <label htmlFor="dietaryRestriction">Vegan: </label>
                <input 
                    className="checkbox-item"
                    type="checkbox"
                    id="vegan"
                    checked={formData.vegan}
                    onChange={handleChange}
                    name="vegan"               
                />
            </div>
            <div className="checkbox-container">
                <label htmlFor="dietaryRestriction">Vegetarian: </label>
                <input 
                    className="checkbox-item"
                    type="checkbox"
                    id="vegetarian"
                    checked={formData.vegetarian}
                    onChange={handleChange}
                    name="vegetarian"               
                />
            </div>
            <div className="checkbox-container">
                <label htmlFor="dietaryRestriction">Gluten Free: </label>
                <input 
                    className="checkbox-item" 
                    type="checkbox"
                    id="glutenFree"
                    checked={formData.glutenFree}  
                    onChange={handleChange}
                    name="glutenFree"              
                />
            </div>
            <div id="select-lists-container">
            <label htmlFor="flavorProfile">Flavor Profile: </label>
            <div className="select-container">
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
            </div>
            <label htmlFor="inspiredFrom">Inspired: </label>
            <div className="select-container">
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
            </div>
            </div>
            <button id="form-submit" onClick={getRecipe}>Submit</button>
        </form>
            <RecipeDisplay recipe={recipe} />
        </div>
    )
}