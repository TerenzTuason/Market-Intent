// LinkedIn Profile Data Extractor
function extractLinkedInProfile() {
    try {
        // Get name - trying multiple possible selectors
        const nameElement = document.querySelector('h1.text-heading-xlarge') ||
            document.querySelector('h1.v-align-middle') ||
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

        // Extract company names from experience section
        const experience = [];
        
        // First find the main container
        const experienceList = document.querySelector('.HpLmtkhSVZRytyLCrQiHOKyXWxidKMwFTKahLo');
        
        if (experienceList) {
            
            // Try finding li elements directly
            const liElements = experienceList.querySelectorAll('.OuTQTgdUhuuxomrBmrZePdFvMUvzTIPNQQXU');

            const uniqueCompanies = new Set();

            // Process all li elements
            liElements.forEach(li => {
                // Case 1: Single role format (company name is in a span after the role)
                const companySpan = li.querySelector('span.t-14.t-normal');
                if (companySpan) {
                    const text = companySpan.innerText.trim().split('·')[0].trim();
                    if (text && !text.includes('yrs') && !text.includes('mos')) {
                        uniqueCompanies.add(text.split('\n')[0].trim());
                    }
                }

                // Case 2: Multi-role format (following the exact path)
                const multiRoleCompany = li.querySelector('a[data-field="experience_company_logo"] div.display-flex.flex-wrap.align-items-center span.visually-hidden');
                if (multiRoleCompany) {
                    const text = multiRoleCompany.innerText.trim();
                    if (text) {
                        uniqueCompanies.add(text.split('\n')[0].trim());
                    }
                }
            });

            experience.push(...uniqueCompanies);
        } 

        // Extract company names from experience section
        const education = [];
        
        // First find the main container
        const educationList = document.querySelector('.HpLmtkhSVZRytyLCrQiHOKyXWxidKMwFTKahLo');

        if (experienceList) {
            
            // Try finding li elements directly
            const liElements = experienceList.querySelectorAll('.OuTQTgdUhuuxomrBmrZePdFvMUvzTIPNQQXU');

            const uniqueCompanies = new Set();

            // Process all li elements
            liElements.forEach(li => {
                // Case 1: Single role format (company name is in a span after the role)
                const companySpan = li.querySelector('span.t-14.t-normal');
                if (companySpan) {
                    const text = companySpan.innerText.trim().split('·')[0].trim();
                    if (text && !text.includes('yrs') && !text.includes('mos')) {
                        uniqueCompanies.add(text.split('\n')[0].trim());
                    }
                }``
            });

            experience.push(...uniqueCompanies);
        } 


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
            is_executive,
            experience
        };

        return profileData;

    } catch (error) {
        console.error('Error extracting profile data:', error);
        return null;
    }
}

// Run the extraction
extractLinkedInProfile();