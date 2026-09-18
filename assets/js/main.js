


let activeConfig = {
    TvBody: 'White',
    TvFront: 'White',
    TvTop: 'White',
    Wall: 'White',
    Shelf: 'White'
}

const options = {
    White: {title:'Bela', color:'#ccc'},
    Brown: {title:'Braon', color:'#843'},
    Oak: {title:'Hrast', color:'rgb(242, 198, 110)'},
    Black: {title:'Crna', color:'rgb(0, 0, 0)'}
}

const components = {
    Shelf: {title:'Zidna Polica'},
    Wall: {title:'Zidne Letvice'},
    TvTop: {title:'TV Komoda - Gornja Ploča'},
    TvFront: {title:'TV Komoda - Frontovi'},
    TvBody: {title:'TV Komoda - Okvir'},
};





const buildConfigOptions = function(){
    let htmlOut = ''; 

    for( const [componentId, component] of Object.entries(components) ){
        
        htmlOut += '<div class="componentOptions" data-component="'+componentId+'">';
        htmlOut += '<label class="componentLabel">'+ component.title +'</label><br>';

        for( const [optionId, option] of Object.entries(options) ){
            let inpId = 'option_'+componentId+'_'+optionId;
            let inpName = 'option_'+componentId;

            let title = option.title || optionId;
            let iconColor = option.color || 'rgba(0,0,0,0.2)';

            htmlOut += '<label class="componentOptionLabel" for="'+inpId+'">';
            htmlOut += '<input class="componentOptionValue" '
                + 'id="'+inpId+'" name="'+inpName+'" '
                + 'type="radio" '
                + 'value="'+optionId+'" '
                + 'data-component="'+componentId+'" '
                + '>';
            htmlOut += '<span style="background:'+iconColor+'" title="'+title+'">'+title+'</span>';
            htmlOut += '</label>';
        }
        htmlOut += '</div>';
    }

    $('.configWrapper').html(htmlOut);
}

const colectConfigSelection = function(){
    $('.componentOptionValue:checked').each(function(){
        let componentId = $(this).attr('data-component') || '';
        let optionId = $(this).val() || '';

        if( componentId ) activeConfig[componentId] = optionId;
    });
}

const makeActiveSelection = function(){
    for( const [componentId, optionId] of Object.entries(activeConfig) ){
        if( optionId ){
            let inputId = 'option_'+componentId+'_'+optionId;
            document.getElementById(inputId).checked = true;
        }
    }
}


const optionValueChanged = function(){
    colectConfigSelection();
    buildConfigImage();
}

const buildConfigImage = function(){
    //- Turn Off All config Images
    $('.img_Comp').hide();

    //- Turn On Only Selected Ones
    for( const [key, value] of Object.entries(activeConfig) ){
        let componentClass = '.img_'+key;
        let colorClass = '.img_'+value;

        if( value ) $(componentClass+colorClass).show();
    }
}

const bindEvents = function(){

    $('.componentOptionValue').change(function(){
        optionValueChanged();
    });

    $('.navBtn').click(function(event){
        event.preventDefault();

        const imgId = $(this).val();

        $('.imgWrapper.current').removeClass('current');
        $('.imgWrapper[data-id="'+imgId+'"]').addClass('current');

        $('.navBtn.current').removeClass('current');
        $(this).addClass('current');
    });

}


const init = function(){
    buildConfigOptions();
    bindEvents();
    makeActiveSelection();
    buildConfigImage();
}