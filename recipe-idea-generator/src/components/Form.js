import { useState } from 'react';

export default function Form() {

    const [formData, setFormData] = useState(
        {flavorProfile: "", 
        omnivore: true, vegan: false, vegetarian: false, glutenFree: false, 
        inspiredFrom: ""}
    )


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
        console.log(formData)
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="dietaryRestriction">Omnivore: </label>
            <input type="checkbox" 
                type="checkbox"
                id="dietaryRestriction"
                checked={formData.omnivore}
                onChange={handleChange}
                name="omnivore"
            />
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
            <button>Submit</button>
        </form>
    )
}