function createProfile() {
    const profileName = prompt("Enter profile name:");
    let profileImage = prompt("Enter profile image URL (optional):");

    // If no image URL is provided, use the default image
    if (!profileImage) {
        profileImage = 'image/Pro.jpg'; // Path to your default image
    }

    if (profileName) {
        const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
        profiles.push({ name: profileName, image: profileImage });
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Profile created successfully!");

        // Save the profile image URL with the profile name as the key
        localStorage.setItem(`profilePicture_${profileName}`, profileImage);

        localStorage.setItem("currentUser", profileName);
        window.location.href = "home.html";
    } else {
        alert("Profile creation cancelled.");
    }
}

function loadProfiles() {
    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    const profilesDiv = document.getElementById("profiles");
    profilesDiv.innerHTML = profiles.length > 0 ? "" : "No profiles found. Please create a profile.";
    profiles.forEach(profile => {
        const profileCard = document.createElement("div");
        profileCard.className = "profile-card";
        
        // Check if there's an updated profile picture URL in localStorage
        const updatedProfilePicture = localStorage.getItem(`profilePicture_${profile.name}`);
        const profileImageSrc = updatedProfilePicture || profile.image;

        const profileImage = document.createElement("img");
        profileImage.src = profileImageSrc;
        profileImage.alt = `${profile.name}'s Profile Image`;
        profileImage.className = "profile-image";
        
        const profileName = document.createElement("p");
        profileName.innerText = profile.name;
        profileName.className = "profile-name";
        
        profileCard.appendChild(profileImage);
        profileCard.appendChild(profileName);
        profileCard.onclick = () => selectProfile(profile.name);
        
        profilesDiv.appendChild(profileCard);
    });
}

function selectProfile(profileName) {
	
    alert(`Profile ${profileName} selected.`);
    localStorage.setItem("currentUser", profileName);
    window.location.href = "home.html";
}

document.getElementById('admin-link').addEventListener('click', function() {
	const enteredPassword = prompt("Please enter the password to access the admin page:");

	if (enteredPassword !== "234") {
		alert("Incorrect password. Access denied.");
	} else {
		alert("Correct password. Redirecting to admin page.");
		window.location.href = "admin.html";
	}
})

function logout() {
	alert("You've been logout!");
    window.location.href = "index.html";
}

function deleteAllProfiles() {
    const enteredPassword = prompt("Please enter the password to delete all profiles:");

    if (enteredPassword !== "234") { // Replace 'your_password_here' with the actual password
        alert("Incorrect password. Profiles deletion aborted.");
        return;
    }
	
    if (confirm("Are you sure you want to delete all profiles? This will remove all data.")) {
        localStorage.removeItem("profiles");
        localStorage.removeItem("currentUser");

        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("transactions_") || key.startsWith("budgets_") || key.startsWith("allocations_") || key.startsWith("profilePicture_")) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));

        alert("All profiles and associated data have been deleted.");
        window.location.reload();
    }
}

window.onload = loadProfiles;