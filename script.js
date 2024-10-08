let users = [];
const accessKey = '-fBVNHToHL05cr-2au_B05bJJzBvCOWVchx6rckzK1I';


function registerUser() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;

    if (username && email && phone && password) {
        
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            document.getElementById('errorMessage').innerText = 'El usuario ya está registrado.';
        } else {
            
            users.push({ username, email, phone, password });
            document.getElementById('errorMessage').innerText = 'Registro exitoso. ¡Inicia sesión!';
            clearRegisterFields();
            showLoginForm();
        }
    } else {
        document.getElementById('errorMessage').innerText = 'Por favor, completa todos los campos.';
    }
}


function clearRegisterFields() {
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPhone').value = '';
    document.getElementById('registerPassword').value = '';
}


function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('errorMessage').innerText = 'Inicio de sesión exitoso.';
        document.getElementById('loginForm').style.display = 'none'; 
        document.getElementById('gallerySection').style.display = 'block'; 
        clearLoginFields();
    } else {
        document.getElementById('errorMessage').innerText = 'Usuario o contraseña incorrectos.';
    }
}


function clearLoginFields() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}


function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Registro';
}


function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('formTitle').innerText = 'Iniciar Sesión';
}


async function searchImages() {
    const query = document.getElementById('searchInput').value;
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
    }
}


function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'image-item';
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
        gallery.appendChild(imgElement);
    });
}