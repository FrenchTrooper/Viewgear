/*
 * Itemization Extension
 */

let SharedChatItems = [];
let SharedCompared = {};

let ulvl = 45;
let ukey = "shaman";

class Itemization{    

    static Build(element, data = null){
        if(ELib.hasOwnProperty(element)){
            let html = ELib[element];
            $.each(data, function(key, value) {
                html = html.replace(`%${key}%`, value);
            });
            return html;
        }
    }
    
    static async ItemLink(text, node){
        text = text.replace("&gt;", ">");        
        if((text.match(/,/g) || []).length==1){
            text = text.split(" ")[0];
            text = text.split(","); 
            let itemID = Itemization.GetFromStringItemID(text[0]);   
            let ids = [];     
            if(UI.Exist(itemID)){
                ids.push(itemID);
                ids.push(text[1]);
            }
            if(ids.length>0){
                $(node).addClass("chatlookupable");
                $(node).data('itemid', ids.join(','));
                Main.BindOnClick(node, Itemization.ProcessChatClick);
            }
        }else{
            let itemID = Itemization.GetFromStringItemID(text);
            if(UI.Exist(itemID)){
                $(node).addClass("chatlookupable");
                $(node).data('itemid', itemID);
                Main.BindOnClick(node, Itemization.ProcessChatClick);
            }
        }
    }

    static async DirectLookup(inu, co = null){
        let OXkey = `${Classes.itemlookupitemwindow}`;
        
        if(UI.Exist(inu) && !isNaN(inu) && typeof inu == 'number'){       
            return await Api.quickCall('item',{id:inu}).then(function (result) {     
                $(`.${Classes.itemlookupitemwindow}`).length && $(`.${Classes.itemlookupitemwindow}`).remove();        
                if (result.length > 0) {
                        let item = new Item(result[0]);
                        if (!sit.includes(item.type)){ 
                            var q = Item.Quality(item.quality);{
                            item.name = Language.items[item.type][item.tier];
                            null === item.logic.level || isNaN(item.logic.level) || "number" != typeof item.logic.level || (item.haslvl = item.logic.level <= ulvl ? "green" : "green");
                            let cls = "";
                            null === item.logic["class"] || isNaN(item.logic["class"]) || "number" != typeof item.logic["class"] || (item.hasclass = item.logic["class"] == ukey ? "green" : "green", cls = `<div class="text${item.hasclass}"> Class: ${Language.classes[item.logic.class].name} </div>`);
                            let buildThis = {
                                text: '', 
                                cls: `${Classes.itemlookupitemwindow} border ${q.color}`, 
                                n: `${Classes.itemlookupitemwindow}`, 
                                html: "",
                                close:Classes.closefeature,
                            };
                            let upg = "";
                            0 < item.upgrade && (upg = "+" + item.upgrade);
                            let innerHtml = "";
                            weap.includes(item.type) && (innerHtml += Item.Weapon(item), Array.from(item.stats.keys()).slice(0, 2).forEach(function (a) {
                                return item.stats["delete"](a);
                            }));
                            
                            for (const [key, value] of item.stats.entries()) {                            
                                let qa = Item.Quality(value.qual);
                                if (value.type == "base") {                                
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)}% ${StatsData[key]}`}); 
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)} ${StatsData[key]}`});                                    
                                    } else {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${value.value} ${StatsData[key]}`});
                                    }
                                } else if (value.type == "bonus") {
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;     
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)} ${StatsData[key]} ${Math.round(value.qual)}%`});                                                              
                                    } else if (StatsData[key] == "Item Find") {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value} ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    }
                                }
                            }
                            let isBoundHtml = "";
                            if(item.bound){
                                isBoundHtml = `<div class="textgreen"> Character Bound </div>`;
                            }

                            if(co==null){
                                buildThis.html = `<div class="slotdescription svelte-18ojcpo"> <div class="container svelte-e3ao5j"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div></div>`;
                            }else{
                                return `<div class="container svelte-e3ao5j comparePack"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div>`;
                            
                            }
                            return [buildThis, OXkey];
                        }
                    }
                }
            });
        }  
    }

    static async Lookup(event, data){   
        let OXkey = `${Classes.itemlookupitemwindow}`;
        

        let inu =  parseInt($('.searchinput').val());   
        $('.searchinput').val("");           
        if(UI.Exist(inu) && !isNaN(inu) && typeof inu == 'number'){            
            await Api.quickCall('item',{id:inu}).then(function (result) {
                $(`.${Classes.itemlookupitemwindow}`).length && $(`.${Classes.itemlookupitemwindow}`).remove();        
                if (result.length > 0) {
                        let item = new Item(result[0]);
                        if (!sit.includes(item.type)){ 
                            var q = Item.Quality(item.quality);{
                            item.name = Language.items[item.type][item.tier];
                            null === item.logic.level || isNaN(item.logic.level) || "number" != typeof item.logic.level || (item.haslvl = item.logic.level <= ulvl ? "green" : "green");
                            let cls = "";
                            null === item.logic["class"] || isNaN(item.logic["class"]) || "number" != typeof item.logic["class"] || (item.hasclass = item.logic["class"] == ukey ? "green" : "green", cls = `<div class="text${item.hasclass}"> Class: ${Language.classes[item.logic.class].name} </div>`);
                            let buildThis = {
                                text: '', 
                                cls: `${Classes.itemlookupitemwindow} border ${q.color}`, 
                                n: `${Classes.itemlookupitemwindow}`, 
                                html: "",
                                close:Classes.closefeature,
                            };
                            let upg = "";
                            0 < item.upgrade && (upg = "+" + item.upgrade);
                            let innerHtml = "";
                            weap.includes(item.type) && (innerHtml += Item.Weapon(item), Array.from(item.stats.keys()).slice(0, 2).forEach(function (a) {
                                return item.stats["delete"](a);
                            }));
                            
                            for (const [key, value] of item.stats.entries()) {                            
                                let qa = Item.Quality(value.qual);
                                if (value.type == "base") {                                
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)}% ${StatsData[key]}`}); 
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)} ${StatsData[key]}`});                                    
                                    } else {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${value.value} ${StatsData[key]}`});
                                    }
                                } else if (value.type == "bonus") {
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;     
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)} ${StatsData[key]} ${Math.round(value.qual)}%`});                                                              
                                    } else if (StatsData[key] == "Item Find") {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else {
                                        innerHtml += Itemization.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value} ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    }
                                }
                            }

                            let isBoundHtml = "";
                            if(item.bound){
                                isBoundHtml = `<div class="textgreen"> Character Bound </div>`;
                            }
                            
                            buildThis.html = `<div class="slotdescription svelte-18ojcpo"> <div class="container svelte-e3ao5j"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div></div>`;
                            
                            UI.Append(`${Classes.laycon}:first`, Itemization.Build("windowPanel", buildThis));
                            $(`.${Classes.itemlookupitemwindow}`).css({top: 100, left: 250});
                            $(`.${Classes.itemlookupitemwindow}`).show();
                            UI.CloseElementDelegation($(`.${Classes.itemlookupitemwindow}`)[0]); 
                            Customizer.AddDrag($(`.${Classes.itemlookupitemwindow}`)[0], $($(`.${Classes.itemlookupitemwindow}`)[0]).find(`.${Classes.windowHandle}`)[0], OXkey);
                        }
                    }
                }
            });
        }     
    }

    static async CreateSingle(id){
        await Itemization.DirectLookup(id).then(function (result) {
            if(result!=undefined){
                let buildThis = result[0];
                let OXkey = result[1];        

                UI.Append(`${Classes.laycon}:first`, Itemization.Build("windowPanel", buildThis));
                $(`.${Classes.itemlookupitemwindow}`).css({top: 100, left: 250});
                $(`.${Classes.itemlookupitemwindow}`).show();
                UI.CloseElementDelegation($(`.${Classes.itemlookupitemwindow}`)[0]); 
                Customizer.AddDrag($(`.${Classes.itemlookupitemwindow}`)[0], $($(`.${Classes.itemlookupitemwindow}`)[0]).find(`.${Classes.windowHandle}`)[0], OXkey);
            }
        });
    }

    static async CompareCreate(ids){            
        let inUse = false;
        let OXkey = `${Classes.itemlookComparewindow}`;

        $(`.${Classes.itemlookComparewindow}`).length && $(`.${Classes.itemlookComparewindow}`).remove();   
        let buildThis = {
            text: '', 
            cls: `${Classes.itemlookComparewindow}`, 
            n: `${Classes.itemlookComparewindow}`, 
            html: "",
            close:Classes.closefeature,
        };
        
        SharedCompared = [];
        //>167591381,167803766
        let proxyArray = new Proxy(SharedCompared, {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, property, value, receiver) {
                target[property] = value;
                if(SharedCompared.length===2 && !inUse){
                    inUse = true;
                    $(`.${Classes.itemlookComparewindow}`).length && $(`.${Classes.itemlookComparewindow}`).remove();   
                    buildThis.html = SharedCompared.join("<div class='combsplit'></div>");
                    UI.Append(`${Classes.laycon}:first`, Itemization.Build("windowPanel", buildThis));
                    $(`.${Classes.itemlookComparewindow}`).css({top: 100, left: 250});
                    $(`.${Classes.itemlookComparewindow}`).show();
                    UI.CloseElementDelegation($(`.${Classes.itemlookComparewindow}`)[0]); 
                    Customizer.AddDrag($(`.${Classes.itemlookComparewindow}`)[0], $($(`.${Classes.itemlookComparewindow}`)[0]).find(`.${Classes.windowHandle}`)[0], OXkey);
                    
                }
                return true;
            }
        });

        $.each(ids, function(hand, val){
            (async() => {
                await Itemization.DirectLookup(parseInt(val), true).then(function (result) {
                    proxyArray.push(result);
                });
            })();
        });        
    }


    static GetFromStringItemID(string){
        let re = />[1-9]\d*\b/g;
        let matches = string.match(re);
        if (matches !== null) {
            let id = matches[0].slice(1);
            if(UI.Exist(id)){
                return id;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    static ProcessChatClick(event){
        let target = event.currentTarget;
        let itemID = $(target).data('itemid');
        if(typeof itemID != 'number' && itemID.includes(',')){
            if((itemID.match(/,/g) || []).length==1){
                Itemization.CompareCreate(itemID.split(','));
            }else{
                
            }
        }else{
            Itemization.CreateSingle(parseInt(itemID));
        }
    }
}