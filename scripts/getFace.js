const apiUrl = 'http://192.168.1.7:5004/api1/v1/collect_face/get_list_face';


export async function get_list_face() {
    let facesHTML = '';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.listface) {
            const listFaces = data.listface;

            listFaces.forEach(face => {
                const image_path = "http://192.168.1.7:5004/" + face.image_path || "";
                const names = face.names || [];
                facesHTML += `
                            <div id="clients-info-contenter">
                                <div class="container-img">
                                    <img src="${image_path}" alt="">
                                    <button class="delete-button"></button>
                                </div>
                    
                                <div class="container-name-buttons">
                                    <div class="container-name-button">
                                        <button>${names[0] || ''}</button>
                                    </div>
                                    <div class="container-name-button">
                                        <button>${names[1] || ''}</button>
                                    </div>
                                    <div class="container-name-button">
                                        <button>${names[2] || ''}</button>
                                    </div>
                                    
                                </div>
                                <div class="container-footer">
                                    <div class="container-input">
                                        <input type="text" placeholder="Input name" value="${names[0] || ''}"=>
                                    </div>
                                    <div class="container-add-button">
                                        <button class="add-button">Add</button>
                                    </div>
                                    
                                </div>
                            </div>`;
            });
        } else {
            console.error("Key 'listface' not found in the response.");
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }

    return facesHTML;
}
