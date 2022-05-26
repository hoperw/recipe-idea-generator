import '../recipeDisplay.css';


export default function RecipeDisplay(props) {
    return (
        <div id="recipe-display">
            <h2 id="recipe-name">{props.recipe.name}</h2>
            {
                props.recipe.url !== "" && <a id="recipe-link" href={props.recipe.url}>Recipe</a>
            }
            <img id="recipe-img" src={props.recipe.img} alt="recipe-image"/>
        </div>
    );
  }