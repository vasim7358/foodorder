const firebaseConfig = {
  apiKey: "AIzaSyDpffzmKFoIEt0ZZZxCMeYZcWuERkvXUOQ",
  authDomain: "orderform-48002.firebaseapp.com",
  databaseURL: "https://orderform-48002-default-rtdb.firebaseio.com",
  projectId: "orderform-48002",
  storageBucket: "orderform-48002.firebasestorage.app",
  messagingSenderId: "300145431500",
  appId: "1:300145431500:web:3083c5e3129587d6c8c369"
};
  // Initialize Firebase
  let app = firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
  
  let form = document.querySelector("#food-order-form");
  
  // submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const phonePattern = /^[0-9]+$/;
  
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let foodItem = document.getElementById("food-item").value;
    let quantity = document.getElementById("quantity").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;
  
    if (
      phonePattern.test(phone) &&
      name.length > 0 &&
      foodItem.length > 0 &&
      quantity > 0 &&
      address.length > 0 &&
      payment.length > 0
    ) {
      let formData = {
        name: name,
        phone: phone,
        foodItem: foodItem,
        quantity: quantity,
        address: address,
        payment: payment,
      };
  
      let orderData = JSON.parse(localStorage.getItem("orderData")) || [];
      orderData.push(formData);
      localStorage.setItem("orderData", JSON.stringify(orderData));
  
      database
        .ref("food-orders")
        .push(formData)
        .then(function () {
          form.reset();
          console.log("Food order saved successfully");
          alert("Your order has been placed successfully!");
        })
        .catch(function (error) {
          console.error("Error saving order data:", error);
        });
      form.reset();
    } else {
      alert("Please fill in all the fields correctly.");
    }
  });
  