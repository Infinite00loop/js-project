var list1=document.getElementById('ul1');
var list2=document.getElementById('ul2');
var list3=document.getElementById('ul3');
list1.addEventListener('click' ,removeElement);
list2.addEventListener('click' ,removeElement);
list3.addEventListener('click' ,removeElement);
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/e38d7c6343954ae39345e8c04db42d13/products')
    .then((res)=> {
        console.log(res)

        for(var i=0; i<res.data.length;i++){
            showData(res.data[i])
        }
    })
    .catch((err) =>{
        console.log(err)
    })
})
 function addProduct(){
    var price_=document.getElementById('id1').value;
    var prod_=document.getElementById('id2').value;
    var categ_=document.getElementById('id3').value;
    

    let myObj={
        price: price_,
        product: prod_,
        category: categ_
    };

    
            axios.post('https://crudcrud.com/api/e38d7c6343954ae39345e8c04db42d13/products',myObj)
           .then((res)=> console.log(res))
           .catch((err)=> console.log(err)); 
        
        
    
    
    showData(myObj);
   
}
function showData(obj){
    var newList=document.createElement('li');
    newList.className="list-group-item";
    var text=obj.price+" - "+obj.product+" - "+obj.category+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className="btn btn-danger btn-sm delete";
     delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    if(obj.category=='Electronic'){
        list1.appendChild(newList);
    }
    else if(obj.category=='Food'){
        list2.appendChild(newList);
    }
    else{
        list3.appendChild(newList);
    }
}

function removeElement(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
           
            var cat=li.textContent.split(" - ")[2];
            var prod=li.textContent.split(" - ")[1];

            axios.get('https://crudcrud.com/api/e38d7c6343954ae39345e8c04db42d13/products',{
                params:{product:prod}
            })
            .then(
                (res)=>{
                    console.log(res);
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].product==prod)
                        axios
                        .delete(`https://crudcrud.com/api/e38d7c6343954ae39345e8c04db42d13/products/${res.data[i]._id}`)
                        .then(res=>console.log(res))
                        .catch(err=>console.log(err))
                    }
                }
            )
            .catch(
                (err)=>console.log(err)
                
            )

            if(cat=='Electronic'){
                list1.removeChild(li);
            }
            else if(cat=='Food'){
                list2.removeChild(li);
            }
            else{
                list3.removeChild(li);
            }  
            
        }
    }
}