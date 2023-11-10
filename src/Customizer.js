/*
 * Customizer Extension
 */

class Customizer{

    static async AddDrag(element, handle, key = null){      
        //setTimeout(function () {
            $(element).addClass("stackable");       
            $(element).draggable({handle: handle, stack: ".stackable", stop: function (event, window) {

            }});
       // }, 50);
    }

}