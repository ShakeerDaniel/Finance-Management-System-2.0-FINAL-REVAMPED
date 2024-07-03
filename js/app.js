document.addEventListener('DOMContentLoaded', function() {
    // Assign event listeners here to ensure the DOM is fully loaded

    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', saveProfileChanges);
    }

    if (window.location.pathname.endsWith("edit-profile.html")) {
        loadProfileData();
    }

    if (window.location.pathname.endsWith("home.html")) {
        loadHomePage();
    }
});

function redirectToHome() {
    window.location.href = "home.html";
}

function redirectToIncome() {
    window.location.href = "income.html";
}

function redirectToExpense() {
    window.location.href = "expense.html";
}

function redirectToBudget() {
    window.location.href = "budget.html";
}

function loadHomePage() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        // Get the profile picture URL
        const profilePicture = localStorage.getItem(`profilePicture_${currentUser}`) || 'image/Pro.jpg';

        // Find the profile picture element
        const profilePictureElement = document.getElementById('profile-picture');
        if (profilePictureElement) {
            // Set the profile picture source
            profilePictureElement.src = profilePicture;
        }

        // Set the welcome message
        document.getElementById('welcome-message').innerText = `Welcome, ${currentUser}`;
    } else {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
    }
}

function changeUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function editProfile() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }
    window.location.href = "edit-profile.html";
}

function saveProfileChanges(event) {
    event.preventDefault();
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const newProfileName = document.getElementById('profile-name').value;
    const profilePictureOption = document.querySelector('input[name="profile-picture-option"]:checked').value;
    let profilePicture = null;

    // Update profile name in localStorage
    localStorage.setItem("currentUser", newProfileName);

    // Update profiles list with new profile name
    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    const profileIndex = profiles.findIndex(profile => profile.name === currentUser);
    if (profileIndex !== -1) {
        profiles[profileIndex].name = newProfileName;
        localStorage.setItem("profiles", JSON.stringify(profiles));
    }

    // Handle profile picture upload or URL
    if (profilePictureOption === 'url') {
        profilePicture = document.getElementById('profile-picture-url').value;
    } else if (profilePictureOption === 'upload') {
        const profilePictureUpload = document.getElementById('profile-picture-upload').files[0];
        if (profilePictureUpload) {
            profilePicture = URL.createObjectURL(profilePictureUpload);
        }
    }

    // Save the profile picture to localStorage
    if (profilePicture) {
        localStorage.setItem(`profilePicture_${newProfileName}`, profilePicture);
    }

    alert(`Profile updated successfully.`);
    redirectToHome();
}

function loadProfileData() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById('profile-name').value = currentUser;

    // Pre-fill the profile picture if available, otherwise use the default image
    const profilePicture = localStorage.getItem(`profilePicture_${currentUser}`);
    document.getElementById('profile-picture-url').value = profilePicture;
    // If you have an image element to display the picture, set the src attribute
    document.getElementById('profile-picture').src = profilePicture;
}

function resetUserData() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    // Remove user-specific data
    localStorage.removeItem(`income_${currentUser}`);
    localStorage.removeItem(`expenses_${currentUser}`);
    localStorage.removeItem(`budgets_${currentUser}`);

    // Remove pieChartData
    localStorage.removeItem('pieChartData');

    alert(`Data for ${currentUser} has been reset.`);
    window.location.reload();
}

function deleteProfile() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    // Remove user-specific data
    localStorage.removeItem(`income_${currentUser}`);
    localStorage.removeItem(`expenses_${currentUser}`);
    localStorage.removeItem(`budgets_${currentUser}`);

    // Remove pieChartData
    localStorage.removeItem('pieChartData');

    // Retrieve profiles and remove the current user profile
    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    const updatedProfiles = profiles.filter(profile => profile.name !== currentUser);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    // Remove current user data
    localStorage.removeItem("currentUser");

    alert(`Profile ${currentUser} has been deleted.`);
    window.location.href = "index.html";
}

// Call loadHomePage function when the home page is loaded
if (window.location.pathname.endsWith("home.html")) {
    window.onload = loadHomePage;
}