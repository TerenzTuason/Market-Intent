function scrapeEducationAndExperience() {
    let metadata = {
        education: [],
        experience: []
    };

    // Find the Experience and Education sections
    const sections = document.querySelectorAll('section.artdeco-card');
    let experienceSection = null;
    let educationSection = null;

    sections.forEach(section => {
        const header = section.querySelector('h2.pvs-header__title span[aria-hidden="true"]');
        if (header) {
            const headerText = header.textContent.trim();
            if (headerText === "Experience") {
                experienceSection = section;
            } else if (headerText === "Education") {
                educationSection = section;
            }
        }
    });

    if (experienceSection) {
        // Find the list of experiences within the identified section
        const experienceList = experienceSection.querySelector('.LnqDahNnQYwtXUKtfUWfPKpxxcrHHeZYgI');
        if (experienceList) {
            const experienceItems = experienceList.querySelectorAll('.FYMtNNzLPPSoOHrxKuxeKtmOHmAzhsPKSU[data-view-name="profile-component-entity"]');
            const uniqueCompanies = new Set();

            experienceItems.forEach(item => {
                // Specifically target the company name element for multiple roles
                const multiRoleCompanyElement = item.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold > span[aria-hidden="true"]');
                if (multiRoleCompanyElement) {
                    const companyName = multiRoleCompanyElement.textContent.trim();
                    if (companyName) {
                        uniqueCompanies.add(companyName);
                    }
                } else {
                    // Fallback to traditional method for single roles
                    const companyElement = item.querySelector('span.t-14.t-normal > span[aria-hidden="true"]');
                    if (companyElement) {
                        const companyName = companyElement.textContent.trim().split('·')[0].trim();
                        if (companyName) {
                            uniqueCompanies.add(companyName);
                        }
                    }
                }
            });

            metadata.experience.push(...uniqueCompanies);
        }
    }

    if (educationSection) {
        // Find the list of education entries within the identified section
        const educationList = educationSection.querySelector('.LnqDahNnQYwtXUKtfUWfPKpxxcrHHeZYgI');
        if (educationList) {
            const educationItems = educationList.querySelectorAll('.FYMtNNzLPPSoOHrxKuxeKtmOHmAzhsPKSU[data-view-name="profile-component-entity"]');
            educationItems.forEach(item => {
                // Find the school name element
                const schoolElement = item.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold > span[aria-hidden="true"]');
                if (schoolElement) {
                    const schoolName = schoolElement.textContent.trim();
                    if (schoolName && !metadata.education.includes(schoolName)) {
                        metadata.education.push(schoolName);
                    }
                }
            });
        }
    }

    return metadata;
}

// Run the scraper
const result = scrapeEducationAndExperience();
console.log("Final result:", result);