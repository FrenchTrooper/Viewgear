let Language = null;
class Main{

    static BindOnClick(target, func){
        $(target).off("click");
        $(target).on("click", function(e){
            func(e);
        });
    }
    
    static async GetLanguage() {
        await Api.GetLanguage("GET", `./assets/loc/${$.parseJSON(localStorage.getItem('lang'))}.json`).then(function (result) {
            Language = result;
        });
    }

    Initialize() {       
        var options = {childList: true, subtree: false, attributes: false, characterData: true};
        Mutator.Create("installer", "body", options, function(mutations){
            for(let mutation in mutations){
                let element = mutations[mutation];
                element.removedNodes.length && element.removedNodes.forEach(function (node) {      
                    if ($(node).hasClass(Classes.init)) {              
                        Main.GetLanguage();    
                        $(`#${Classes.chatId}`).addClass(Classes.chatClass); 
                        Mutator.Create("jschat", `.${Classes.chatClass}`, {childList: true, subtree: false, attributes: false, characterData: false}, function(mutations){
                            for (let mutation of mutations) {
                                for (let node of mutation.addedNodes) {
                                    let textNode = $(node).find('.linewrap').children().last();      
                                    let text = $(textNode).html();
                                    if(text.startsWith('>') || text.startsWith('&gt;')){
                                        Itemization.ItemLink(text, textNode);
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}

var main = new Main();
main.Initialize();