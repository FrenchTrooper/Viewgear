/*
 * Utility class for methods that has to be used everywhere 
 * load with super() if needed
 */
class Utility {
    constructor() {

    }
    
    static Copy(b) {
        let a = document.createElement("input");
        a.setAttribute("value", b);
        document.body.appendChild(a);
        a.select();
        document.execCommand("copy");
        document.body.removeChild(a);
    }

    static Clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    static isEmpty(str) {
        return (!str || str.length === 0 );
    }

}