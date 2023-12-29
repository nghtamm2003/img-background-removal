// Import EmailJS vào dự án
import * as emailjs from "@emailjs/browser";

// Khởi tạo EmailJS với PublicKey
(function () {
    emailjs.init("B3zYso5fFqAc_fhse");
})();

// Gửi email hỗ trợ về hệ thống
function sendEmail() {
    let params = {
        name: document.getElementById("full-name-for-emailjs").value,
        email: document.getElementById("email-for-emailjs").value,
        message: document.getElementById("comment-for-emailjs").value,
    };

    const serviceID = "service_7bjvl4h";
    const templateID = "template_kyh6hgn";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("full-name-for-emailjs").value = "";
            document.getElementById("email-for-emailjs").value = "";
            document.getElementById("comment-for-emailjs").value = "";
            window.alert("Yêu cầu đã được gửi đi! Đội ngũ hỗ trợ sẽ liên lạc với bạn sớm nhất có thể!");
        })
        .catch((error) => {
            console.log(error.message);
        });
}

let submitButton = document.getElementById("submit-button");
// Handle event click vào nút submit
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendEmail();
});
