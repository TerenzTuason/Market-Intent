// LinkedIn Profile Data Extractor
function extractLinkedInProfile() {
    try {
        // Get name - trying multiple possible selectors
        const nameElement = document.querySelector('h1.text-heading-xlarge') ||
            document.querySelector('.pv-text-details__left-panel h1') ||
            document.querySelector('h1.RMkAkwrhZxYUifHVlUmkZkMZSLxmu');
        const name = nameElement ? nameElement.innerText.trim() : '';

        // Get bio/headline - trying multiple possible selectors
        const bioElement = document.querySelector('.pv-text-details__left-panel .text-body-medium') ||
            document.querySelector('.ph5.pb5 .text-body-medium') ||
            document.querySelector('div.text-body-medium');
        const bio = bioElement ? bioElement.innerText.trim() : '';

        // Extract title from bio or dedicated title element
        const title = '';

        // Get profile URL
        const url = window.location.href.split('?')[0];

        // Get profile image - trying multiple possible selectors
        const imageElement = document.querySelector('.pv-top-card-profile-picture__image') ||
            document.querySelector('.profile-photo-edit__preview') ||
            document.querySelector('.pv-top-card__photo img');
        const image = imageElement ? imageElement.src : '';

        // Determine if person is executive
        const is_executive = true;

        // Generate email in firstname.lastname@automationanywhere.com format
        let email = '';
        if (name) {
            const nameParts = name.toLowerCase().split(' ');
            if (nameParts.length >= 2) {
                const firstName = nameParts[0];
                const lastName = nameParts[nameParts.length - 1];
                email = `${firstName}.${lastName}@automationanywhere.com`;
            }
        }

        const profileData = {
            name,
            bio,
            title,
            email,
            url,
            image,
            is_executive
        };

        return profileData;

    } catch (error) {
        console.error('Error extracting profile data:', error);
        return null;
    }
}

// Run the extraction
extractLinkedInProfile();
