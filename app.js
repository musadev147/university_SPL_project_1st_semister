/**
 * ============================================================
 * HEMOPULSE ERP - CORE SHARED STRUCTURED ENGINE
 * Course: CSE 1101 Structured Programming Language
 * Prepared by: Musa (MD. MUSA ALOM MIM) - Canadian University of Bangladesh
 * ============================================================
 */

// 1. IN-MEMORY DATABASE ARRAY OF OBJECTS
const DEFAULT_DONORS = [
  { id: 1, name: "Rahim Uddin", bloodGroup: "A+", lastDonation: "2026-05-10", phone: "01711223344", city: "Dhaka (Banani)", age: 26, gender: "Male" },
  { id: 2, name: "Karim Hasan", bloodGroup: "O-", lastDonation: "2025-12-01", phone: "01822334455", city: "Chittagong", age: 31, gender: "Male" },
  { id: 3, name: "Nusrat Jahan", bloodGroup: "B+", lastDonation: "2026-08-15", phone: "01933445566", city: "Dhaka (Uttara)", age: 23, gender: "Female" },
  { id: 4, name: "Tanvir Ahmed", bloodGroup: "AB+", lastDonation: "2026-01-20", phone: "01644556677", city: "Sylhet", age: 28, gender: "Male" },
  { id: 5, name: "Farhana Akter", bloodGroup: "O+", lastDonation: "2026-03-12", phone: "01755667788", city: "Dhaka (Dhanmondi)", age: 25, gender: "Female" },
  { id: 6, name: "Shahadat Hossain", bloodGroup: "A-", lastDonation: "2025-10-18", phone: "01866778899", city: "Rajshahi", age: 34, gender: "Male" },
  { id: 7, name: "Mehnaz Tabassum", bloodGroup: "AB-", lastDonation: "2026-04-05", phone: "01977889900", city: "Dhaka (Gulshan)", age: 22, gender: "Female" },
  { id: 8, name: "Ashraful Islam", bloodGroup: "B-", lastDonation: "2026-07-28", phone: "01588990011", city: "Khulna", age: 29, gender: "Male" }
];

let donorDatabase = [];

function initDatabase() {
  const saved = localStorage.getItem("hemopulse_donor_db");
  donorDatabase = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DONORS));
  saveDatabase();
}

function saveDatabase() {
  localStorage.setItem("hemopulse_donor_db", JSON.stringify(donorDatabase));
}

// 2. MODULAR STRUCTURED FUNCTIONS

// Date Math: 4 Months Rule (120 Days)
function checkEligibility(lastDonationDate) {
  if (!lastDonationDate) return { isEligible: false, daysPassed: 0, daysElapsed: 0, daysRemaining: 120 };
  const diffInMs = new Date().getTime() - new Date(lastDonationDate).getTime();
  const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const isEligible = daysPassed >= 120;
  return {
    isEligible,
    daysPassed: Math.max(0, daysPassed),
    daysElapsed: Math.max(0, daysPassed),
    daysRemaining: isEligible ? 0 : Math.max(0, 120 - daysPassed)
  };
}

// Blood Compatibility Lookup
function getCompatibleBloodGroups(group) {
  const matrix = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
    "O+": ["O+", "O-"],
    "O-": ["O-"]
  };
  return matrix[group] || [group];
}

// Array Push
function registerDonor(data) {
  let nextId = 1;
  for (let i = 0; i < donorDatabase.length; i++) {
    if (donorDatabase[i].id >= nextId) nextId = donorDatabase[i].id + 1;
  }
  const newDonor = { id: nextId, ...data, age: Number(data.age) || 25 };
  donorDatabase.push(newDonor);
  saveDatabase();
  return newDonor;
}

// Iterative Search via Standard FOR Loop
function searchDonor(criteria = {}) {
  const { requiredGroup, isCompatible, eligibleOnly, location, generalQuery } = criteria;
  let allowed = requiredGroup ? (isCompatible ? getCompatibleBloodGroups(requiredGroup) : [requiredGroup]) : [];
  let matches = [];

  for (let i = 0; i < donorDatabase.length; i++) {
    let d = donorDatabase[i];
    let ok = true;

    if (allowed.length > 0 && !allowed.includes(d.bloodGroup)) ok = false;
    if (ok && eligibleOnly && !checkEligibility(d.lastDonation).isEligible) ok = false;
    if (ok && location && !d.city.toLowerCase().includes(location.toLowerCase())) ok = false;
    if (ok && generalQuery) {
      let q = generalQuery.toLowerCase();
      let match = d.name.toLowerCase().includes(q) || 
                  d.phone.includes(q) || 
                  d.city.toLowerCase().includes(q) || 
                  d.bloodGroup.toLowerCase().includes(q);
      if (!match) ok = false;
    }

    if (ok) matches.push(d);
  }
  return matches;
}

function deleteDonor(id) {
  for (let i = 0; i < donorDatabase.length; i++) {
    if (donorDatabase[i].id === id) {
      donorDatabase.splice(i, 1);
      saveDatabase();
      showToast(`Donor #${id} removed from database.`, "info");
      return true;
    }
  }
  return false;
}

function resetData() {
  if (confirm("Reset donor database to original CSE 1101 sample records?")) {
    localStorage.removeItem("hemopulse_donor_db");
    initDatabase();
    showToast("Database restored to default demo records.", "success");
    setTimeout(() => { window.location.reload(); }, 600);
  }
}

function exportCsv() {
  if (donorDatabase.length === 0) {
    showToast("No donor records to export!", "info");
    return;
  }
  let csv = "ID,Name,BloodGroup,Phone,City,Age,Gender,LastDonation,Eligibility\n";
  for (let i = 0; i < donorDatabase.length; i++) {
    let d = donorDatabase[i];
    let elg = checkEligibility(d.lastDonation).isEligible ? "Eligible" : "Resting";
    csv += `"${d.id}","${d.name}","${d.bloodGroup}","${d.phone}","${d.city}","${d.age || ''}","${d.gender || ''}","${d.lastDonation}","${elg}"\n`;
  }
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hemopulse_donors_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("CSV donor database exported successfully!", "success");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`, "success");
  }).catch(() => {
    showToast(`Phone: ${text}`, "info");
  });
}

// 3. UNIVERSAL DRAG-TO-SCROLL & WHEEL-SCROLL HELPER
function initDragToScroll() {
  const containers = document.querySelectorAll(".header-nav-pills, .table-luxury-wrap");
  containers.forEach(container => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    container.addEventListener("mousedown", (e) => {
      // Don't intercept button clicks unless moving
      isDown = true;
      hasMoved = false;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 3) hasMoved = true;
      container.scrollLeft = scrollLeft - walk;
    });

    // Horizontal wheel scroll when hovered
    container.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0 && container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.8;
      }
    }, { passive: false });
  });
}

// 4. GLOBAL AUTHENTICATION & SESSION
function checkSession() {
  const path = window.location.pathname;
  const isPublicPage = path.endsWith("home.html") || path.endsWith("index.html") || path.endsWith("/") || path === "";
  const session = localStorage.getItem("hemopulse_session");

  if (!session && !isPublicPage) {
    window.location.href = "index.html";
  } else if (session) {
    const user = JSON.parse(session);
    const nameEl = document.getElementById("headerUserName");
    const roleEl = document.getElementById("headerUserRole");
    
    // Format compact clean name & role in header
    if (nameEl) {
      const cleanName = user.name ? user.name.split(" (")[0] : "Musa";
      nameEl.textContent = cleanName;
      if (nameEl.parentElement) {
        nameEl.parentElement.title = `${user.name} - ${user.role}`;
      }
    }
    if (roleEl) {
      roleEl.textContent = user.role ? (user.role.includes("Admin") ? "Admin" : (user.role.includes("Medical") ? "Doctor" : "Volunteer")) : "Admin";
    }
  }
}

window.logout = function() {
  localStorage.removeItem("hemopulse_session");
  showToast("Logged out of ERP system.", "info");
  setTimeout(() => { window.location.href = "index.html"; }, 400);
};

// 5. TOAST NOTIFICATIONS
function showToast(msg, type = "info") {
  const box = document.getElementById("toastContainer");
  if (!box) return;
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check text-success' : 'circle-info text-primary'}"></i> ${msg}`;
  box.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

// 6. GLOBAL INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  checkSession();
  initDragToScroll();

  // Load Saved Theme (Default to Light Mode)
  const savedTheme = localStorage.getItem("hemopulse_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Theme Toggle Button
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("hemopulse_theme", next);
      showToast(`${next === "dark" ? "Night Mode" : "Light Mode"} active`, "info");
    });
  }
});
