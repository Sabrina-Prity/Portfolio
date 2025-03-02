document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('https://portfolio-backend-5i77.onrender.com/info/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // CSRF token for protection
            },
            body: JSON.stringify(data)
        });

        // Handle response
        const responseData = await response.json();

        if (response.status === 200) {
            alert(responseData.message);  // Success message
            document.getElementById("contact-form").reset(); // Reset the form after successful submission
        } else {
            alert('Error: ' + responseData.error);  // Error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});

// Function to get the CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
