// Checkbox behavior
document.querySelectorAll('.checkbox-group').forEach(group => {
  group.addEventListener('change', function(event) {
      if (event.target.checked) {
          const checkboxes = group.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
              if (checkbox !== event.target) {
                  checkbox.checked = false; // Uncheck other checkboxes in the group
              }
          });
      }
  });
});

// Eligibility check
document.getElementById('eligibilityForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get user inputs
  const monthlyIncome = parseInt(document.getElementById('monthlyIncome').value) || 0;
  const children = parseInt(document.getElementById('children').value) || 0;
  const dependents = parseInt(document.getElementById('dependents').value) || 0;

  const employmentStatus = document.querySelector('input[name="employmentStatus"]:checked');
  const spouseEmploymentStatus = document.querySelector('input[name="spouseEmployment"]:checked');

  // Initialize eligibility status and aid percentage
  let eligible = false;
  let aidPercentage = 0;
  //let reason = "";

  // Define income thresholds)
  const zeroIncomeThreshold = 10000; // For 100% aid
  const studentIncomeThreshold = 30000; // For 75% aid
  const regularIncomeThreshold = 40000; // For 50% aid
  const higherIncomeThreshold = 60000; // For 25% aid

  // Check criteria for 100% aid
  if (((employmentStatus && employmentStatus.value === 'Unemployed') || 
      (spouseEmploymentStatus || spouseEmploymentStatus.value === 'Unemployed')) && 
      monthlyIncome <= 10000) {
      eligible = true;
      aidPercentage = 100;
      //reason = "You qualify for 100% financial aid due to your unemployment status or your spouse's unemployment status with no income.";
  } 
  // Check criteria for 75% aid
  else if ((employmentStatus && employmentStatus.value === 'Student' && monthlyIncome <= studentIncomeThreshold) || 
           (children > 1 || dependents > 1)) {
      eligible = true;
      aidPercentage = 75;
      
  } 
  // Check criteria for 50% aid
  else if ((employmentStatus && (employmentStatus.value === 'Employed part-time' || employmentStatus.value === 'Employed full-time')) && 
           monthlyIncome <= regularIncomeThreshold || (children > 1 || dependents > 1) ) {
      eligible = true;
      aidPercentage = 50;
     
  } 
  // Check criteria for 25% aid
  else if (monthlyIncome >= regularIncomeThreshold && monthlyIncome <= higherIncomeThreshold) {
      eligible = true;
      aidPercentage = 25;
      
  }
 else{
  eligible = true;
  aidPercentage = 0;
 }
  // Show eligibility result
  const feedbackDiv = document.getElementById('feedback');
feedbackDiv.style.display = 'block'; // Show the feedback div
feedbackDiv.innerHTML = `<p>${eligible ? ' You qualify for ' + aidPercentage + '% financial aid.' : "You are not eligible for financial aid."}</p>`;


});