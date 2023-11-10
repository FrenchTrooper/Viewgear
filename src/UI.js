/*
 * UI Libs class
 */
class UI {

    //Async append html to element
    static async Append(element, html){        
        if(UI.Exist(element)){
            $(element).append(html);
        }
    }

    //Async remove element
    static async Remove(element){
        if(UI.Exist(element)){
            $(element).remove();
        }
    }

    //Async Empty element
    static async Empty(element){
        if(UI.Exist(element)){
            $(element).empty();
        }
    }

    //async element position
    static async Position(element, position, top, left, inv = null){
        if(inv===null){
            $(element).css({position:position, top:`${top}px`, left:`${left}px`, height: 'fit-content'});
        }else{            
            $(element).css({position:position, top:`${top}px`, left:`${left}px`});
        }
    }

    // Async remove element from menu
    static async RemoveFromMenu(id){
        let element = $(`"${id}`)[0];
        if(element){
            UI.Remove(element);
        }
    }

    //Close elements on screen
    static async CloseElementDelegation(element){
        $(element).undelegate(`.${Classes.closefeature}`, "click");
        $(element).delegate(`.${Classes.closefeature}`, "click", function (e) {
            $(element).is(":visible") && $(element).hide();
        })
    }

    static async DeleteElementDelegation(element){
        $(element).undelegate(`.${Classes.closefeature}`, "click");
        $(element).delegate(`.${Classes.closefeature}`, "click", function (e) {
            UI.Remove(element);
        })
    }

    static Exist(element){
        if(element!==undefined && element!==null && element!==''){
            return true;
        }else{
           return false; 
        }
    }
}