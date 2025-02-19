// Function to check for duplicate names in the employee data
function checkDuplicateNames(filePath) {
    const fs = require('fs');

    try {
        // Read and parse the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Create a map to store name counts
        const nameCount = new Map();
        const duplicates = [];

        // Count occurrences of each name
        data.forEach(employee => {
            const name = employee.name;
            nameCount.set(name, (nameCount.get(name) || 0) + 1);
        });

        // Find names that appear more than once
        nameCount.forEach((count, name) => {
            if (count > 1) {
                duplicates.push({
                    name: name,
                    occurrences: count
                });
            }
        });

        // Output results
        if (duplicates.length === 0) {
            console.log('No duplicate names found.');
        } else {
            console.log('Found the following duplicate names:');
            duplicates.forEach(dup => {
                console.log(`- "${dup.name}" appears ${dup.occurrences} times`);
            });
        }

        return duplicates;

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: File not found');
        } else {
            console.error('Error reading or parsing the file:', error.message);
        }
        return [];
    }
}

// Function to count occurrences of each field value
function countFieldOccurrences(filePath) {
    const fs = require('fs');

    try {
        // Read and parse the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Object to store counts for each field
        const fieldCounts = {
            titles: new Map(),
            companies: new Map(),
            executives: 0,
            nonExecutives: 0,
            total: data.length
        };

        // Count occurrences
        data.forEach(employee => {
            // Count titles
            if (employee.title) {
                fieldCounts.titles.set(
                    employee.title, 
                    (fieldCounts.titles.get(employee.title) || 0) + 1
                );
            }

            // Count companies (extracted from bio)
            if (employee.bio) {
                const companies = employee.bio.split(/at\s+|\s*,\s*|\s*\|\s*/)
                    .filter(part => part.includes('Automation Anywhere'));
                companies.forEach(company => {
                    fieldCounts.companies.set(
                        company.trim(),
                        (fieldCounts.companies.get(company.trim()) || 0) + 1
                    );
                });
            }

            // Count executives vs non-executives
            if (employee.is_executive) {
                fieldCounts.executives++;
            } else {
                fieldCounts.nonExecutives++;
            }
        });

        // Output results
        console.log('\nField Statistics:');
        console.log(`Total Employees: ${fieldCounts.total}`);
        console.log(`Executives: ${fieldCounts.executives}`);
        console.log(`Non-Executives: ${fieldCounts.nonExecutives}`);
        
        console.log('\nTitle Distribution:');
        fieldCounts.titles.forEach((count, title) => {
            console.log(`- "${title}": ${count} employee(s)`);
        });

        console.log('\nCompany Mentions:');
        fieldCounts.companies.forEach((count, company) => {
            console.log(`- "${company}": ${count} mention(s)`);
        });

        return fieldCounts;

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: File not found');
        } else {
            console.error('Error reading or parsing the file:', error.message);
        }
        return null;
    }
}

// Function to count total number of employees
function countEmployees(filePath) {
    const fs = require('fs');

    try {
        // Read and parse the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Get total count
        const totalEmployees = data.length;
        
        // Output result
        console.log(`Total number of employees: ${totalEmployees}`);
        
        return totalEmployees;

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: File not found');
        } else {
            console.error('Error reading or parsing the file:', error.message);
        }
        return 0;
    }
}

// Usage example
const filePath = './aa-employees.json';

// console.log('Checking for duplicates...');
// checkDuplicateNames(filePath);

// console.log('\nAnalyzing field statistics...');
// countFieldOccurrences(filePath);

console.log('\nCounting total employees...');
countEmployees(filePath);
