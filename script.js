document.addEventListener('DOMContentLoaded', () => {

    // --- YOUR CONTENT GOES HERE ---
    // Define your words in order of status, from highest (1) to lowest (10).
    const wordHierarchy = [
        {
            title: 'Quintessential',
            text: 'Representing the most perfect or typical example of a quality or class. The pure and concentrated essence of a substance.'
        },
        {
            title: 'Buffoonery',
            text: 'Behavior that is ridiculous but amusing. A playful, foolish, or theatrical act.'
        },
        {
            title: 'Ethereal',
            text: 'Extremely delicate and light in a way that seems too perfect for this world. Heavenly or spiritual.'
        },
        {
            title: 'Splendiferous',
            text: 'Having or showing splendor; splendid. Magnificent and impressive in appearance.'
        },
        {
            title: 'Devious',
            text: 'Showing a skillful use of underhanded tactics to achieve goals. Cleverly scheming.'
        },
        {
            title: 'Kerfuffle',
            text: 'A commotion or fuss, especially one caused by conflicting views. A comical disturbance.'
        },
        {
            title: 'Lackadaisical',
            text: 'Lacking enthusiasm and determination; carelessly lazy. Without interest, vigor, or determination.'
        },
        {
            title: 'Malarkey',
            text: 'Meaningless talk; nonsense. Often used to express disbelief or contempt.'
        },
        {
            title: 'Brouhaha',
            text: 'A noisy and overexcited reaction or response to something. A loud confused noise from a number of sources.'
        },
        {
            title: 'Mundane',
            text: 'Lacking interest or excitement; dull. Of this earthly world rather than a heavenly or spiritual one.'
        }
    ];

    // --- EPIC FEATURES CONFIG ---
    const config = {
        bootSequence: [
            { text: 'INITIATING SYSTEM BOOT...', delay: 1000 },
            { text: 'LOADING HIERARCHY INDEX...', delay: 1500 },
            { text: 'CALIBRATING STATUS VECTORS...', delay: 1200 },
            { text: 'SYSTEM ONLINE.', delay: 800 }
        ],
        typewriterSpeed: 20 // ms per character
    };
    
    // --- SITE FUNCTIONALITY (DO NOT EDIT BELOW) ---
    const body = document.body;
    const hierarchyList = document.querySelector('.hierarchy-list');
    const definitionDisplay = document.getElementById('definition-display');
    const definitionTitle = document.getElementById('definition-title');
    const definitionText = document.getElementById('definition-text');
    
    // Audio elements
    const audioHover = document.getElementById('audio-hover');
    const audioClick = document.getElementById('audio-click');
    const audioCritical = document.getElementById('audio-critical');
    
    // Boot-up sequence
    const bootSequenceContainer = document.getElementById('boot-sequence');
    const bootTextContainer = document.getElementById('boot-text');
    let bootIndex = 0;
    
    function runBootSequence() {
        if (bootIndex < config.bootSequence.length) {
            const step = config.bootSequence[bootIndex];
            bootTextContainer.textContent = step.text;
            bootIndex++;
            setTimeout(runBootSequence, step.delay);
        } else {
            bootSequenceContainer.style.opacity = '0';
            setTimeout(() => bootSequenceContainer.style.display = 'none', 1000);
        }
    }
    
    // Typewriter effect
    let typeInterval;
    function typewriterEffect(element, text) {
        let i = 0;
        element.innerHTML = "";
        clearInterval(typeInterval); // Stop any previous typing
        typeInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, config.typewriterSpeed);
    }
    
    // Start boot sequence on load
    runBootSequence();

    // Generate the list items dynamically
    wordHierarchy.forEach((word, index) => {
        const rank = index + 1;
        const listItem = document.createElement('li');
        listItem.setAttribute('data-rank', rank);
        
        listItem.innerHTML = `
            <div class="rank-indicator">${rank}</div>
            <div class="word-text">${word.title}</div>
        `;

        // Add event listeners
        listItem.addEventListener('mouseenter', () => audioHover.play().catch(e => {}));
        
        listItem.addEventListener('click', () => {
            body.classList.remove('critical-hit');

            if (rank === 1) {
                audioCritical.play().catch(e => {});
                setTimeout(() => body.classList.add('critical-hit'), 10);
            } else {
                audioClick.play().catch(e => {});
            }

            document.querySelectorAll('.hierarchy-list li').forEach(li => li.classList.remove('active'));
            listItem.classList.add('active');

            if (!definitionDisplay.classList.contains('visible')) {
                 definitionDisplay.classList.add('visible');
            }
           
            definitionTitle.textContent = word.title;
            typewriterEffect(definitionText, word.text);
        });

        hierarchyList.appendChild(listItem);
    });
});