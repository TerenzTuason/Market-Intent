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

    // ul element
    const experienceList = document.querySelector('.BLQQPYeZfPEOBptApvnHfGNvZksbQdSVTI');

    if (experienceList) {
            
        // li elements
        const liElements = experienceList.querySelectorAll('.artdeco-list__item') || experienceList.querySelectorAll('.PmHlzGkueYTEwuKHWkhZavwsBhlOXakIgZI') || experienceList.querySelectorAll('.mUazJzksIDPcxRCYmAPvRGYmBpjIxEQazTelQ') || experienceList.querySelectorAll('.FYMtNNzLPPSoOHrxKuxeKtmOHmAzhsPKSU');

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

        metadata.experience.push(...uniqueCompanies);
    } 

    return metadata;
}

// Run the scraper
const result = scrapeEducationAndExperience();
console.log("Final result:", result);