        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('registrationModal');
            const joinBtns = document.querySelectorAll('.join-btn');
            const closeBtn = document.querySelector('.close');
            const eventNameSpan = document.getElementById('eventName');
            const registrationForm = document.getElementById('registrationForm');
            
            // Open modal when Join Now button is clicked
            joinBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const eventName = this.getAttribute('data-event');
                    eventNameSpan.textContent = eventName;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                });
            });
            
            // Close modal when X is clicked
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Form submission
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = {
                    event: eventNameSpan.textContent,
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    studentId: document.getElementById('studentId').value,
                    studyLevel: document.getElementById('studyLevel').value,
                    specialization: document.getElementById('specialization').value,
                    phone: document.getElementById('phone').value,
                    notes: document.getElementById('notes').value
                };
                
                // Here you would typically send this data to a server
                console.log('Form submitted:', formData);
                
                // Show success message
                alert(`Thank you, ${formData.fullName}! Your registration for "${formData.event}" has been received.`);
                
                // Reset form and close modal
                registrationForm.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    console.log(`Filter by: ${this.textContent}`);
                });
            });
            
            // Mobile menu toggle
            const menuBars = document.getElementById('menuBars');
            const navbar = document.querySelector('.navbar');
            
            menuBars.addEventListener('click', () => {
                navbar.classList.toggle('active');
                menuBars.classList.toggle('fa-times');
            });
        });