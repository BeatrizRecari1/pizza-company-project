import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { service_account } from "./secrets.js"

initializeApp ({
    credential: cert(service_account)
});

const db = getFirestore();

const pizza_Pepperoni = {
    type: "pepperoni pizza",
    ingredients: ["pepperoni", "cheese", "tomato"],
    addons: ["arugola", "black pepper", "truffle"],
    size: "medium",
    price: 9.99,
    togo: true
};

const pizza_Vegetarian = {
    type: "vegetarian",
    ingredients: ["artichoke", "red pepper", "green pepper", "onion"],
    addons: ["truffle", "pineapple"],
    size: "large",
    price: 11.99,
    togo: true
};

const pizza_Hawaiian = {
    type: "Hawaiian",
    ingredients: ["pineapple", "tomato", "cheese", "ham"],
    addons: ["black pepper", "parmesan cheese"],
    size: "large",
    price: 13.99,
    togo: false
};

const customer1 = {
    subscribed: true,
    email: "todda@something.com",
    name: "Todd Albert",
    dob: "01/01/1985",
    phoneNumber: "561-555-5555"
}

const customer2 = {
    subscribed: false,
    email: "jiho@somethingelse.com",
    name: "Jiho Sahn",
    dob: "01/02/1985",
    phoneNumber: "561-222-2222"
}

const order1 = {
    customerName: customer1.name, 
    customerEmail: customer1.email,
    typePizza: "pizza_Pepperoni",
    paymentMethod: "PayPal",
    userRegistered: customer1.subscribed

};

const order2 = {
    customerName: customer2.name,
    customerEmail: customer2.email,
    typePizza: ["pizza_Hawaiian", "pizza_Vegeterian"],
    paymentMethod: "credit card",
    userRegistered: customer2.subscribed
};

const order3 = {
    customerName: customer2.name,
    customerEmail: customer2.email,
    typePizza: ["pizza_Pepperoni"],
    paymentMethod: "Paypal",
    userRegistered: customer2.subscribed
};

// add document to collection
const addDoc = async (item, coll) => {
    const result = await db.collection(coll).add(item)
    console.log(`Added Items to Collection  ${result.id}`)
}


const getData = async (coll) => {
	const collection = await db.collection(coll).get();

	const pizzaDB = collection.docs.map((doc) => {
		let food = doc.data();
		food.id = doc.id;
		return food;
	});
	console.table(pizzaDB);
};



// await addDoc(pizza_Pepperoni,"pizza");
// await addDoc(pizza_Vegetarian, "pizza");
// await addDoc(pizza_Hawaiian, "pizza");

// await addDoc(customer1, "customer");
// await addDoc(customer2, "customer");

// await addDoc(order1, "order");
// await addDoc(order2, "order");
// await addDoc(order3, "order");

await getData("pizza")
await getData("customer")
await getData("order")
