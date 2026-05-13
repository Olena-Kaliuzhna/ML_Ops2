(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    projectForm: document.querySelector('#Project-form'),
    popupForm: document.querySelector('.form_popup'),

    htmlAlert: document.querySelector('.html-alert'),
    htmlAlertText: document.querySelector('#htmlAlertText'),
    htmlAlertClose: document.querySelector('#htmlAlertClose'),
  };

  let firstStepData = null;
  let alertTimeout = null;

  refs.openModalBtn.addEventListener('click', formDatas);
  refs.closeModalBtn.addEventListener('click', closeBTN);  


function showAlert(message) {
  if (!htmlAlert || !htmlAlertText) return;

  clearTimeout(alertTimeout);

  htmlAlertText.textContent = message;
  htmlAlert.classList.add('is-visible');

  alertTimeout = setTimeout(closeAlert, 2000);
}


function closeAlert() {
  if (htmlAlert) {
    htmlAlert.classList.remove('is-visible');
  }
}

if (htmlAlertClose) {
  htmlAlertClose.addEventListener('click', closeAlert);
}


function closeBTN() {
    event.stopPropagation();
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
    console.log('click btn');
}

function toggleModal() {
  document.body.classList.toggle('modal-open');
  refs.modal.classList.toggle('is-hidden');
  console.log('click bg');
}

function formDatas() {  
  console.log('click form');

  const formData = new FormData(refs.projectForm); 
  const data = Object.fromEntries(formData);

    if (Object.keys(data).length < 4) {
      showAlert("Please select answers to all questions.");
      return;
    }

    firstStepData = data;
    closeAlert();
    toggleModal(); 
    console.log("Stage 1 completed successfully. Survey data saved:", firstStepData);
    
  popupFormSubmit();
  }


function popupFormSubmit() {
refs.popupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const popupFormData = new FormData(refs.popupForm);
    const popupData = Object.fromEntries(popupFormData);

    const clientName = popupData.client_name ? popupData.client_name.trim() : '';
    const clientMail = popupData.client_mail ? popupData.client_mail.trim() : '';

    
    if (!clientName || !clientMail) {
      showAlert("Please fill in both fields: name and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientMail)) {
      showAlert("Please enter a valid email address.");
      return;
    }
    closeAlert();
    const finalData = {
      ...firstStepData, 
      ...popupData      
    };
     
    console.log("Stage 2 completed. All data collected successfully:", finalData);

   
    refs.popupForm.reset();
    refs.projectForm.reset();
    closeBTN();
  });
}



})();
