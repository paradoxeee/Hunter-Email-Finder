# Hunter Email Finder

![Hunter Logo](logo.png)

## Description
**Hunter Email Finder** is a Google Sheets add-on that uses the Hunter.io API to find email addresses based on first name, last name, and company domain.

## Features
- **Configure API:** Save your Hunter.io API key.
- **Instructions:** Display detailed instructions on how to use the add-on.
- **Search Emails:** Find emails using the Hunter.io API.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Hunter-Email-Finder.git
    cd Hunter-Email-Finder
    ```

2. **Configure the Hunter.io API:**
   - Open Google Sheets.
   - Go to `Extensions > Apps Script`.
   - Copy the content of the `Code.js` file into the script editor.
   - Save and deploy the script.

3. **Add the HTML instructions file:**
   - Create an HTML file in the script editor named `Instructions`.
   - Paste the content of the `Instructions.html` file.

## Usage

1. **API Configuration:**
   - Open Google Sheets.
   - Go to the `Hunter.io` menu.
   - Select `Configure API`.
   - Enter your Hunter.io API key in the dialog box and click `Save`.

2. **Data Preparation:**
   - In your Google Sheets spreadsheet, enter the following information:
     - Cell `A3`: First name of the person.
     - Cell `B3`: Last name of the person.
     - Cell `C3`: Company domain name (e.g., `example.com`).

3. **Email Search:**
   - Go to the `Hunter.io` menu.
   - Select `Search Emails`.
   - The corresponding email address will be displayed in cell `D3`.

## Examples

### Email Search

Suppose you are looking for the email of John Doe who works at Example Inc.

- **Cell `A3`:** John
- **Cell `B3`:** Doe
- **Cell `C3`:** example.com

Then, select `Hunter.io > Search Emails` to get the email address in cell `D3`.

---

© 2024 paradoxeee
