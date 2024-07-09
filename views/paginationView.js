import View from './View.js';

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination');


    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){

            //event delegation
            const btn = e.target.closest('.pagination_window');

            if(!btn) return ;
            const goToPage= +btn.dataset.goto;
            handler(goToPage);

            
        })
    }
    
    
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages= Math.ceil(this._data.results.length /this._data.resultsPerPage);        

        //Page 1,there are other pages
        if(curPage === 1 && numPages > 1) {
            return `
                <button data-goto="${curPage + 1}" class="pagination_window hidden forward">
                    <span class="page_text">Page</span>
                    <span class="next_page_number">${curPage + 1}</span>
                    <svg class="next_arrow_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>              
                </button>                  
            `;
        }




        //last page
        if(curPage === numPages && numPages > 1) {
            return `
                <button data-goto="${curPage - 1}" class="pagination_window hidden backward">
                    <svg class="previous_arrow_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span class="page_text">Page</span>
                    <span class="previous_page_number">${curPage - 1}</span>
                </button>
            `;
        }

        //other random page
        if(curPage < numPages ) {
            return `
                    <button data-goto="${curPage + 1}" class="pagination_window hidden forward">
                        <span class="page_text">Page</span>
                        <span class="next_page_number">${curPage + 1}</span>
                        <svg class="next_arrow_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>              
                    </button>  
                    <button data-goto="${curPage - 1}" class="pagination_window hidden backward">
                        <svg class="previous_arrow_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <span class="page_text">Page</span>
                        <span class="previous_page_number">${curPage - 1}</span>
                    </button>                
            `;
            }

        
        //Page 1 , there are no other page
        return '';

    }


}


export default new PaginationView();
