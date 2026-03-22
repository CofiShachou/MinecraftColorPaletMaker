// debugger;
$("body").prepend(`
    <header>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="palletMaker.html">Pallet maker</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="author.html">Author</a></li>
        </ul>
    </header>
`)

let aktvniBrojStrane=1

//⁢⁣⁣///////////////////////    AJAX   ///////////////////////⁡
if(window.location.pathname=="/palletMaker.html"){
    let blocks
    let blocksStatic
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
            blocksStatic=JSON.parse(this.responseText)
        }
        else{
            // console.log(con.status);
        }

    }
    con.open("GET","resources/json/blocks.json",false)
    con.send();
//⁡⁣⁣⁢/////////////////////////////////////////////////////////////////////⁡

//⁡⁢⁣⁣/////////////////    AUTO FILL   ////////////////////⁡


    let colors=["Chose color"]
    let categories=[]
    let checkedCategories=[]
    let chosenColor
    let ima=false
    let blocksFiltered
    let blocksFilteredName
    let blocksFilteredCategory
    let blocksFilteredColor
    let searchText
    let filterAll
    let izabraniBlock

    

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

        // $(".page").text("")
        $(".page").empty()

        if($("#commingSoon h2").text()){
            $("#commingSoon").remove()
        }
        let br=1;

        
        // console.log("DSADHJASFGDHASYUSDGHJKAS= "+JSON.stringify(blocksFilteredColor));
        // console.log("Name filtered= "+JSON.stringify(blocks));
        if($("#color").val()=="Chose color" && checkedCategories.length==0 && $("#name").val()==""){
            blocks=blocksStatic
        }
        else{
            blocks=filterAll
        }
        // if($("#color").val()!="Chose color" && checkedCategories.length==0){
        //     blocks=blocksFilteredColor
        // }
        // if($("#color").val()=="Chose color" && checkedCategories.length!=0){
        //     blocks=blocksFilteredCategory
        // }
        // if($("#color").val()!="Chose color" && checkedCategories.length!=0){
        // }

        // console.log("DSADHJASFGDHASYUSDGHJKAS= "+JSON.stringify(blocks));


        let brojStrana=(blocks.length /12)
        brojStrana=Math.ceil(brojStrana)




        $(".pages").empty()
        for(let i=0;i<brojStrana;i++){
            $(".pages").append(`<p>`+(i+1)+`</p>`)
        }


        // console.log("BLOKS= "+JSON.stringify(blocks));
        
        if($("#sort").val()=="Name asc"){
            blocks=blocks.sort((a,b)=>a.name.localeCompare(b.name))
        }
        if($("#sort").val()=="Name desc"){
            blocks=blocks.sort((a,b)=>b.name.localeCompare(a.name))
        }
        if($("#sort").val()=="Id asc"){
            blocks=blocks.sort((a,b)=>a.id-b.id)
        }
        if($("#sort").val()=="Id desc"){
            blocks=blocks.sort((a,b)=>b.id-a.id)
        }

        for(block of blocks){
            if(br>1*12 && br<=aktvniBrojStrane*12 && aktvniBrojStrane==2){
                append()
            }
            if(br>=1 && br<=12 && aktvniBrojStrane==1){
                append()
            }
            br++
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
                <fieldset name="chategory">
                    <input type="checkbox" value="`+block.category+`" id="`+block.category+`""></input>
                    <label for="`+block.category+`">`+block.category+`</label>
                </fieldset>
            `)
        }
        hasCategory=false
    }

    let sortCrits=["Id asc","Id desc","Name asc","Name desc"]

    for(sort of sortCrits){
        $("#sort").append(`
            <option id="`+sort+`" value="`+sort+`">`+sort+`</option>
        `)
    }

    
//⁡⁣⁣⁢///////////////////////////////////////////////////////////////////////⁡

//⁡⁢⁣⁣/////////////////////    USER INPUT   ////////////////////⁡
    $("#color").change(function (){
        chosenColor=$("#color").val()
        filtered()
    })
    $("#name").on("input",()=>{
        // console.log($("#name").val());
        searchText=$("#name").val()
        filtered()
    })

    $("#category :checkbox").change(function(){
        aktvniBrojStrane=1
        if($(this).is(":checked")){
            checkedCategories.push($(this).val())
        }
        else{
            checkedCategories=checkedCategories.filter(x=>x != $(this).val())
        }
        
        filtered()
    })
    $(document).on("click",".pages p",function(){
        let strane=$(this).text();
        aktvniBrojStrane=Number(strane)
        ShowItems()
    })

    $("#sort").change(()=>{
        appSve()
    })

    
//⁡⁣⁣⁢/////////////////////////////////////////////////////////////////////⁡

//⁡⁢⁣⁣//////////////////////  FUNCTIONS   ////////////////////////////⁡
    function append(){
        appText=`<div class="item">`
        appText+=`
        <img src="resources/images/`+block.img+`"/>
        <h2>`+block.name+`</h2>
        <p>Color: `+block.color+`</p>
        <p>Category: `+block.category+`</p>
        <p class="invisibleId">`+block.id+`</p>
        <button class="addBlock">Add block</button>
        `
        appText+=`</div>`
        $(".page").append(appText)  
            
    }


    function filtered(){

        blocksFilteredCategory = blocksStatic.filter(x => checkedCategories.includes(x.category));
        blocksFilteredColor = blocksStatic.filter(x => x.color==chosenColor);
        blocksFilteredName=blocksStatic.filter(x=>x.name.includes(searchText))

        // console.log("Name= "+searchText);
        
        filterAll=[...new Set([...blocksFilteredCategory,...blocksFilteredColor,...blocksFilteredName])]
        console.log("Filter all= "+JSON.stringify(filterAll));

        // console.log("FILTERED COLOR= "+JSON.stringify(blocksFilteredColor));
        

        // blocksFiltered=blocksStatic.filter(x=>)
        // console.log(blocksFiltered);
        appSve()
    }
    function ShowItems(){
        $(".page").text("")

        $(".page").text("")
        if($("#commingSoon h2").text()){
            $("#commingSoon").remove()
        }
        let br=1;
        appSve()
    }



//⁡⁣⁣⁢/////////////////////////////////////////////////////////////⁡





//⁡⁢⁣⁣/////////////////////////////////   PALLETS /////////////////////////////////⁡





$(document).on("click",".addBlock",function(){
    izabraniBlock=$(this).siblings(".invisibleId").text()

    $("#popUp").css({
        "display":"flex"
    })

    setTimeout(() => {
        $("#popUp").css({
            "opacity":"1"
        })
    }, 100);

    let pallets=JSON.parse(localStorage.getItem("pallets")) || []
    $("#pallets").empty()

    let appText2=""
    for(pallet of pallets){
        appText2=`<div id="`+pallet.id+`">
            <p>`+pallet.name+`</p>
            <div class="miniPallets">`



        if(pallet.blocks.length){
            for(block of blocks){
                for(pal of pallet.blocks){
                    if(block.id == pal)
                        appText2+=`<img src=resources/images/`+block.img+` alt="block">`
                }
            }
            for(let i=6-pallet.blocks.length;i>0;i--){
                appText2+=`<img src=resources/images/default.png alt="block">`
            }
        }
        else{
            for(let i=0;i<6;i++){
                appText2+=`<img src="resources/images/default.png" alt="block">`
            }     
        }
        
        appText2+=`</div></div>`
        $("#pallets").append(appText2)
    }
    
    
})
$("#closePallets").click(()=>{
    $("#popUp").css({
        "opacity":"0"
    })

    setTimeout(() => {
        $("#popUp").css({
            "display":"none"
        })
    }, 200);
})

$("#addPallet").click(()=>{
    setTimeout(() => {
        $("#createPallet").css({
            opacity:1,
            height:"2.5vw",
        })
    }, 100);
})

$(document).on("click","#cancle",function(){
    setTimeout(() => {
            $("#createPallet").css({
                opacity:0,
                height:"0px",
            })
        }, 100);
})
$(document).on("click","#create",function(){
    let brojObjekata=JSON.parse(localStorage.getItem("pallets"))
    brojObjekata=brojObjekata.length
    console.log("Broj objekata= "+brojObjekata);
    
    if(brojObjekata<6){

        let palletName=$("#palletName").val()

        $("#palletName").val("")
        let palletId=0
        let numberOfPallets=localStorage.getItem("numberOfPallets")
        
        palletId=++numberOfPallets
        localStorage.setItem("numberOfPallets",numberOfPallets)
        // localStorage.setItem("numberOfPallets",JSON.stringify(0))
        
        
        let pallet={
            id:palletId,
            name:palletName,
            blocks:[]
        }
        let pallets=JSON.parse(localStorage.getItem("pallets")) || []
        // let pallets
        pallets.push(pallet)
        localStorage.setItem("pallets",JSON.stringify(pallets))
        
        setTimeout(() => {
            $("#createPallet").css({
                opacity:0,
                height:"0px",
            })
        }, 100);
        $("#pallets").append(`
            <div id="`+palletId+`">
            <p>`+palletName+`</p>
            <div class="miniPallets">
                <img src="resources/images/default.png" alt="block">
                <img src="resources/images/default.png" alt="block">
                <img src="resources/images/default.png" alt="block">
                <img src="resources/images/default.png" alt="block">
                <img src="resources/images/default.png" alt="block">
                <img src="resources/images/default.png" alt="block">
            </div>
            </div>
            `)
        }
        else{
            console.log("Nije moguce imati vise od 6 paleta");
            
        }
})


$(document).on("click","#pallets>div",function(){
    // console.log($(this).children(".miniPallets").children("img").attr("src"));
    let izabranaPaleta=$(this).attr("id")
    for(let i=1;i<=6;i++){
        if($(this).children(".miniPallets").children("img:nth-child("+i+")").attr("src")=="resources/images/default.png"){
            for(block of blocks){
                if(block.id == izabraniBlock){
                    $(this).children(".miniPallets").children("img:nth-child("+i+")").attr("src","resources/images/"+block.img+"")
                    break
                }
            }
            break
        }
    }
    console.log("KRAJ");
    let updatePallets=JSON.parse(localStorage.getItem("pallets"))

    let palletToChange=updatePallets.find(x=>x.id==izabranaPaleta)
    palletToChange.blocks.push(izabraniBlock)

    localStorage.setItem("pallets",JSON.stringify(updatePallets))
    // localStorage.setItem("pallets",updatePallets)
    
})



}
//⁡⁣⁣⁢///////////////////////////////////////////////////////////////⁡
