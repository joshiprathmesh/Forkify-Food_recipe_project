import View from './View.js';

class BookmarksView extends View {

    _parentElement=document.querySelector('.bookmarks_list');
    _errorMessage="No bookmarks yet.";
    _message='No bookmark found... Find a recipe and bookmark it . ';
    
    addHandlerRender(handler)
    {
        window.addEventListener('load',handler);
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                    <img class="preview__fig_" src="${result.image}" alt="${result.title}">
                </figure>
                <div class="preview__data">
                    <h3 class="preview__title">${result.title}</h3>
                    <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated hidden">

                    </div> 
                </div> 
                </a>
            </li> 

        `;
    }
}

export default new BookmarksView();
