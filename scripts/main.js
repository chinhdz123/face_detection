// import { faces } from "../data/faces.js";
import { get_list_face } from "./getFace.js"


get_list_face().then((facesHTML) => {
    // Xử lý facesHTML ở đây
    document.querySelector("#clients").innerHTML = facesHTML;
});


function deleteImage(imageContainer) {
    const url = 'http://192.168.1.7:5004/api1/v1/collect_face/delete_face';
    const srcImage = imageContainer.querySelector('img').src.replace(/^http:\/\/192\.168\.1\.7:5004\//, '');
    const data = {
        image_path: srcImage
    };

    // Tùy chọn của fetch
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Các header khác nếu cần thiết
        },
        body: JSON.stringify(data)
    };
    // Gọi API
    fetch(url, options)
        .then(response => {
            // Kiểm tra xem yêu cầu có thành công hay không (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript (nếu có)
            return response.json();
        })
        .then(result => {
            // Xử lý kết quả (nếu cần)
            console.log(result);
            
            // Sau khi xóa thành công, cập nhật danh sách ảnh
            get_list_face().then((facesHTML) => {
                // Xử lý facesHTML ở đây
                document.querySelector("#clients").innerHTML = facesHTML;
            });
        })
        .catch(error => {
            console.error(`An error occurred: ${error}`);
        });

}

// Thêm sự kiện click cho nút xóa
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        
        const imageContainer = event.target.closest('.container-img');
        console.log(imageContainer.innerHTML)

        if (imageContainer) {
            // Gọi hàm xóa ảnh và cập nhật danh sách
            deleteImage(imageContainer);
        }
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-button')) {
        
        const input = event.target.closest('.container-footer').querySelector(".container-input").querySelector("input")
        const image_path = event.target.closest('#clients-info-contenter').querySelector(".container-img").querySelector("img").src.replace(/^http:\/\/192\.168\.1\.7:5004\//, '');
        if (input.value){
            const data = {
                name: input.value,
                image_path: image_path
            };
            const url = 'http://192.168.1.7:5004/api1/v1/collect_face/save_face';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Các header khác nếu cần thiết
                },
                body: JSON.stringify(data)
            };
            fetch(url, options)
                .then(response => {
                    // Kiểm tra xem yêu cầu có thành công hay không (status code 200)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript (nếu có)
                    return response.json();
                })
                .then(result => {
                    // Xử lý kết quả (nếu cần)
                    console.log(result);
                    
                    // Sau khi xóa thành công, cập nhật danh sách ảnh
                    get_list_face().then((facesHTML) => {
                        // Xử lý facesHTML ở đây
                        document.querySelector("#clients").innerHTML = facesHTML;
                    });
                })
                .catch(error => {
                    console.error(`An error occurred: ${error}`);
                });

        }

        // if (containerInput) {
        //     // Gọi hàm xóa ảnh và cập nhật danh sách
        //     deleteImage(imageContainer);
        // }
    }
});