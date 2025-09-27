document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('main section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide all sections and remove active class from all buttons
            sections.forEach(sec => sec.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Show the selected section and set the button as active
            const targetSectionId = button.dataset.section;
            document.getElementById(targetSectionId).classList.add('active');
            button.classList.add('active');
        });
    });

    // --- 1. Review & Complaint Portal ---
    const complaintForm = document.getElementById('complaint-form');
    const reviewsDisplay = document.getElementById('reviews-display');

    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pnr = document.getElementById('pnr').value;
        const reviewText = document.getElementById('review').value;

        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<h4>PNR: ${pnr}</h4><p>${reviewText}</p>`;
        reviewsDisplay.prepend(newReview);
        complaintForm.reset();
        alert('Your complaint has been submitted for verification!');
    });

    // --- 2. Personalized Route Recommendations ---
    const recommendationsList = document.getElementById('recommendations-list');
    const checkRatingBtn = document.getElementById('check-rating-btn');
    const fromDestInput = document.getElementById('from-dest');
    const toDestInput = document.getElementById('to-dest');
    const recommendationResultDiv = document.getElementById('recommendation-result');

    // A mock database of routes and their ratings
    const routeRatings = {
        'New Delhi-Mumbai': {
            train: 'Rajdhani Express',
            rating: '4.7/5',
            details: 'Known for its punctuality and excellent service.'
        },
        'New Delhi-Kolkata': {
            train: 'Duronto Express',
            rating: '4.2/5',
            details: 'A popular choice with good amenities, but can sometimes face delays.'
        },
        'Mumbai-Pune': {
            train: 'Deccan Queen',
            rating: '4.9/5',
            details: 'A very reliable and comfortable train with great scenic views.'
        }
    };

    checkRatingBtn.addEventListener('click', () => {
        const from = fromDestInput.value.trim();
        const to = toDestInput.value.trim();
        const routeKey = `${from}-${to}`;
        const reverseRouteKey = `${to}-${from}`;

        let result = '';
        if (routeRatings[routeKey]) {
            const data = routeRatings[routeKey];
            result = `
                <h4>Route Rating:</h4>
                <p><strong>Train:</strong> ${data.train}</p>
                <p><strong>Rating:</strong> ${data.rating}</p>
                <p><strong>Details:</strong> ${data.details}</p>
            `;
        } else if (routeRatings[reverseRouteKey]) {
            const data = routeRatings[reverseRouteKey];
            result = `
                <h4>Route Rating:</h4>
                <p><strong>Train:</strong> ${data.train}</p>
                <p><strong>Rating:</strong> ${data.rating}</p>
                <p><strong>Details:</strong> ${data.details}</p>
            `;
        } else {
            result = `<p>No rating found for this route. Try another.</p>`;
        }

        recommendationResultDiv.innerHTML = result;
        recommendationResultDiv.classList.add('show');
    });

    // Existing hardcoded recommendations (you can remove this if you only want the new feature)
    const mockRecommendations = [
        { route: 'Delhi to Mumbai - High-speed train', score: 4.8 },
        { route: 'Chennai to Bangalore - Express train', score: 4.5 }
    ];

    mockRecommendations.forEach(rec => {
        const recItem = document.createElement('p');
        recItem.textContent = `${rec.route} (Rating: ${rec.score}/5)`;
        recommendationsList.appendChild(recItem);
    });

    // --- 3. Automated Concessions ---
    const applyConcessionBtn = document.getElementById('apply-concession');
    const concessionStatusDiv = document.getElementById('concession-status');

    applyConcessionBtn.addEventListener('click', () => {
        concessionStatusDiv.textContent = 'Checking eligibility...';
        setTimeout(() => {
            concessionStatusDiv.textContent = 'Eligibility confirmed. Your concession will be automatically applied.';
        }, 1500);
    });

    // --- 4. LTC & Billing Simplification ---
    const billingDetailsDiv = document.getElementById('billing-details');

    // Sample data to mimic the video's content
    const journeyData = [
        {
            route: 'Delhi - Goa Rajdhani (AC II Tier)',
            date: '2025-09-15',
            originalFare: '₹4,500',
            lowestEligibleFare: '₹4,500',
            savings: '0',
            billingStatus: 'Fully Reimbursable',
            isLowestFare: true
        },
        {
            route: 'Mumbai - Pune Garib Rath (AC III Tier)',
            date: '2025-06-21',
            originalFare: '₹1,100',
            lowestEligibleFare: '₹980',
            savings: '120',
            billingStatus: 'Claim Capped',
            isLowestFare: false
        },
        {
            route: 'Kolkata - Chennai Express (Sleeper Class)',
            date: '2024-12-01',
            originalFare: '₹950',
            lowestEligibleFare: '₹950',
            savings: '0',
            billingStatus: 'Fully Reimbursable',
            isLowestFare: true
        }
    ];

    // Function to create a billing card element
    function createBillingCard(data) {
        const card = document.createElement('div');
        card.classList.add('billing-card');

        card.innerHTML = `
            <h4>${data.route}</h4>
            <p><strong>Original Paid Fare:</strong> ${data.originalFare}</p>
            <p><strong>Lowest Eligible Fare:</strong> ${data.lowestEligibleFare} (LTC Cap)</p>
            <div class="fare-details">
                <p><strong>Savings/Disallowance:</strong> ₹${data.savings}</p>
                <p class="billing-status">Billing Status: ${data.billingStatus}</p>
            </div>
            <button class="download-btn">Download Bill & LTC Summary</button>
        `;
        return card;
    }

    // Populate the billing section with data
    journeyData.forEach(journey => {
        const card = createBillingCard(journey);
        billingDetailsDiv.appendChild(card);
    });
});