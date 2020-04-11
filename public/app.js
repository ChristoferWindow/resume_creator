document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const resume = db.collection('resumes').doc('Wg7BAZbvh55sk9xI11lb');
    resume.onSnapshot(doc => {
            const data = doc.data();
            document.querySelector('#updatedData').innerHTML = data.name;
    })
    console.log(resume);
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log)
}

function updatePost(e) {
    const db = firebase.firestore();
    const myResume = db.collection('resumes').doc('Wg7BAZbvh55sk9xI11lb');
    myResume.update({name: e.target.value});
}

function getProducts(quantity = 10) {
    const db = firebase.firestore();
    const resumes = db.collection('products');
    let productList =  document.querySelector('#productsList > tbody');
    let isOdd = false;
    let rowStyle = 'border px-4 py-2';
    let rowOdd = 'bg-gray-200';

    resumes.get()
        .then(products => {
            products.forEach(product => {
                data = product.data();
                console.log(isOdd);
                isOdd = !isOdd;
                console.log(isOdd);
                productList.innerHTML +=
                    `<tr>
                        <td class="${rowStyle} ${isOdd ? rowOdd : "" }">${data.name}</td>
                        <td class="${rowStyle} ${isOdd ? rowOdd : "" }">${data.price / 100} ${data.currency}</td>
                    </tr>`;
            })
        })
}