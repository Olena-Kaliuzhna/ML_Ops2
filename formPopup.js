(() => {
  const openModalBtn = document.querySelector('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const modal = document.querySelector('[data-modal]');
  const projectForm = document.querySelector('#Project-form');
  const popupForm = document.querySelector('.form_popup');

  const htmlAlert = document.querySelector('.html-alert');
  const htmlAlertText = document.querySelector('#htmlAlertText');
  const htmlAlertClose = document.querySelector('#htmlAlertClose');

  let firstStepData = null;
  let alertTimeout = null;
 
  openModalBtn.addEventListener('click', formDatas);
  closeModalBtn.addEventListener('click', closeBTN);  

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

 
  function closeBTN(event) {
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    document.body.classList.remove('modal-open');
    modal.classList.add('is-hidden');
    console.log('click btn / closed');
  }

  
  function openModal() {
    document.body.classList.add('modal-open');
    modal.classList.remove('is-hidden');
    console.log('modal opened');
  }

  function formDatas() {  
    console.log('click form');

    const formData = new FormData(projectForm); 
    const data = Object.fromEntries(formData);

   
    if (Object.keys(data).length < 4) {
      showAlert("Please select answers to all questions.");
      return;
    }

    firstStepData = data;
    closeAlert();
    openModal(); 
  }

  popupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const popupFormData = new FormData(popupForm);
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

    console.log('Final submitted data:', finalData);
    
   
    popupForm.reset();
    projectForm.reset();
    closeBTN(); 
  });
})();