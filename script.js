
import * as model from './views/model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';


const searchResults=document.querySelector(".search_results");
const searchResult=document.querySelector(".search_result");
const recipeFeed=document.querySelector(".recipes_feed")


const controlRecipe = async function(){
    try{

        const id = window.location.hash.slice(1);
    
        if(!id) return;
        recipeView.renderSpinner();
        await model.loadRecipe(id);   
        bookmarksView.render(model.state.bookmarks);  

        // Rendering Recipe
        recipeView.render(model.state.recipe);
    }

    catch(err){
        // alert(err);
        recipeView.renderError();
    }
}

const controlSearchResults = async function () {
    try{

        //load sipnner
        resultView.renderSpinner();
        // console.log(resultView)

        // 1) Get search query
        const query= searchView.getQuery();
        if(!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        // resultView.render(model.state.search.results);
        resultView.render(model.getSearchResultsPage(1));
        
        // 4) Render the initial pagination button
        paginationView.render(model.state.search);

    }
    catch(arr){
        alert(arr);
    }
}

const controlPagination = function(goToPage) {
    //reendering new results and new pagination buttons
    resultView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);


}


const controlAddBookmark = function () {

    //ADD or remove bookmark
    if(!model.state.recipe.bookmarked) 
    {
        model.addBookmark(model.state.recipe);
    }

    else
    {
        // if(!model.state.recipe.bookmarked) 
        model.deleteBookmark(model.state.recipe.id);

    }

    //Update recipe view
    recipeView.render(model.state.recipe);

    //render bookmarks
    bookmarksView.render(model.state.bookmarks);

    

}

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
}

const init =function (){
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    paginationView.addHandlerClick(controlPagination);
};

init();