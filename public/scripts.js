// Define car makes and models
const carData = {
    Toyota: ["Camry", "Corolla", "Land Cruiser", "RAV4", "Highlander"],
    Nissan: ["Altima", "Sentra", "Maxima", "Rogue", "Pathfinder"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    // Add more makes and models as needed
};

// Function to populate the model dropdown based on the selected make
function filterModels() {
    // Get selected make
    const makeSelect = document.getElementById("make");
    const selectedMake = makeSelect.value;

    // Get model dropdown
    const modelSelect = document.getElementById("model");

    // Clear existing model options
    modelSelect.innerHTML = "<option value=''>Select Model</option>";

    // Populate models for the selected make
    if (carData[selectedMake]) {
        carData[selectedMake].forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideIndex) {
            slide.classList.add('active');
        }
    });
    slideIndex = (slideIndex + 1) % slides.length;
}

// Call showSlides() every 3 seconds
setInterval(showSlides, 3000);
showSlides();

const makeDropdown = document.getElementById('make');
const modelDropdown = document.getElementById('model');

// Data: Map Make to Models
const carModels = {
  toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
  ford: ['Focus', 'Mustang', 'Explorer', 'F-150']
};

// Event Listener for "Make" Dropdown
makeDropdown.addEventListener('change', function () {
  const selectedMake = this.value;

  // Clear existing models
  modelDropdown.innerHTML = '<option value="">Select Model</option>';

  // Populate models if a make is selected
  if (carModels[selectedMake]) {
    carModels[selectedMake].forEach(model => {
      const option = document.createElement('option');
      option.value = model.toLowerCase();
      option.textContent = model;
      modelDropdown.appendChild(option);
    });
  }
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
  
    fetch(`/search.php?make=${make}&model=${model}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
  
        if (data.length > 0) {
          data.forEach(car => {
            const dealerInfo = `
              <div>
                <h3>${car.make} ${car.model}</h3>
                <p>Dealer: ${car.name}</p>
                <p>Location: ${car.location}</p>
                <p>Contact: ${car.contact}</p>
              </div>
            `;
            resultsDiv.innerHTML += dealerInfo;
          });
        } else {
          resultsDiv.innerHTML = '<p>No cars found.</p>';
        }
      })
      .catch(error => console.error('Error:', error));
  });

  // Function to update the displayed price range dynamically
function updatePriceLabel() {
  const priceSlider = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');
  priceLabel.textContent = `Price: €40 — €${priceSlider.value}`;
}

// Function to apply the filter logic
function filterByPrice() {
  const selectedPrice = document.getElementById('priceRange').value;
  alert(`Filtering products below €${selectedPrice}...`);
  // Implement actual filter logic here, e.g., hiding/showing products dynamically
}

// Change header background on scroll
window.addEventListener("scroll", function () {
  const body = document.body;
  const header = document.querySelector(".main-header");

  if (window.scrollY > 50) {
      body.classList.add("scrolled");
  } else {
      body.classList.remove("scrolled");
  }
});

document.querySelector('.view-dealers-btn').addEventListener('click', () => {
  document.getElementById('dealers-section').scrollIntoView({ behavior: 'smooth' });
});

function toggleChatVisibility() {
  const chatSection = document.getElementById("chat-section");
  chatSection.classList.toggle("hidden");
}

function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (input.value.trim() !== "") {
      // User message
      const userMessage = document.createElement("p");
      userMessage.className = "user";
      userMessage.textContent = input.value;
      messages.appendChild(userMessage);

      // Clear input
      input.value = "";

      // Simulate bot response
      setTimeout(() => {
          const botMessage = document.createElement("p");
          botMessage.className = "bot";
          botMessage.textContent = "Thank you for reaching out. How can I assist you?";
          messages.appendChild(botMessage);

          // Scroll to the bottom of messages
          messages.scrollTop = messages.scrollHeight;
      }, 1000);
  }
}
