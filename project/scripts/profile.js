// profile.js
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('fitDashUser')) || {};
    
    // Initialize form with current profile data
    if (userData.profile) {
        document.getElementById('user-name').value = userData.profile.name || '';
        document.getElementById('user-email').value = userData.profile.email || '';
        if (userData.profile.avatar) {
            document.getElementById('user-avatar').src = userData.profile.avatar;
        }
    }
    
    // Handle avatar upload
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('user-avatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Save profile
    document.getElementById('save-profile').addEventListener('click', function() {
        const profileData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            avatar: document.getElementById('user-avatar').src
        };
        
        userData.profile = profileData;
        localStorage.setItem('fitDashUser', JSON.stringify(userData));
        
        alert('Profile saved successfully!');
    });
});