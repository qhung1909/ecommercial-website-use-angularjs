// Count thời gian giữa 2 ngày
async function countdown(hours) {
  const targetTime = Date.now() + hours * 3600 * 1000;

  while (true) {
    const currentTime = Date.now();
    const remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      document.getElementById('countdown').innerHTML = "Countdown finished!";
      break;
    }

    const hoursRemaining = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(2, '0');
    const minutesRemaining = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const secondsRemaining = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, '0');


    document.getElementById('hours').innerHTML = hoursRemaining;
    document.getElementById('minutes').innerHTML = minutesRemaining;
    document.getElementById('seconds').innerHTML = secondsRemaining;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
countdown(48);

// TOOLTIPS
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // Validation

  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()