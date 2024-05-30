// Permet d'ajouter un menu personnalisé au Google Sheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Hunter.io')
    .addItem('Configure API', 'showConfigDialog')
    .addItem('Instructions', 'showInstructions')
    .addItem('Search Emails', 'getEmails')
    .addToUi();
}

// Permet d'afficher la boîte de dialogue pour configurer l'API
function showConfigDialog() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Config')
      .setWidth(400)
      .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Configure Hunter.io API');
}

// Permet d'enregistrer la clé
function saveApiKey(apiKey) {
  PropertiesService.getUserProperties().setProperty('HUNTER_API_KEY', apiKey);
  SpreadsheetApp.getActiveSpreadsheet().toast('API key saved');
}

// Permet de voir les instructions pour connaître le fonctionnement de l'outil
function showInstructions() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Instructions')
      .setWidth(600)
      .setHeight(850);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Instructions for Using Hunter.io Tool');
}

// Permet de rechercher les mails et d'afficher le résultat
function getEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var firstName = sheet.getRange('A3').getValue();
  var lastName = sheet.getRange('B3').getValue();
  var domain = sheet.getRange('C3').getValue();
  
  if (firstName && lastName && domain) {
    var email = FindEmail(firstName, lastName, domain);
    sheet.getRange('D3').setValue(email); // Colonne D3 pour le résultat

    if (email !== 'No email found' && !email.startsWith('Erreur :')) {
      SpreadsheetApp.getUi().alert('Email search completed.');
    } else {
      SpreadsheetApp.getUi().alert('No email found for the provided entries.');
    }
  } else {
    SpreadsheetApp.getUi().alert('Please fill in cells A3 (First Name), B3 (Last Name), and C3 (Domain).');
  }
}

// Permet d'utiliser l'API Hunter.io à l'aide d'une formule personnalisée =FindEmail()
function FindEmail(firstName, lastName, company) {
  Logger.log('FindEmail called with: ' + firstName + ', ' + lastName + ', ' + company);

  if (!firstName || !lastName || !company) {
    return 'Please provide a first name, last name, and company.';
  }

  var apiKey = PropertiesService.getUserProperties().getProperty('HUNTER_API_KEY');
  if (!apiKey) {
    return 'Please configure your Hunter.io API key.';
  }

  var domain = company;
  if (company.startsWith("http://") || company.startsWith("https://")) {
    try {
      domain = new URL(company).hostname;
    } catch (e) {
      return 'Error: Invalid domain URL';
    }
  }

  var domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!domainPattern.test(domain)) {
    return 'Error: Please enter a valid domain name.';
  }

  var url = 'https://api.hunter.io/v2/email-finder?domain=' + encodeURIComponent(domain) + 
            '&first_name=' + encodeURIComponent(firstName) + 
            '&last_name=' + encodeURIComponent(lastName) + 
            '&api_key=' + apiKey;
  Logger.log('URL: ' + url);

  try {
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());
    Logger.log('Response: ' + response.getContentText());

    if (json.data && json.data.email) {
      return json.data.email;
    } else if (json.errors) {
      return 'Error: ' + json.errors[0].details;
    } else {
      return 'No email found';
    }
  } catch (e) {
    return 'Error during API request: ' + e.message;
  }
}
