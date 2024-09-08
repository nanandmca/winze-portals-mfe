const express = require('express');
const path = require('path');

const app = express();

// Serve login
app.use('/login', express.static(path.join(__dirname, 'login')));

// Serve dashboard
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));

// Serve dashboard
app.use('/vconnect', express.static(path.join(__dirname, 'vconnect')));

// Serve dashboard
app.use('/vconnect-reports', express.static(path.join(__dirname, 'vconnect-reports')));

// Serve dashboard
app.use('/portal-admin', express.static(path.join(__dirname, 'portal-admin')));

// Serve a fallback HTML for root or other paths if needed
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 9090;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});