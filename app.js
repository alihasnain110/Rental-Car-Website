// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWEtNQgvR6vcfQhbeN-GPw6DX4LYl9MQw",
    authDomain: "liveclientproject.firebaseapp.com",
    databaseURL: "https://liveclientproject-default-rtdb.firebaseio.com",
    projectId: "liveclientproject",
    storageBucket: "liveclientproject.firebasestorage.app",
    messagingSenderId: "344073973076",
    appId: "1:344073973076:web:1c4cf2635f9ae56861ecc1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to handle signup
function signUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully signed up
            var user = userCredential.user;

            // Save user data to the Firebase database
            return firebase.database().ref('users/' + user.uid).set({
                name: name,
                email: email
            });
        })
        .then(() => {
            console.log("User data saved to database.");

            // Clear form inputs
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            // Redirect to project.html
            window.location.href = "project.html";
        })
        .catch((error) => {
            // Handle errors during signup or data saving
            var errorMessage = error.message;
            console.error("Error:", errorMessage);
            alert(errorMessage);
        });
}
