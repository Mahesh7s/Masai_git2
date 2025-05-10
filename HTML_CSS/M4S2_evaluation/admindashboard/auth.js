import {auth,db} from "../admindashboard/firebaseconfig.js";
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { doc,setDoc,getDoc,getDocs } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded",async ()=>{
	let login = document.getElementById("login-btn")
	let signup = document.getElementById("signup-btn")
    let logout = document.getElementById("logout");
	if(login){
		login.addEventListener("click",async()=>{
			console.log("IN LOGIN")
			let email = document.getElementById("login-email").value;
			let password = document.getElementById("login-password").value;
			try{
				 let userCredentials = await signInWithEmailAndPassword(auth,email,password)
				 let userDoc = doc(db,"users",userCredentials.user.uid);
				 let docsnap = await  getDoc(userDoc)
				 if(docsnap.exists()){
					let userdata = docsnap.data()
					let role = userdata.role 
					localStorage.setItem("userID", userCredentials.user.uid);
                    localStorage.setItem("role", role);
					localStorage.setItem("email",userCredentials.user.email);
                   
					if(role==="admin"){
				alert("Successfully  logged!")
				window.open("admin.html","_blank");
					}else{
						alert("Successfully  logged!")
				window.open("user.html","_blank");
					}

				 }

				
			}
			catch(err){
				document.getElementById("login-msg").innerText=err.message	;				
			}
		})
	}


	if(signup){
		signup.addEventListener("click", async ()=>{
			let email = document.getElementById("signup-email").value;
			let password = document.getElementById("signup-password").value;
			let role = document.getElementById("role").value;

		try{
			//response after user is created..
			const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
			//store role and email into firestore
			//set doc( type of dc "db", where to add, what to add)
			// usercredentials is a  whole object so we access user from it
			// console.log(userCredentials)
			// console.log(userCredentials.user)
			// console.log(userCredentials.user.uid)
			await setDoc(doc(db, "users", userCredentials.user.uid), {
				email,
				role,
			  });
			  alert("Registered Succesfully")			
			  window.location.href="signin.html"
		}
		catch(err){
			document.getElementById("signup-msg").innerText= err.message
		}
		})
	}



	if(logout){
		logout.addEventListener("click",async()=>{
			await signOut(auth);
			localStorage.removeItem("email")
			localStorage.removeItem("role")
			localStorage.removeItem("userID")
			window.location.href="signin.html";
		})
	}

})