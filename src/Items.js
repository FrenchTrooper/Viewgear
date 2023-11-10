const Ho=function(a,b){return a[Math.floor(b*a.length)]},Xo={hammer:{audio:"weaponmetal",rot:1},bow:{audio:"weaponwood",rot:1},staff:{audio:"weaponwood",rot:1},sword:{audio:"weaponmetal",rot:1},armlet:{audio:"leather"},armor:{audio:"armor"},bag:{audio:"leather"},boot:{audio:"leather"},glove:{audio:"leather"},ring:{audio:"small"},amulet:{audio:"small"},quiver:{audio:"leather",rot:1},shield:{audio:"armor"},totem:{audio:"armor",rot:1},orb:{audio:"armor"},rune:{audio:"small",rot:0},misc:{audio:"potion",
rot:1},book:{audio:"leather"},mount:{audio:"leather",rot:0},box:{audio:"box",rot:0},gold:{audio:"gold"},charm:{audio:"small"}},jo={hammer:{baselvl:0,slot:[101],tiers:17,drop:.4,weight:1,"class":3,stats:{10:{base:1,min:.6,max:1},11:{base:3,min:.8,max:1.7},17:{base:15,min:.05,max:.1}}},bow:{baselvl:0,slot:[101],tiers:17,drop:.4,weight:1,"class":2,stats:{10:{base:1,min:.6,max:1},11:{base:3,min:.8,max:1.7},17:{base:10,min:.05,max:.1}}},staff:{baselvl:0,slot:[101],tiers:17,drop:.4,weight:1,"class":1,stats:{10:{base:1,
min:.6,max:1},11:{base:3,min:.8,max:1.7},17:{base:10,min:.05,max:.1}}},sword:{baselvl:0,slot:[101],tiers:17,drop:.4,weight:1,"class":0,stats:{10:{base:1,min:.6,max:1},11:{base:3,min:.8,max:1.7},17:{base:20,min:.05,max:.1}}},armlet:{baselvl:1,slot:[102],tiers:13,drop:1,weight:.3,stats:{6:{base:10,min:.5,max:.9},12:{base:7,min:.5,max:.8}}},armor:{baselvl:2,slot:[103],tiers:11,drop:1,weight:1,stats:{12:{base:10,min:1.4,max:2.8},6:{base:20,min:1,max:2}}},bag:{baselvl:5,slot:[104],tiers:5,drop:1,weight:.1,
stats:{19:{base:1,min:.1,max:.3}}},boot:{baselvl:2,slot:[105],tiers:13,drop:1,weight:.4,stats:{6:{base:10,min:.6,max:1},12:{base:8,min:.6,max:1.1},15:{base:3,min:.03,max:.1}}},glove:{baselvl:2,slot:[106],tiers:13,drop:1,weight:.4,stats:{6:{base:10,min:.6,max:1},12:{base:8,min:.7,max:1.1},14:{base:1,min:.1,max:1.5}}},ring:{baselvl:5,slot:[107],tiers:12,drop:.8,weight:.2,stats:{6:{base:10,min:.5,max:.9},7:{base:5,min:.6,max:1}}},amulet:{baselvl:7,slot:[108],tiers:12,drop:.8,weight:.3,stats:{7:{base:10,
min:1,max:1.8},9:{base:1,min:.2,max:.3}}},quiver:{baselvl:2,slot:[109],tiers:10,drop:.7,weight:.5,"class":2,stats:{14:{base:5,min:.1,max:.9},9:{base:1,min:.1,max:.3}}},shield:{baselvl:2,slot:[109],tiers:10,drop:.7,weight:.5,"class":0,stats:{12:{base:20,min:.8,max:1.4},13:{base:4,min:1,max:2.8}}},totem:{baselvl:2,slot:[109],tiers:10,drop:.7,weight:.5,"class":3,stats:{12:{base:10,min:.4,max:.9},9:{base:1,min:.1,max:.4}}},orb:{baselvl:2,slot:[109],tiers:10,drop:.7,weight:.5,"class":1,stats:{3:{base:10,
min:.3,max:.7},9:{base:1,min:.1,max:.3}}},rune:{baselvl:1,tiers:11,drop:.8,quality:70},misc:{drop:7,weight:.1},book:{drop:1.5,weight:.5},charm:{slot:[110,111],noupgrade:!0,undroppable:!0,drop:0,stackable:!1},mount:{noupgrade:!0,undroppable:!0,drop:0,stackable:!1},box:{noupgrade:!0,undroppable:!0,drop:0,stackable:!1},gold:{drop:20}},Jo=Object.keys(jo),Vo={6:{min:.2,max:.8,round:!0},7:{min:.2,max:.5,round:!0},8:{min:.1,max:1},9:{min:.1,max:.5},10:{min:.03,max:.13,round:!0},11:{min:.1,max:.2,round:!0},
12:{min:.1,max:.8,round:!0},13:{min:.1,max:.4},14:{min:.1,max:.5},16:{min:.1,max:.4},2:{min:.08,max:.45,round:!0},0:{min:.08,max:.45,round:!0},3:{min:.08,max:.45,round:!0},4:{min:.08,max:.45,round:!0},1:{min:.08,max:.45,round:!0},5:{min:.08,max:.45,round:!0},18:{min:.01,max:.15,round:!0}},Yo={6:4,7:3,8:5,9:4,10:1,11:1,12:5,13:5,14:5,15:.3,16:5,17:0,2:2,0:2,3:2,4:2,1:2,5:2,19:1,18:3},wM=Object.keys(Vo);
const Uy=function(a,c){return jo[a].baselvl+Math.floor(c/jo[a].tiers*100)},Dy=function(a,c){var d={level:a.level,type:a.type,tier:a.tier,stats:a.stats?new Map:void 0,"class":a["class"],quality:a.quality};a.stats&&Object.keys(a.stats).sort(function(b,e){return b-e}).forEach(function(b){var e=a.stats[b];d.stats.set(parseInt(b),{min:e.base+a.level*e.min,max:e.base+(a.level+10)*e.max})});c[a.type+a.tier]=d},zy=function(a){for(var c in jo)if(jo[c].tiers)for(var d=jo[c],b=0;b<d.tiers;++b)Dy({type:c,tier:b,
stats:d.stats,level:Uy(c,b),"class":d["class"],quality:d.quality},a)},Ry={};zy(Ry);
const sit = ["rune", "misc", "book", "mount"], weap = ["hammer", "staff", "sword", "bow"], stsperc = ["Critical","Block", "Haste"], stsdivten = ["HP Reg./5s", "MP Reg./5s"];