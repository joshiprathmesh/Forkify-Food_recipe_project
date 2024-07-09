import View from './View.js';

class RecipeView extends View {

    _parentElement = document.querySelector('.recipes_feed');
    _errorMessage = 'We could not find that recipe, please try another one !';
    _message='Unable to find the recipe...! try with other name.';
    _data;
    render(data){
       
        this._data = data;
        const markup=this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

   renderSpinner = function (){
        const markup=`
        
        <div class="spinner">
            <img class="loading_icon" src="./src/loading (1).svg">
        </div>
        `;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    addHandlerRender(handler) {

        let arr=['hashchange', 'load'];
        arr.forEach (ev => window.addEventListener(ev,handler));
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click',function(e)
        {
            const btn=e.target.closest('.bookmark__info');

            if(!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        return  `
                <figure class="recipe__fig">
                        <img src="${this._data.image}" class="recipe__img"/>
                </figure>
                <h1 class="recipe__title"><span>${this._data.title}</span></h1>
                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="recipe__info-data-minutes">${this._data.cookingTime} 
                        <span class="recipe__info-data-text">mintues</span>
                    </div>
                    <div class="serving__info">
                        <svg class="recipe__info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>                          
                        <span class="recipe__info-data-minutes">${this._data.servings} 
                        <span class="recipe__info-data-text">people</span>
                    </div>
                    <button class="bookmark__info">
                        <svg class="recipe__info-icon bookmarked${this._data.bookmarked ? '-fill':''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                </div>
    
            <div class="ingridents_info">
                <h2 class="ingridents_title heading__2">Recipe Ingridents</h2>
                <ul class="ingrident__list">
    
                    ${this._data.ingredients.map(ing => {
                        return `
                        <li class="ingrident__item">
                        <svg class="recipe__info-icon right__tick_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <div class=item__quantity">${ing.quantity}</div>
                        <div class="item__unit">${ing.unit}</div>
                        <div class="item__name">${ing.description}</div>
                    </li>
                        `;
                    }).join('')}
                                        
                </ul>
            </div>
    
            <div class="recipe__directions">
                <h2 class="heading__2">How to cook it</h2>
                <p class="recipe__direction-text">This recipe was carefully designed and tested by Closet Cooking. Please check out directions at their website.</p>
                <a class="btn--small recipe__btn direction_button" href="${this._data.sourceUrl}" target="_blank">
                    <span>Directions</span>
                    <svg class="direction_arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg> 
                </a>
            </div>
        `;
       }

}



export default new RecipeView();
