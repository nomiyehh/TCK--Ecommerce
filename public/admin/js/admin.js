// Supabase Configuration
// Replace these with your actual Supabase project details
const SUPABASE_URL = 'https://pawzsovaadcrmrvsmxuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3pzb3ZhYWRjcm1ydnNteHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NzMxNzIsImV4cCI6MjA4OTA0OTE3Mn0.QKc_5bZj5RtMw8eIksqqZ8oz1luq5vIfaHQIeO8e2xA';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check authentication
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    // If not logged in and not on login page, redirect to login
    if (!session && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
    
    // If logged in and on login page, redirect to dashboard
    if (session && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    return session;
}

// Logout function
async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
}

// Run auth check on every page load
if (typeof supabaseClient !== 'undefined') {
    checkAuth();
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
