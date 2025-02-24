// Modify this for experience extraction
const ulElement = document.querySelector('.HpLmtkhSVZRytyLCrQiHOKyXWxidKMwFTKahLo');

// LinkedIn Profile Data Extractor
function extractLinkedInProfile() {
    try {
        const profileData = {
            name: extractName(),
            bio: extractBio(),
            title: extractTitle(),
            email: generateEmail(),
            url: extractProfileUrl(),
            image: extractProfileImage(),
            is_executive: true, // This needs proper implementation
            experience: extractExperience(),
            education: extractEducation() // Added education extraction
        };

        return profileData;
    } catch (error) {
        console.error('Error extracting profile data:', error);
        return null;
    }
}

// Extract name from profile using multiple possible selectors
function extractName() {
    const nameElement = document.querySelector('h1.text-heading-xlarge') ||
        document.querySelector('h1.v-align-middle') ||
        document.querySelector('h1.RMkAkwrhZxYUifHVlUmkZkMZSLxmu');
    return nameElement ? nameElement.innerText.trim() : '';
}

// Extract bio/headline from profile using multiple possible selectors
function extractBio() {
    const bioElement = document.querySelector('.pv-text-details__left-panel .text-body-medium') ||
        document.querySelector('.ph5.pb5 .text-body-medium') ||
        document.querySelector('div.text-body-medium');
    return bioElement ? bioElement.innerText.trim() : '';
}

// Extract title from bio or dedicated title element
function extractTitle() {
    // TODO: Implement title extraction logic
    return '';
}

// Extract profile URL
function extractProfileUrl() {
    return window.location.href.split('?')[0];
}

// Extract profile image using multiple possible selectors
function extractProfileImage() {
    const imageElement = document.querySelector('.pv-top-card-profile-picture__image') ||
        document.querySelector('.profile-photo-edit__preview') ||
        document.querySelector('.pv-top-card__photo img');
    return imageElement ? imageElement.src : '';
}

// Extract experience information
function extractExperience() {
    const experience = [];
    const experienceList = ulElement;

    if (experienceList) {
        const uniqueCompanies = new Set();
        const liElements = experienceList.querySelectorAll('.artdeco-list__item') || 
            experienceList.querySelectorAll('.PmHlzGkueYTEwuKHWkhZavwsBhlOXakIgZI') || 
            experienceList.querySelectorAll('.mUazJzksIDPcxRCYmAPvRGYmBpjIxEQazTelQ') || 
            experienceList.querySelectorAll('.FYMtNNzLPPSoOHrxKuxeKtmOHmAzhsPKSU');

        liElements.forEach(li => {
            // Case 1: Single role format
            const companySpan = li.querySelector('span.t-14.t-normal');
            if (companySpan) {
                const text = companySpan.innerText.trim().split('·')[0].trim();
                if (text && !text.includes('yrs') && !text.includes('mos')) {
                    uniqueCompanies.add(text.split('\n')[0].trim());
                }
            }

            // Case 2: Multi-role format
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
    return experience;
}

// Extract education information
function extractEducation() {
    const education = [];
    const sections = document.querySelectorAll('section.artdeco-card');
    let educationSection = null;

    // Find the Education section
    sections.forEach(section => {
        const header = section.querySelector('h2.pvs-header__title span[aria-hidden="true"]');
        if (header && header.textContent.trim() === "Education") {
            educationSection = section;
        }
    });

    if (educationSection) {
        const educationList = educationSection.querySelector('.LnqDahNnQYwtXUKtfUWfPKpxxcrHHeZYgI');
        if (educationList) {
            const educationItems = educationList.querySelectorAll('.FYMtNNzLPPSoOHrxKuxeKtmOHmAzhsPKSU[data-view-name="profile-component-entity"]');
            educationItems.forEach(item => {
                const schoolElement = item.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold > span[aria-hidden="true"]');
                if (schoolElement) {
                    const schoolName = schoolElement.textContent.trim();
                    if (schoolName && !education.includes(schoolName)) {
                        education.push(schoolName);
                    }
                }
            });
        }
    }
    return education;
}

// Generate email in firstname.lastname@automationanywhere.com format
function generateEmail() {
    const name = extractName();
    if (!name) return '';
    
    const nameParts = name.toLowerCase().split(' ');
    if (nameParts.length >= 2) {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        return `${firstName}.${lastName}@automationanywhere.com`;
    }
    return '';
}

// Run the extraction
extractLinkedInProfile();