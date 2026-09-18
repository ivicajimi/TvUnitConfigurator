/**
 * Debug/Console Log helper
 *
 * @author BradaCreatives
 */
const bcDebug = (function(){

    //- Debugger Settings
    let storage = []; //- object to handle debug messages
    let enabled = true; //- enable debugger console
    let resetEvent = true; //- reset debug lines for each custom event

    //- Add Debug Line
    const add = function(data)
    {
        if(enabled) storage.push(data);
    }

    //- Show
    const show = function()
    {
        if(enabled) console.log(storage);
    }

    //- Add/Reset Customer Event
    const customerEvent = function(data)
    {
        if( enabled ){
            if( resetEvent ) storage = [];
            storage.push('CUST.EVENT: '+data);
        }
    }

    //- Set (Enable/Disable) Debug Status
    const setStatus = function(newStatus)
    {
        enabled = newStatus;
    }

    //- Public Methods
    let out = {};
    out.add = add;
    out.show = show;
    out.customerEvent = customerEvent;
    out.setStatus = setStatus;

    return out;
}());
