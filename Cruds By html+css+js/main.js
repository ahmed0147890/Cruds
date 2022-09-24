let tittle=document.getElementById('tittle');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let tbody=document.getElementById('tbody');
let deleteAll=document.getElementById('deleteAll');
let search=document.getElementById("search");
let mod='create';
let x;

///////////////////////////////////////////////////////gertotal()
function gettotal(){
    if(price.value!=""){
        let result=(+price.value+ +taxes.value + +ads.value)- +discount.value
        total.innerHTML=result;
        total.style.backgroundColor='green';
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor='red';

    }
}
//////////////////////////////////////////////////////create()
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product);

}else{
    datapro=[];
}

create.onclick=function(){
    let newproduct={
        tittle:tittle.value,
        price:price.value,
        taxes:taxes.value,
        ads:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value

    }
    
     if(tittle.value!="" && count.value<50)
     {
         if(mod==="create"){
            if(count.value>1){
            for(let i=0;i<count.value;i++){
                datapro.push(newproduct);
            }
            
            
           
            }else{
            datapro.push(newproduct); 
            }
         }else{
            datapro[x]=newproduct;
            create.innerHTML='create';
            mod='create'
            count.style.display='block';
         }
         clear();
         
     }
       
     
        
    
    
    
    localStorage.product=JSON.stringify(datapro);

read();
}

/////////////////////////////////////////////////////////clear()
function clear(){
    tittle.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
/////////////////////////////////////////read()
function read(){
    gettotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].tittle}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                        
                    </tr>
        
        `
    }
    tbody.innerHTML=table;
    if(datapro.length>0){
        deleteAll.innerHTML=`
        
        <button onclick="deleteAlldata()">deleteAll(${datapro.length})</button>
        
        `
    }
    else{
        deleteAll.innerHTML='';
    }
}
read()
/////////////////////////////////////////////////////////////////delete()
function deletedata(i)
{
 datapro.splice(i,1);
 localStorage.product=JSON.stringify(datapro);
 read();
}
//////////////////////////////////////////////////////////deleteAll()
function deleteAlldata(){
    localStorage.clear();
    datapro.splice(0);
    read();
}
////////////////////////////////////////////////////////////////update()
function update(i)
{
    tittle.value=datapro[i].tittle;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display="none";
    category.value=datapro[i].category;
    create.innerHTML='update';
    mod='update';
    x=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    

    

}
////////////////////////////////////////////////////////////////////////search()
let searchmod='';
function searchdata(id)
{
   if(id=="searchtittle"){
    searchmod='tittle';
   }
   else{
    searchmod='category';
   }
   search.focus();
   search.placeholder='search By '+searchmod;
   search.value='';
   read();
   
}
function search1(value)

{
    let table='';
    
    for(let i=0;i<datapro.length;i++)
    {
        if(searchmod=='tittle')
    {
        
       
        if(datapro[i].tittle.includes(value))
        {
            table+=`
            <tr>
                            <td>${i}</td>
                            <td>${datapro[i].tittle}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="update(${i})" id="update">update</button></td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                            
                        </tr>
            
            ` 
        }  
    }
    else
    {
        if(datapro[i].category.includes(value))
        {
            table+=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].tittle}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                        
                    </tr>
        
        `
        }
        

    }
  
    }
    
    
        
       
        tbody.innerHTML=table;

    
}