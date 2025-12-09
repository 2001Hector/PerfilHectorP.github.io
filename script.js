'use strict';

// Abrir o cerrar la barra lateral
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {
    elementToggleFunc(sidebar);
});

// Activación de la selección de filtros y opciones de filtrado
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
    select.addEventListener('click', function () {
        elementToggleFunc(this);
    });
}

if (selectItems.length > 0) {
    for(let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// Habilitar el botón de filtro para pantallas más grandes
if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        });
    }
}

// Habilitación del formulario de contacto (si existe)
const form = document.querySelector('[data-form]');
if (form) {
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if(form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else { 
                formBtn.setAttribute('disabled', '');
            }
        });
    }
}

// Habilitar la navegación de la página
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        // Remover active de todos los enlaces
        for(let j = 0; j < navigationLinks.length; j++) {
            navigationLinks[j].classList.remove('active');
        }
        
        // Agregar active al enlace clickeado
        this.classList.add('active');
        
        // Obtener el texto del botón (en minúsculas)
        const pageName = this.innerText.toLowerCase();
        
        // Mostrar/ocultar páginas
        for(let j = 0; j < pages.length; j++) {
            if(pageName === pages[j].dataset.page) {
                pages[j].classList.add('active');
            } else {
                pages[j].classList.remove('active');
            }
        }
        
        window.scrollTo(0, 0);
    });
}
// Funciones para el modal de proyectos (agrega esto al final de tu script.js)
function openProjectModal(imageSrc, title, category, description) {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalProjectImage');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalDesc = document.getElementById('modalProjectDesc');
    
    // Cargar datos en el modal
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalDesc.textContent = description;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Cerrar modal al hacer clic fuera
document.querySelector('.modal-container .overlay').addEventListener('click', closeProjectModal);