import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import { elements, renderLoader, ClearLoader, clearLoader } from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list
 * - Liked recipes
 */
const state = {};


/** Search Controller **/
const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();
    console.log(query); //TODO

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3 Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

        } catch (err) {
            alert ('Error processing recipe!');
            clearLoader();
        }
      
    }
}

elements.searchForm.addEventListener('submit', e => {
e.preventDefault();
controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
    }

});




/** Recipe Controller **/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // Prepare UI for changes


        // Create new recipe object
        state.recipe = new Recipe (id);
        try {
        // Get recipe data
       await state.recipe.getRecipe();

       // Calculate servings and time 
       state.recipe.calcTime();
       state.recipe.calcServings();

       // Render Recipe
       console.log(state.recipe);

        } catch (err) {
            alert ('Error processing recipe!');
        }
      

}

};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));