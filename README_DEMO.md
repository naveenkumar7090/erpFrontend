# Demo Mode - School Management System

## Overview

The School Management System now includes a comprehensive demo mode that allows users to experience the full application without requiring any API calls or backend setup. This is perfect for testing, demonstration, and learning purposes.

## Features

### 🚀 One-Click Access

- Enable demo mode with a single click
- No registration or setup required
- Instant access to all features

### 📊 Complete Sample Data

- **Classes**: Grade 10A, Grade 9B with full details
- **Sections**: Multiple sections across different grades
- **Subjects**: Mathematics, Science, English with teacher assignments
- **Students**: Sample student records with enrollment details
- **Teachers**: Faculty information with qualifications and subjects
- **Fees**: Sample fee records with payment status
- **Announcements**: System announcements and notifications

### 🔐 Full Access Permissions

- Admin role with all permissions
- Access to all modules and features
- No restrictions on functionality

### 🎯 Available Modules

- **School Management**: Classes, Sections, Subjects, Classrooms, Campuses
- **Academic Management**: Attendance, Exams, Assignments, Transcripts
- **Finance Management**: Fees and Financial Records
- **Communication**: Announcements and Notifications
- **User Management**: Profile management and settings

## How to Use

### Method 1: Demo Login Page

1. Navigate to `/demo` in your browser
2. Click the "Start Demo Mode" button
3. You'll be automatically redirected to the dashboard

### Method 2: Demo Mode Toggle

1. Look for the floating demo mode toggle button (bottom-right corner)
2. Click "Enable Demo Mode" when not authenticated
3. You'll be redirected to the dashboard

### Method 3: Regular Login with Demo Credentials

1. Go to the regular login page
2. Use these credentials:
   - **Email**: `demo@school.com`
   - **Password**: `demo123`
3. The system will automatically detect demo credentials and enable demo mode

## Demo Credentials

- **Email**: `demo@school.com`
- **Password**: `demo123`

## Visual Indicators

When demo mode is active, you'll see several visual indicators:

1. **Demo Banner**: Yellow banner at the top of the application
2. **Header Indicator**: "Demo Mode" badge in the header
3. **Floating Toggle**: Green demo mode toggle button
4. **Demo Mode Active**: Status indicator in the toggle

## Sample Data Structure

### Classes

- **Grade 10A**: 30 capacity, 28 enrolled, Mathematics/Science/English
- **Grade 9B**: 25 capacity, 22 enrolled, History/Geography/Literature

### Students

- **Alice Johnson**: Grade 10, Section A, Roll #1001
- **Bob Smith**: Grade 9, Section B, Roll #2001

### Teachers

- **John Smith**: Mathematics & Science, 8 years experience
- **Sarah Johnson**: English & Literature, 5 years experience

### Fees

- Sample fee records with different payment statuses
- Due dates and payment tracking

## Important Notes

### Data Persistence

- **All changes are temporary** when in demo mode
- Data is stored in localStorage only
- Changes will be reset when demo mode is disabled

### No API Calls

- Demo mode operates entirely on the frontend
- No network requests are made
- Perfect for offline demonstrations

### Switching Modes

- You can exit demo mode at any time
- Exiting will clear all demo data
- You'll be redirected to the login page

## Technical Implementation

### Demo Service

- Located at `src/services/demoService.js`
- Manages all demo data and functionality
- Simulates API responses with realistic delays

### Redux Integration

- Demo mode state is managed in Redux
- All slices support demo mode operations
- Seamless switching between demo and regular modes

### Local Storage

- Demo mode status is persisted in localStorage
- User data is cached for session persistence
- Easy to reset by clearing browser data

## Customization

### Adding More Sample Data

Edit `src/services/demoService.js` and add data to the `initializeDemoData()` method:

```javascript
// Add new entities
newEntity: [
  {
    id: "new-001",
    name: "Sample Item",
    // ... other properties
  },
];
```

### Modifying Demo User

Update the user object in the demo service:

```javascript
user: {
  // ... existing properties
  newProperty: "New Value";
}
```

### Adding New Demo Methods

Create new methods in the demo service:

```javascript
async getDemoNewEntity() {
  return this.simulateApiCall(this.getDemoData("newEntity"));
}
```

## Troubleshooting

### Demo Mode Not Working

1. Check browser console for errors
2. Clear localStorage and try again
3. Ensure all components are properly imported

### Data Not Loading

1. Verify demo mode is enabled
2. Check Redux state for demo mode status
3. Refresh the page if needed

### Performance Issues

1. Demo mode includes realistic API delays
2. Adjust delay values in `simulateApiCall()` method
3. Consider reducing sample data size for large datasets

## Support

For issues or questions about demo mode:

1. Check the browser console for error messages
2. Verify Redux state in Redux DevTools
3. Review the demo service implementation
4. Check component imports and dependencies

---

**Demo mode is designed to provide a complete, realistic experience of the School Management System without any external dependencies. Enjoy exploring all the features!**
