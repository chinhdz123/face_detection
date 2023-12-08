import { faces } from "../data/faces.js";
let facesHTML = '';

faces.forEach((face) => {
    facesHTML += `
        <div id="clients-info-contenter">
            <div class="container-img">
                <img src="${face.image}" alt="">
                <button></button>
            </div>

            <div class="container-name-buttons">
                <div class="container-name-button">
                    <button>${face.names[0]}</button>
                </div>
                <div class="container-name-button">
                    <button>${face.names[1]}</button>
                </div>
                <div class="container-name-button">
                    <button>${face.names[2]}</button>
                </div>
                
            </div>
            <div class="container-footer">
                <div class="container-input">
                    <input type="text" placeholder="Input name">
                </div>
                <div class="container-add-button">
                    <button>Add</button>
                </div>
                
            </div>
        </div>`
})

console.log()
document.querySelector("#clients").innerHTML = facesHTML;