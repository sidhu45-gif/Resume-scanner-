// Global variables
let uploadedResume = null;
let analysisResults = null;
let currentZoom = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeUpload();
    populateTemplates();
    setupNavigation();
});

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize file upload
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('resumeUpload');

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

// Handle file upload
function handleFileUpload(file) {
    // Validate file
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
    }

    if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
    }

    uploadedResume = file;
    
    // Show progress
    document.querySelector('.upload-content').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'block';

    // Simulate upload and analysis
    simulateAnalysis();
}

// Simulate analysis process
function simulateAnalysis() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const steps = [
        { progress: 20, text: 'Uploading resume...' },
        { progress: 40, text: 'Parsing document...' },
        { progress: 60, text: 'Analyzing ATS compatibility...' },
        { progress: 80, text: 'Checking keywords...' },
        { progress: 100, text: 'Generating report...' }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            progressFill.style.width = steps[currentStep].progress + '%';
            progressText.textContent = steps[currentStep].text;
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                showResults();
            }, 500);
        }
    }, 800);
}

// Show analysis results
function showResults() {
    // Hide upload section
    document.getElementById('uploadProgress').style.display = 'none';
    
    // Show job description section
    document.getElementById('jobDescSection').style.display = 'block';
    
    // Generate mock results
    analysisResults = generateMockResults();
    
    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    
    // Populate results
    displayScore();
    displayIssues();
    displayKeywords();
    displaySuggestions();
    displayPreview();
}

// Generate mock analysis results
function generateMockResults() {
    return {
        score: Math.floor(Math.random() * 20) + 75, // 75-95
        format: Math.floor(Math.random() * 15) + 80,
        keywords: Math.floor(Math.random() * 20) + 70,
        experience: Math.floor(Math.random() * 15) + 82,
        issues: [
            {
                severity: 'critical',
                icon: '⚠️',
                title: 'Missing Contact Information',
                description: 'Your resume is missing a professional email address or phone number. ATS systems require this information to process your application.',
                suggestion: 'Add a dedicated contact section at the top with: Full Name, Phone Number, Email Address, LinkedIn URL, and Location (City, State).'
            },
            {
                severity: 'warning',
                icon: '📅',
                title: 'Inconsistent Date Formatting',
                description: 'Date formats vary throughout your resume (e.g., "Jan 2020" vs "January 2020"). This can confuse ATS parsers.',
                suggestion: 'Use a consistent format throughout, such as "MM/YYYY" or "Month YYYY". Example: "January 2020 - Present"'
            },
            {
                severity: 'warning',
                icon: '🔤',
                title: 'Complex Formatting Detected',
                description: 'Tables, text boxes, and columns can cause ATS systems to misread your information.',
                suggestion: 'Use simple left-aligned formatting with clear section headers. Avoid using tables for work experience or education.'
            },
            {
                severity: 'info',
                icon: '📊',
                title: 'Quantify Your Achievements',
                description: 'Your resume would be stronger with more quantifiable metrics and numbers.',
                suggestion: 'Add specific numbers: "Increased sales by 35%" instead of "Improved sales". Include percentages, dollar amounts, and measurable results.'
            },
            {
                severity: 'info',
                icon: '🎯',
                title: 'Action Verbs Usage',
                description: 'Using strong action verbs at the beginning of bullet points makes your experience more impactful.',
                suggestion: 'Start bullets with verbs like: Led, Managed, Developed, Implemented, Optimized, Achieved, Delivered, Spearheaded'
            },
            {
                severity: 'warning',
                icon: '📄',
                title: 'Resume Length',
                description: 'Your resume is 3 pages long. Most ATS systems and recruiters prefer 1-2 pages.',
                suggestion: 'Focus on the most recent 10-15 years of experience. Remove older or less relevant positions. Aim for 1 page if you have <10 years experience, 2 pages if more.'
            }
        ],
        foundKeywords: [
            'Project Management', 'Agile', 'Scrum', 'Team Leadership', 
            'JavaScript', 'Python', 'SQL', 'Data Analysis',
            'Customer Service', 'Problem Solving', 'Communication'
        ],
        missingKeywords: [
            'Stakeholder Management', 'Budget Planning', 'Risk Management',
            'Process Improvement', 'Cross-functional Collaboration', 'KPI Tracking'
        ],
        recommendedKeywords: [
            'Strategic Planning', 'Change Management', 'Resource Allocation',
            'Performance Metrics', 'Quality Assurance', 'Vendor Management',
            'Business Analysis', 'Technical Documentation'
        ],
        suggestions: [
            {
                title: 'Add a Professional Summary',
                content: 'A compelling professional summary at the top of your resume (2-3 sentences) helps ATS systems understand your expertise and gives recruiters a quick overview of your value proposition.',
                example: 'Results-driven Project Manager with 8+ years of experience leading cross-functional teams in Agile environments. Proven track record of delivering complex software projects on time and 20% under budget, with expertise in stakeholder management and process optimization.'
            },
            {
                title: 'Optimize Your Skills Section',
                content: 'Create a dedicated skills section that matches the job description keywords. Separate technical skills from soft skills for better ATS parsing.',
                example: 'Technical Skills: Python, SQL, Tableau, Jira, Git, AWS\nSoft Skills: Leadership, Communication, Problem-Solving, Stakeholder Management'
            },
            {
                title: 'Use Standard Section Headers',
                content: 'ATS systems look for standard section names. Using creative headers like "My Journey" instead of "Experience" can cause parsing errors.',
                example: 'Use: Professional Experience, Work Experience, Education, Skills, Certifications\nAvoid: Career History, My Background, What I Know, Credentials'
            },
            {
                title: 'Include Relevant Certifications',
                content: 'Certifications are highly valued by ATS systems and recruiters. Create a separate section listing relevant professional certifications with dates.',
                example: 'Certifications:\n• Project Management Professional (PMP) - PMI, 2021\n• Certified ScrumMaster (CSM) - Scrum Alliance, 2020\n• AWS Certified Solutions Architect - Amazon, 2022'
            },
            {
                title: 'Tailor for Each Application',
                content: 'Customize your resume for each job by incorporating keywords from the job description. ATS systems score resumes higher when they closely match the job requirements.',
                example: 'If the job mentions "agile methodology" multiple times, ensure this phrase appears naturally in your experience bullets and skills section.'
            }
        ]
    };
}

// Display ATS score
function displayScore() {
    const score = analysisResults.score;
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreDescription = document.getElementById('scoreDescription');
    const scoreProgress = document.getElementById('scoreProgress');
    
    // Animate score
    let currentScore = 0;
    const increment = score / 50;
    const scoreInterval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(scoreInterval);
        }
        scoreNumber.textContent = Math.round(currentScore);
    }, 30);
    
    // Set circle progress
    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (score / 100) * circumference;
    scoreProgress.style.strokeDashoffset = offset;
    
    // Set description
    if (score >= 90) {
        scoreDescription.textContent = 'Excellent! Your resume is highly optimized for ATS systems.';
    } else if (score >= 75) {
        scoreDescription.textContent = 'Good score! A few improvements will make your resume even better.';
    } else if (score >= 60) {
        scoreDescription.textContent = 'Fair score. Several improvements needed to pass ATS screening.';
    } else {
        scoreDescription.textContent = 'Needs improvement. Follow our suggestions to optimize your resume.';
    }
    
    // Animate breakdown scores
    setTimeout(() => {
        animateBreakdown('formatScore', 'formatValue', analysisResults.format);
        animateBreakdown('keywordsScore', 'keywordsValue', analysisResults.keywords);
        animateBreakdown('experienceScore', 'experienceValue', analysisResults.experience);
    }, 500);
}

// Animate breakdown bars
function animateBreakdown(barId, valueId, targetValue) {
    const bar = document.getElementById(barId);
    const value = document.getElementById(valueId);
    
    let current = 0;
    const increment = targetValue / 50;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(interval);
        }
        bar.style.width = current + '%';
        value.textContent = Math.round(current) + '%';
    }, 20);
}

// Display issues
function displayIssues() {
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
    
    analysisResults.issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.className = 'issue-card';
        issueCard.innerHTML = `
            <div class="issue-header">
                <div class="issue-icon ${issue.severity}">
                    ${issue.icon}
                </div>
                <div class="issue-content">
                    <h4>${issue.title}</h4>
                    <span class="issue-severity ${issue.severity}">${issue.severity}</span>
                </div>
            </div>
            <p class="issue-description">${issue.description}</p>
            <div class="issue-suggestion">
                <strong>💡 Suggestion:</strong> ${issue.suggestion}
            </div>
        `;
        issuesList.appendChild(issueCard);
    });
}

// Display keywords
function displayKeywords() {
    const foundKeywords = document.getElementById('foundKeywords');
    const missingKeywords = document.getElementById('missingKeywords');
    const recommendedKeywords = document.getElementById('recommendedKeywords');
    
    foundKeywords.innerHTML = analysisResults.foundKeywords.map(keyword => 
        `<span class="keyword-tag">${keyword}</span>`
    ).join('');
    
    missingKeywords.innerHTML = analysisResults.missingKeywords.map(keyword => 
        `<span class="keyword-tag">${keyword}</span>`
    ).join('');
    
    recommendedKeywords.innerHTML = analysisResults.recommendedKeywords.map(keyword => 
        `<span class="keyword-tag">${keyword}</span>`
    ).join('');
}

// Display suggestions
function displaySuggestions() {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    analysisResults.suggestions.forEach((suggestion, index) => {
        const suggestionCard = document.createElement('div');
        suggestionCard.className = 'suggestion-card';
        suggestionCard.innerHTML = `
            <div class="suggestion-header">
                <div class="suggestion-number">${index + 1}</div>
                <h3 class="suggestion-title">${suggestion.title}</h3>
            </div>
            <p class="suggestion-content">${suggestion.content}</p>
            <div class="suggestion-example">
                <strong>Example:</strong><br>
                ${suggestion.example.replace(/\n/g, '<br>')}
            </div>
        `;
        suggestionsList.appendChild(suggestionCard);
    });
}

// Display resume preview
function displayPreview() {
    const resumePreview = document.getElementById('resumePreview');
    resumePreview.innerHTML = `
        <div style="max-width: 700px; margin: 0 auto; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
            <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #333;">
                <h1 style="margin: 0 0 5px 0; font-size: 24px;">JOHN DOE</h1>
                <p style="margin: 0; color: #666;">
                    john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | New York, NY
                </p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 16px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #333;">PROFESSIONAL SUMMARY</h2>
                <p style="margin: 0;">Results-driven professional with 8+ years of experience in project management and team leadership. Proven track record of delivering complex projects on time and under budget.</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 16px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #333;">PROFESSIONAL EXPERIENCE</h2>
                
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong>Senior Project Manager</strong>
                        <span>January 2020 - Present</span>
                    </div>
                    <div style="font-style: italic; margin-bottom: 8px; color: #666;">Tech Solutions Inc., New York, NY</div>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Led cross-functional teams of 15+ members in Agile development environment</li>
                        <li>Managed project budgets exceeding $2M with 20% cost savings</li>
                        <li>Implemented new project tracking system, improving efficiency by 35%</li>
                        <li>Coordinated with stakeholders across 5 departments to align project goals</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong>Project Coordinator</strong>
                        <span>March 2017 - December 2019</span>
                    </div>
                    <div style="font-style: italic; margin-bottom: 8px; color: #666;">Digital Innovations LLC, New York, NY</div>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Supported 10+ concurrent projects with combined budget of $5M</li>
                        <li>Developed project documentation and status reports for executive team</li>
                        <li>Facilitated daily stand-ups and sprint planning sessions</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 16px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #333;">EDUCATION</h2>
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <strong>Bachelor of Science in Business Administration</strong><br>
                        <span style="color: #666;">University of California, Berkeley</span>
                    </div>
                    <span>2013 - 2017</span>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 16px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #333;">SKILLS</h2>
                <p style="margin: 0;">
                    <strong>Technical:</strong> Project Management, Agile/Scrum, Jira, MS Project, Asana, Tableau, SQL, Python<br>
                    <strong>Soft Skills:</strong> Leadership, Communication, Problem-Solving, Stakeholder Management, Team Building
                </p>
            </div>
            
            <div>
                <h2 style="font-size: 16px; margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #333;">CERTIFICATIONS</h2>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Project Management Professional (PMP) - PMI, 2021</li>
                    <li>Certified ScrumMaster (CSM) - Scrum Alliance, 2020</li>
                </ul>
            </div>
        </div>
    `;
}

// Analyze with job description
function analyzeWithJob() {
    const jobDesc = document.getElementById('jobDescription').value;
    
    if (!jobDesc.trim()) {
        alert('Please paste a job description first');
        return;
    }
    
    // Simulate additional analysis
    alert('Analyzing resume against job description...\n\nThis would compare your resume with the specific job requirements and provide tailored recommendations.');
    
    // In a real implementation, this would:
    // 1. Extract keywords from job description
    // 2. Compare with resume content
    // 3. Calculate match percentage
    // 4. Provide specific suggestions
}

// Switch tabs
function switchTab(tabName) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab pane
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked tab
    event.target.closest('.tab').classList.add('active');
}

// Zoom functions
function zoomIn() {
    if (currentZoom < 1.5) {
        currentZoom += 0.1;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > 0.5) {
        currentZoom -= 0.1;
        updateZoom();
    }
}

function updateZoom() {
    const preview = document.getElementById('resumePreview');
    preview.style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

// Download report
function downloadReport() {
    alert('Downloading comprehensive ATS analysis report...\n\nYour detailed report includes:\n• Complete ATS score breakdown\n• All identified issues and fixes\n• Keyword analysis\n• AI-powered suggestions\n• Before/after comparison');
    
    // In a real implementation, this would generate a PDF report
}

// Reset scanner
function resetScanner() {
    uploadedResume = null;
    analysisResults = null;
    
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('jobDescSection').style.display = 'none';
    document.querySelector('.upload-content').style.display = 'block';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('resumeUpload').value = '';
    document.getElementById('jobDescription').value = '';
    
    document.getElementById('uploadArea').scrollIntoView({ behavior: 'smooth' });
}

// Populate templates
function populateTemplates() {
    const templates = [
        { name: 'Modern Professional', category: 'modern', type: 'ATS-Friendly', color: '#06b6d4', design: 'gradient' },
        { name: 'Executive Classic', category: 'professional', type: 'Traditional', color: '#1e293b', design: 'traditional' },
        { name: 'Tech Minimalist', category: 'minimal', type: 'Clean Design', color: '#64748b', design: 'minimal' },
        { name: 'Creative Portfolio', category: 'creative', type: 'Visual', color: '#8b5cf6', design: 'creative' },
        { name: 'Corporate Standard', category: 'professional', type: 'ATS-Friendly', color: '#0f172a', design: 'corporate' },
        { name: 'Startup Modern', category: 'modern', type: 'Contemporary', color: '#10b981', design: 'modern' },
        { name: 'Academic CV', category: 'professional', type: 'Traditional', color: '#475569', design: 'academic' },
        { name: 'Designer Showcase', category: 'creative', type: 'Visual', color: '#f59e0b', design: 'designer' },
        { name: 'Simple & Clean', category: 'minimal', type: 'ATS-Friendly', color: '#334155', design: 'simple' }
    ];
    
    const templatesGrid = document.getElementById('templatesGrid');
    templatesGrid.innerHTML = '';
    
    templates.forEach((template, index) => {
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        templateCard.setAttribute('data-category', template.category);
        
        // Generate template preview based on design type
        const previewHTML = generateTemplatePreview(template);
        
        templateCard.innerHTML = `
            <div class="template-image">
                <div class="template-preview">
                    ${previewHTML}
                </div>
            </div>
            <div class="template-info">
                <h3 class="template-name">${template.name}</h3>
                <span class="template-category">${template.type}</span>
                <div class="template-features">
                    <span>⚡ ATS Compatible</span>
                    <span>📝 Editable</span>
                </div>
                <div class="template-actions">
                    <button class="btn btn-primary" onclick="useTemplate('${template.name}')">Use Template</button>
                    <button class="btn btn-outline" onclick="previewTemplate('${template.name}')">Preview</button>
                </div>
            </div>
        `;
        
        templatesGrid.appendChild(templateCard);
    });
}

// Generate template preview based on design type
function generateTemplatePreview(template) {
    const baseStyle = `
        background: white;
        padding: 25px;
        height: 100%;
        font-family: Arial, sans-serif;
        font-size: 8px;
        line-height: 1.3;
        overflow: hidden;
    `;
    
    switch(template.design) {
        case 'gradient':
            return `
                <div style="${baseStyle}">
                    <div style="text-align: center; padding: 15px; background: linear-gradient(135deg, ${template.color} 0%, #3b82f6 100%); color: white; border-radius: 8px; margin-bottom: 12px;">
                        <div style="font-size: 14px; font-weight: bold; margin-bottom: 3px;">JOHN DOE</div>
                        <div style="font-size: 7px;">Project Manager | john.doe@email.com | (555) 123-4567</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; border-bottom: 2px solid ${template.color}; padding-bottom: 3px; margin-bottom: 6px;">PROFESSIONAL SUMMARY</div>
                        <div style="height: 4px; background: #e5e7eb; margin-bottom: 3px; border-radius: 2px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 95%; margin-bottom: 3px; border-radius: 2px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 85%; border-radius: 2px;"></div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; border-bottom: 2px solid ${template.color}; padding-bottom: 3px; margin-bottom: 6px;">EXPERIENCE</div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <div style="font-weight: bold; font-size: 8px;">Senior Project Manager</div>
                            <div style="font-size: 7px;">2020-Present</div>
                        </div>
                        <div style="font-size: 7px; color: #64748b; margin-bottom: 4px;">Tech Solutions Inc.</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 90%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 85%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 80%; border-radius: 1px;"></div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; border-bottom: 2px solid ${template.color}; padding-bottom: 3px; margin-bottom: 6px;">SKILLS</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                            <span style="background: ${template.color}22; color: ${template.color}; padding: 3px 6px; border-radius: 3px; font-size: 6px; font-weight: bold;">Leadership</span>
                            <span style="background: ${template.color}22; color: ${template.color}; padding: 3px 6px; border-radius: 3px; font-size: 6px; font-weight: bold;">Agile</span>
                            <span style="background: ${template.color}22; color: ${template.color}; padding: 3px 6px; border-radius: 3px; font-size: 6px; font-weight: bold;">Python</span>
                            <span style="background: ${template.color}22; color: ${template.color}; padding: 3px 6px; border-radius: 3px; font-size: 6px; font-weight: bold;">SQL</span>
                        </div>
                    </div>
                </div>
            `;
            
        case 'traditional':
        case 'corporate':
            return `
                <div style="${baseStyle}">
                    <div style="text-align: center; border-bottom: 3px solid ${template.color}; padding-bottom: 12px; margin-bottom: 12px;">
                        <div style="font-size: 16px; font-weight: bold; color: ${template.color}; margin-bottom: 4px;">JOHN DOE</div>
                        <div style="font-size: 7px; color: #64748b;">john.doe@email.com | (555) 123-4567 | New York, NY</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 1px;">Professional Summary</div>
                        <div style="height: 4px; background: #e5e7eb; margin-bottom: 3px; border-radius: 1px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 95%; margin-bottom: 3px; border-radius: 1px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 90%; border-radius: 1px;"></div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 1px;">Experience</div>
                        <div style="font-weight: bold; font-size: 8px; margin-bottom: 2px;">Senior Project Manager</div>
                        <div style="font-size: 7px; color: #64748b; margin-bottom: 4px;">Tech Solutions Inc. | 2020-Present</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 90%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 85%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 6px; width: 88%; border-radius: 1px;"></div>
                        <div style="font-weight: bold; font-size: 8px; margin-bottom: 2px;">Project Coordinator</div>
                        <div style="font-size: 7px; color: #64748b; margin-bottom: 4px;">Digital Innovations | 2017-2019</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 88%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 82%; border-radius: 1px;"></div>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 9px; font-weight: bold; color: ${template.color}; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 1px;">Education</div>
                        <div style="font-weight: bold; font-size: 8px;">Bachelor of Science</div>
                        <div style="font-size: 7px; color: #64748b;">University of California | 2013-2017</div>
                    </div>
                </div>
            `;
            
        case 'minimal':
        case 'simple':
            return `
                <div style="${baseStyle}">
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 18px; font-weight: bold; color: ${template.color}; margin-bottom: 3px;">John Doe</div>
                        <div style="font-size: 7px; color: #64748b;">john.doe@email.com | (555) 123-4567</div>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 6px; padding-bottom: 3px; border-bottom: 1px solid #e5e7eb;">SUMMARY</div>
                        <div style="height: 4px; background: #e5e7eb; margin-bottom: 3px; border-radius: 1px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 92%; margin-bottom: 3px; border-radius: 1px;"></div>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 6px; padding-bottom: 3px; border-bottom: 1px solid #e5e7eb;">EXPERIENCE</div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                            <div style="font-weight: bold; font-size: 8px;">Senior Project Manager</div>
                            <div style="font-size: 7px; color: #64748b;">2020 - Present</div>
                        </div>
                        <div style="font-size: 7px; color: #64748b; margin-bottom: 4px;">Tech Solutions Inc.</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 95%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 90%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 8px; width: 93%; border-radius: 1px;"></div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                            <div style="font-weight: bold; font-size: 8px;">Project Coordinator</div>
                            <div style="font-size: 7px; color: #64748b;">2017 - 2019</div>
                        </div>
                        <div style="font-size: 7px; color: #64748b; margin-bottom: 4px;">Digital Innovations</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 92%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 87%; border-radius: 1px;"></div>
                    </div>
                    <div>
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 6px; padding-bottom: 3px; border-bottom: 1px solid #e5e7eb;">SKILLS</div>
                        <div style="height: 4px; background: #e5e7eb; margin-bottom: 3px; width: 88%; border-radius: 1px;"></div>
                        <div style="height: 4px; background: #e5e7eb; width: 75%; border-radius: 1px;"></div>
                    </div>
                </div>
            `;
            
        case 'creative':
        case 'designer':
            return `
                <div style="${baseStyle} background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                        <div style="width: 40px; height: 40px; background: ${template.color}; border-radius: 50%;"></div>
                        <div>
                            <div style="font-size: 14px; font-weight: bold; color: ${template.color}; margin-bottom: 2px;">JOHN DOE</div>
                            <div style="font-size: 6px; color: #64748b;">Creative Professional</div>
                        </div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 4px;">✨ About Me</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; border-radius: 2px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 90%; margin-bottom: 2px; border-radius: 2px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 85%; border-radius: 2px;"></div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 4px;">💼 Experience</div>
                        <div style="background: ${template.color}15; padding: 6px; border-radius: 4px; margin-bottom: 6px; border-left: 3px solid ${template.color};">
                            <div style="font-weight: bold; font-size: 7px; margin-bottom: 2px;">Senior Designer</div>
                            <div style="font-size: 6px; color: #64748b; margin-bottom: 3px;">Creative Agency • 2020-Present</div>
                            <div style="height: 2px; background: #e5e7eb; margin-bottom: 2px; border-radius: 1px;"></div>
                            <div style="height: 2px; background: #e5e7eb; width: 85%; border-radius: 1px;"></div>
                        </div>
                        <div style="background: ${template.color}15; padding: 6px; border-radius: 4px; border-left: 3px solid ${template.color};">
                            <div style="font-weight: bold; font-size: 7px; margin-bottom: 2px;">Graphic Designer</div>
                            <div style="font-size: 6px; color: #64748b; margin-bottom: 3px;">Design Studio • 2018-2020</div>
                            <div style="height: 2px; background: #e5e7eb; margin-bottom: 2px; border-radius: 1px;"></div>
                            <div style="height: 2px; background: #e5e7eb; width: 80%; border-radius: 1px;"></div>
                        </div>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 4px;">🎨 Skills</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 3px;">
                            <span style="background: ${template.color}; color: white; padding: 3px 5px; border-radius: 10px; font-size: 6px;">Design</span>
                            <span style="background: ${template.color}; color: white; padding: 3px 5px; border-radius: 10px; font-size: 6px;">Branding</span>
                            <span style="background: ${template.color}; color: white; padding: 3px 5px; border-radius: 10px; font-size: 6px;">UI/UX</span>
                            <span style="background: ${template.color}; color: white; padding: 3px 5px; border-radius: 10px; font-size: 6px;">Figma</span>
                        </div>
                    </div>
                </div>
            `;
            
        case 'modern':
            return `
                <div style="${baseStyle}">
                    <div style="display: grid; grid-template-columns: 35% 65%; gap: 0; height: 100%;">
                        <div style="background: ${template.color}; color: white; padding: 15px 12px;">
                            <div style="margin-bottom: 15px;">
                                <div style="width: 45px; height: 45px; background: white; border-radius: 50%; margin: 0 auto 8px;"></div>
                                <div style="font-size: 11px; font-weight: bold; text-align: center; margin-bottom: 3px;">JOHN DOE</div>
                                <div style="font-size: 6px; text-align: center; opacity: 0.9;">Project Manager</div>
                            </div>
                            <div style="margin-bottom: 12px;">
                                <div style="font-size: 7px; font-weight: bold; margin-bottom: 5px; letter-spacing: 1px;">CONTACT</div>
                                <div style="font-size: 6px; margin-bottom: 3px; opacity: 0.9;">📧 john.doe@email.com</div>
                                <div style="font-size: 6px; margin-bottom: 3px; opacity: 0.9;">📱 (555) 123-4567</div>
                                <div style="font-size: 6px; opacity: 0.9;">📍 New York, NY</div>
                            </div>
                            <div style="margin-bottom: 12px;">
                                <div style="font-size: 7px; font-weight: bold; margin-bottom: 5px; letter-spacing: 1px;">SKILLS</div>
                                <div style="margin-bottom: 4px;">
                                    <div style="font-size: 6px; margin-bottom: 2px;">Leadership</div>
                                    <div style="height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
                                        <div style="width: 90%; height: 100%; background: white;"></div>
                                    </div>
                                </div>
                                <div style="margin-bottom: 4px;">
                                    <div style="font-size: 6px; margin-bottom: 2px;">Agile/Scrum</div>
                                    <div style="height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
                                        <div style="width: 85%; height: 100%; background: white;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 6px; margin-bottom: 2px;">Python</div>
                                    <div style="height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
                                        <div style="width: 75%; height: 100%; background: white;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="padding: 15px 12px;">
                            <div style="margin-bottom: 10px;">
                                <div style="font-size: 9px; font-weight: bold; color: ${template.color}; margin-bottom: 5px;">PROFESSIONAL SUMMARY</div>
                                <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; border-radius: 1px;"></div>
                                <div style="height: 3px; background: #e5e7eb; width: 95%; margin-bottom: 2px; border-radius: 1px;"></div>
                                <div style="height: 3px; background: #e5e7eb; width: 88%; border-radius: 1px;"></div>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <div style="font-size: 9px; font-weight: bold; color: ${template.color}; margin-bottom: 5px;">EXPERIENCE</div>
                                <div style="margin-bottom: 6px;">
                                    <div style="font-weight: bold; font-size: 8px; color: ${template.color}; margin-bottom: 2px;">Senior Project Manager</div>
                                    <div style="font-size: 6px; color: #64748b; margin-bottom: 3px;">Tech Solutions Inc. • 2020-Present</div>
                                    <div style="height: 2px; background: #e5e7eb; margin-bottom: 2px; width: 92%; border-radius: 1px;"></div>
                                    <div style="height: 2px; background: #e5e7eb; margin-bottom: 2px; width: 88%; border-radius: 1px;"></div>
                                    <div style="height: 2px; background: #e5e7eb; width: 90%; border-radius: 1px;"></div>
                                </div>
                                <div>
                                    <div style="font-weight: bold; font-size: 8px; color: ${template.color}; margin-bottom: 2px;">Project Coordinator</div>
                                    <div style="font-size: 6px; color: #64748b; margin-bottom: 3px;">Digital Innovations • 2017-2019</div>
                                    <div style="height: 2px; background: #e5e7eb; margin-bottom: 2px; width: 88%; border-radius: 1px;"></div>
                                    <div style="height: 2px; background: #e5e7eb; width: 85%; border-radius: 1px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="font-size: 9px; font-weight: bold; color: ${template.color}; margin-bottom: 5px;">EDUCATION</div>
                                <div style="font-weight: bold; font-size: 7px;">Bachelor of Science</div>
                                <div style="font-size: 6px; color: #64748b;">University of California • 2013-2017</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
        case 'academic':
            return `
                <div style="${baseStyle}">
                    <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid ${template.color}; margin-bottom: 12px;">
                        <div style="font-size: 15px; font-weight: bold; color: ${template.color}; margin-bottom: 4px;">Dr. John Doe</div>
                        <div style="font-size: 7px; color: #64748b;">Assistant Professor | Department of Computer Science</div>
                        <div style="font-size: 6px; color: #64748b; margin-top: 3px;">john.doe@university.edu | (555) 123-4567</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Education</div>
                        <div style="margin-bottom: 5px;">
                            <div style="font-weight: bold; font-size: 7px;">Ph.D. in Computer Science</div>
                            <div style="font-size: 6px; color: #64748b;">Stanford University, 2018</div>
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 7px;">M.S. in Computer Science</div>
                            <div style="font-size: 6px; color: #64748b;">MIT, 2014</div>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Research Interests</div>
                        <div style="height: 3px; background: #e5e7eb; margin-bottom: 2px; width: 90%; border-radius: 1px;"></div>
                        <div style="height: 3px; background: #e5e7eb; width: 75%; border-radius: 1px;"></div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Publications</div>
                        <div style="margin-bottom: 4px;">
                            <div style="font-size: 6px; margin-bottom: 2px; font-style: italic;">"Machine Learning Applications in Healthcare"</div>
                            <div style="font-size: 6px; color: #64748b;">Journal of AI Research, 2022</div>
                        </div>
                        <div style="margin-bottom: 4px;">
                            <div style="font-size: 6px; margin-bottom: 2px; font-style: italic;">"Deep Learning for Image Recognition"</div>
                            <div style="font-size: 6px; color: #64748b;">IEEE Transactions, 2021</div>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 8px; font-weight: bold; color: ${template.color}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Teaching Experience</div>
                        <div style="font-size: 7px; margin-bottom: 3px;">CS 101: Introduction to Programming</div>
                        <div style="font-size: 7px; margin-bottom: 3px;">CS 301: Machine Learning</div>
                        <div style="font-size: 7px;">CS 401: Advanced AI Systems</div>
                    </div>
                </div>
            `;
            
        default:
            return generateTemplatePreview({...template, design: 'minimal'});
    }
}

// Filter templates
function filterTemplates(category) {
    const templates = document.querySelectorAll('.template-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    templates.forEach(template => {
        if (category === 'all' || template.getAttribute('data-category') === category) {
            template.style.display = 'block';
        } else {
            template.style.display = 'none';
        }
    });
}

// Use template
function useTemplate(name) {
    alert(`Loading "${name}" template...\n\nYou can now:\n• Fill in your information\n• Customize colors and fonts\n• Download in multiple formats\n• Ensure ATS compatibility`);
}

// Preview template
function previewTemplate(name) {
    alert(`Previewing "${name}" template...\n\nA full-screen preview would open here showing:\n• Complete template layout\n• Sample content\n• ATS score simulation\n• Customization options`);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
