import {auth,db} from "../admindashboard/firebaseconfig.js";
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { doc,setDoc,getDoc,getDocs,collection,addDoc,deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

document.getElementById("user-email").innerText= localStorage.getItem("email");
document.getElementById("user-role").innerText=localStorage.getItem("role");

document.getElementById("add").addEventListener("click",async (e)=>{
	e.preventDefault();
	let title = document.getElementById("prod-title").value;
	let price = document.getElementById("prod-price").value;
	let image = document.getElementById("prod-img").value;
     if(!title || !price || !image){
		alert("Enter valid details");
		return 
	 }
	 let products ={
		title,price,image
	 }
    //I'm using addDoc for adding products with auto generated id 
	 let res = await addDoc(collection(db,"products"),products);

	
	
})


async function fetchproducts(){
  // fetching data from a collection using getDocs
	let querysnap = await getDocs(collection(db,"products"))
	querysnap.forEach((element) => {
		
		let product = element.data();
		
		let id = element.id
		displayProducts(product,id)
	});
	

}
window.openEditForm = function (id, title, price, image) {
	// Show form and pre-fill it
	document.getElementById("edit-form").style.display = "block";
	document.getElementById("edit-title").value = title;
	document.getElementById("edit-price").value = price;
	document.getElementById("edit-image").value = image;
  
	// When Save is clicked, update the product
	document.getElementById("save-edit-btn").onclick = async function () {
	  const updatedProduct = {
		title: document.getElementById("edit-title").value,
		price: Number(document.getElementById("edit-price").value),
		image: document.getElementById("edit-image").value
	  };
  
	  const docRef = doc(db, "products", id);
	  await updateDoc(docRef, updatedProduct);
	  alert("Product updated!");
  
	  document.getElementById("edit-form").style.display = "none";
	  fetchproducts() // Refresh the list
	};
  };

function displayProducts(product, id) {
	const container = document.getElementById("product-list");
	container.innerHTML += `
	  <div>
		<h3>${product.title}</h3>
		<img src="${product.image}" width="100">
		<p>Price: ₹${product.price}</p>
		<button onclick="deleteProduct('${id}')">Delete</button>
		<button onclick="openEditForm('${id}', '${product.title}', '${product.price}', '${product.image}')">Edit</button>
	  </div>
	`;
  }

  async function deleteProduct(id) {
	await deleteDoc(doc(db, "products", id));
	fetchproducts()
  }
fetchproducts()