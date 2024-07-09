export default class View {

    //_parentElement = document.querySelector('.recipes_feed');
    _data;


    render(data){
       
        if(!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();


        this._data = data;
        const markup=this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    // update(data) {

               
    //     if(!data || (Array.isArray(data) && data.length === 0))
    //         return this.renderError();


    //     this._data = data;
    //     const newMarkup=this._generateMarkup();
    //     const newDom=document.createRange().createContextualFragment(newMarkup);
    //     const newElements =newDom.querySelectorAll(*);
    //     console.log(newElements)

    // }


    renderError(message = this._message){
        console.log(message);
        const markup = `
            <div class="error">
                <p class="message">${message}</p>
            </div>
        `;
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

    
}