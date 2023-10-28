var list1=document.getElementById('ul1');
var list2=document.getElementById('ul2');
var list3=document.getElementById('ul3');
addProduct(){
    var price_=document.getElementById('id1').value;
    var prod_=document.getElementById('id2').value;
    var categ_=document.getElementById('id3').value;
    

    let myObj={
        price: price_,
        product: prod_,
        category: categ_
    };

     if(anonymousId == undefined){
            axios.post('https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments',myObj)
           .then((res)=> console.log(res))
           .catch((err)=> console.log(err)); 
        }
        else{
            axios.put(`https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments/${anonymousId}`,myObj)
            .then((res)=> console.log(res))
            .catch((err)=> console.log(err)); 
        }
    
    
    var newList=document.createElement('li');
    newList.className="list-group-item";
    var text=price_+" - "+prod_+" - "+categ_+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className="btn btn-danger btn-sm delete";
     delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    if(categ_==Electronic){
        list1.appendChild(newList);
    }
    else if(categ_==Food){
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
           
            var email_=li.textContent.split(" - ")[1];
            console.log(email_)
           
            axios.get('https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments',{
                params:{email:email_}
            })
            .then(
                (res)=>{
                    console.log(res);
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].email==email_)
                        axios
                        .delete(`https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments/${res.data[i]._id}`)
                        .then(res=>console.log(res))
                        .catch(err=>console.log(err))
                    }
                }
            )
            .catch(
                (err)=>console.log(err)
                
            )
            list.removeChild(li);
        }
    }
}