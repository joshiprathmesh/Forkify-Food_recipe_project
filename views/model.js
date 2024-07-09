export const state ={
    recipe:{},
    search: {
        query: '',
        results: [],
        resultsPerPage: 10,
        page:1,
    },
    bookmarks:[],
};


export const loadRecipe = async function(id) {

    try{

        // const res= await fetch('https://forkify-api.herokuapp.com/api/get?rId=47000'); 
        const res= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data=await res.json();



        if(!res.ok) throw new Error(`${data.error} (${res.status})`);
        
        const {recipe} = data.data ;
        
        state.recipe= {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,

        };


        if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked=true;
        else 
        state.recipe.bookmarked=false;

        // console.log(state.recipe);
    }
    catch(err)
    {
        alert(err);
    }

    
};

export const loadSearchResults =async function(query){
    try {

        state.search.query = query;
        const res= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
        const data=await res.json();

        if(!res.ok) throw new Error(`${data.error} (${res.status})`);
        
        // console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        state.search.page = 1;


    }
    catch(err){
        console.error(`${err}`);
    }
}

export const getSearchResultsPage = function(page =state.search.page) {
    
    state.search.page = page;
    const start = (page-1) * state.search.resultsPerPage;
    const end = page* state.search.resultsPerPage;
    return state.search.results.slice(start,end);
}

export const addBookmark = function (recipe) {
    //Add bookmark
    console.log(recipe);

    state.bookmarks.push(recipe);
    
    //Mark currect recipe as bookmark
    if(recipe.id === state.recipe.id)
        state.recipe.bookmarked = true;

    persistBookMarks();
}

export const deleteBookmark =function (id) {
   const index = state.bookmarks.findIndex(el=>el.id === id);
    state.bookmarks.splice(index,1);

    //Mark currect recipe as not a bookmark

    if(id === state.recipe.id)
        state.recipe.bookmarked = false;

    persistBookMarks();
}

const persistBookMarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

const init= function() {
    const storage=localStorage.getItem('bookmarks');
    
    if(storage) state.bookmarks=JSON.parse(storage);
}

init();