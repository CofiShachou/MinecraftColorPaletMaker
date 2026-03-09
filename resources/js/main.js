debugger;
$("body").prepend(`
    <header>
        <ul>
            <li>Nesto</li>
            <li>Kae begi jos nesto</li>
        </ul>
    </header>
`)

let blocks
var con
if(window.XMLHttpRequest){
    con=new XMLHttpRequest()
}
else{
    con= new ActiveXObject("Microsoft.XMLHYYP")
}
con.onreadystatechange=function(){
    if(con.readyState==4 && con.status==200){
        blocks=JSON.parse(this.responseText)
    }
    else{
        // console.log(con.status);
    }

}
con.open("GET","resources/json/blocks.json",false)
con.send();


///////////////    ⁡⁢⁣⁣AUTO FILL⁡   //////////////
let colors=["Izaberite boju"]
let categories=[]
for(block of blocks){
    $("#blocks").append(`

        <option>`+
        block.name
        +`</option>
    `)
}
let ima=false
for(block of blocks){
    $("#color option").each(function(){
        if(block.color==$(this).val()){
            ima=true
        }
    })
    if(ima==false){
        colors.push(block.color)
        $("#color").append(`
    
            <option>`+
            block.color
            +`</option>
        `)
    }
    ima=false
}
let appTex
function appSve(){
    
    $(".catalog").text("")
    for(block of blocks){
        // console.log("Ubaci");
        Append()
    }  
}
appSve()

let appCategeory
let hasCategory=false
for(block of blocks){
    $("#category :checkbox").each(function(){
        if(block.category==$(this).val()){
            hasCategory=true
        }
    })
    if(hasCategory==false){
        categories.push(block.category)
        $("#category").append(`
            <div>
                <input type="checkbox" value="`+block.category+`" id="`+block.category+`""></input>
                <label for="`+block.category+`">`+block.category+`</label>
            <div>
        `)
    }
    hasCategory=false
}

////////////    ⁡⁢⁣⁣USER INPUT⁡⁡   //////////////
$("#blocks").change(()=>{
    console.log($("#blocks").val());
    
})
$("#color").change(function (){
    
    SaveFilters($(this).val(),null)
    // ShowItems()
})

$("#category :checkbox").change(function(){
    SaveFilters($(this).val(),$(this).is(":checked"))
    
    // JSON.parse(localStorage.getItem("filter"))[0].color
    // console.log("SAIODHJASG= "+$(this).is(":checked"));
    // ShowItems()
    
})


////////////  ⁡⁢⁣⁣FUNCTIONS⁡   ////////////////////////////
function Append(){
    appText=`<div class="item">`
    appText+=`
    <img src="resources/images/`+block.img+`"/>
    <h2>`+block.name+`</h2>
    <p>Color: `+block.color+`</p>
    <p>Category: `+block.category+`</p>
    `
    appText+=`</div>`
    $(".catalog").append(appText)
    // console.log("TRENUTNI BLOCK= "+JSON.stringify(block));
    
}

function ShowItems(){
    $(".catalog").text("")
    let x=JSON.parse(localStorage.getItem("filter"))
    console.log("X= "+JSON.stringify(x));
    
    let dodati=[]
    let itemPostojiToggle=false
    if(x[0].color!="Izaberite boju" || x[1][0].category!="sve"){
        for(block of blocks){
            for(cat of x[1]){
                if(block.category==cat.category){
                    for(item of dodati){
                        if(block.name==item) itemPostojiToggle=true
                    }
                    if(!itemPostojiToggle){
                        Append()
                        dodati.push(block.name)
                    }
                    itemPostojiToggle=false
                    console.log("DODATI= "+dodati);
                }
            }
            if(block.color==x[0].color ){
                for(item of dodati){
                    if(block.name==item) itemPostojiToggle=true
                }
                if(!itemPostojiToggle){
                    Append()
                    dodati.push(block.name)
                }
                itemPostojiToggle=false
            }
        }
    }
    else{
        appSve()
        dodati=[]
        console.log("SVE");

    }
}
let filter


// ⁡⁢⁣⁣LOCAL STORAGE⁡ //
filter=
[
    {"color":"Izaberite boju"},
    [
        {"category":"sve"}
    ]
]
function SaveFilters(value,ck){
    for(color of colors){
        if(value==color){
            filter[0].color=color
        }
    }
    for(category of categories){
        if(value==category){
            
            if(ck){
                filter[1]=filter[1].filter(v=>v.category!=="sve")
                filter[1].push({"category":category})  
            // console.log(filter[1]);

            }
            else{
                if(filter[1].length==1){
                    filter[1]=filter[1].filter(v=>v.category!==value)
                    filter[1].push({"category":"sve"})       
                }
                else{
                    filter[1]=filter[1].filter(v=>v.category!==value)

                    console.log("ne");

                }
            }

        }
    }
    // console.log("FILTER=  "+JSON.stringify(filter));
    localStorage.setItem("filter",JSON.stringify(filter))
    ShowItems()
}

SaveFilters()
