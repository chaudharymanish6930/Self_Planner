// Show custom notification
function showNotification(message, type = "success") {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    container.appendChild(notification);

    // Trigger show animation
    setTimeout(() => notification.classList.add("show"), 50);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Dynamic navigation highlight
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
        link.addEventListener("click", () => {
            showNotification(`Navigating to ${link.textContent}`, "success");
        });
    });

    // Show welcome notification
    showNotification("Welcome to Self Planner!", "success");

    // Contact form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.querySelector("[name='name']");
            const email = form.querySelector("[name='email']");
            const message = form.querySelector("[name='message']");
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            if (!name.value || !email.value || !message.value) {
                showNotification("Please fill all fields!", "error");
            } else if (!email.value.match(emailPattern)) {
                showNotification("Invalid email address!", "error");
            } else {
                showNotification("Message sent successfully!", "success");
                form.reset();
            }
        });
    }

    // Interactive gallery modal
    const galleryImages = document.querySelectorAll(".gallery img");
    if (galleryImages.length) {
        const modal = document.createElement("div");
        modal.id = "image-modal";
        modal.style.cssText = `
            display:none; position:fixed; top:0; left:0;
            width:100%; height:100%; background:rgba(0,0,0,0.8);
            justify-content:center; align-items:center; z-index:10000;
        `;
        const img = document.createElement("img");
        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";
        modal.appendChild(img);
        document.body.appendChild(modal);

        galleryImages.forEach(image => {
            image.style.cursor = "pointer";
            image.addEventListener("click", () => {
                img.src = image.src;
                modal.style.display = "flex";
                showNotification("Image opened", "success");
            });
        });

        modal.addEventListener("click", () => modal.style.display = "none");
    }
});
