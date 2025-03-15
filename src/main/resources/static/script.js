const API_BASE_URL = 'http://localhost:8080/api'; // Define base URL for your API

// *** Admin Dashboard (admin_dashboard.html) JavaScript ***

if (document.body.id === 'admin-dashboard-page') {
    function displayDoctors(doctors) {
        const doctorsTableBody = document.getElementById('doctors-table-body');
        doctorsTableBody.innerHTML = '';
        doctors.forEach(doctor => {
            const row = doctorsTableBody.insertRow();
            row.insertCell().textContent = doctor.id;
            row.insertCell().textContent = doctor.name;
            row.insertCell().textContent = doctor.specialization;
            row.insertCell().textContent = doctor.email;
        });
    }

    function fetchDoctors() {
        fetch(`${API_BASE_URL}/doctors/all`)
            .then(response => response.json())
            .then(data => displayDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }

    function displayPatients(appointments) {
        const patientsTableBody = document.getElementById('patients-table-body');
        patientsTableBody.innerHTML = '';
        appointments.forEach(appointment => {
            const row = patientsTableBody.insertRow();
            row.insertCell().textContent = appointment.patientName;
            row.insertCell().textContent = appointment.patientPhone;
            row.insertCell().textContent = appointment.patientEmail;
        });
    }

    function fetchPatients() {
        fetch(`${API_BASE_URL}/appointments/all`) // Use the correct API endpoint
            .then(response => response.json())
            .then(data => displayPatients(data))
            .catch(error => console.error('Error fetching patients:', error));
    }

    function displayAppointments(appointments) {
        const appointmentsTableBody = document.getElementById('all-appointments-table-body');
        appointmentsTableBody.innerHTML = '';
        appointments.forEach(appointment => {
//            if (appointment.status === 'Confirmed') { // Filter for confirmed appointments
                const row = appointmentsTableBody.insertRow();
                row.insertCell().textContent = appointment.patientName;
                row.insertCell().textContent = appointment.doctorId;
                row.insertCell().textContent = appointment.appointmentDateTime;
                row.insertCell().textContent = appointment.status;
//            }
        });
        if (appointmentsTableBody.rows.length === 0) {
            appointmentsTableBody.insertRow().insertCell().textContent = "No scheduled appointments yet.";
        }
    }

    function fetchAppointments() {
        fetch(`${API_BASE_URL}/appointments/all`)
            .then(response => response.json())
            .then(data => displayAppointments(data))
            .catch(error => console.error('Error fetching appointments:', error));
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchDoctors();
        fetchPatients();
        fetchAppointments();
    });
}


// *** Doctor Registration Form (doctor_registration_form.html) JavaScript ***
if (document.body.id === 'doctor-registration-page') {
    const doctorRegForm = document.getElementById('doctor-registration-form');
    if (doctorRegForm) {
        doctorRegForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const specialization = document.getElementById('specialization').value;
            const email = document.getElementById('email').value;

            const doctorData = {
                name: name,
                specialization: specialization,
                email: email
            };

            fetch(`${API_BASE_URL}/doctors/create`, { // API POST request to create doctor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicate sending JSON data
                },
                body: JSON.stringify(doctorData) // Convert doctorData to JSON string
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse response JSON (could be the created doctor object)
            })
            .then(createdDoctor => {
                console.log("Doctor created successfully:", createdDoctor);
                alert(`Doctor "${createdDoctor.name}" registered successfully!`); // Success message
                doctorRegForm.reset(); // Clear the form
            })
            .catch(error => {
                console.error('Error registering doctor:', error);
                alert("Failed to register doctor. Please check console for details."); // Error message
            });
        });
    }
}


// *** Doctor Dashboard (doctor_dashboard.html) JavaScript ***
if (document.body.id === 'doctor-dashboard-page') {
    function displayAppointmentsForDoctorDashboard(appointments) {
        const appointmentRequestsList = document.getElementById('appointment-requests-list');
        const scheduledAppointmentsList = document.getElementById('scheduled-appointments-list');

        appointmentRequestsList.innerHTML = '';
        scheduledAppointmentsList.innerHTML = '';

        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.insertCell().textContent = appointment.patientName;
            row.insertCell().textContent = appointment.appointmentDateTime;
            const statusCell = row.insertCell();
            statusCell.textContent = appointment.status;

            if (appointment.status === 'Pending') {
                const actionCell = row.insertCell();
                const confirmButton = document.createElement('button');
                confirmButton.textContent = 'Confirm';
                confirmButton.addEventListener('click', () => confirmAppointment(appointment.id));
                actionCell.appendChild(confirmButton);
                appointmentRequestsList.appendChild(row);
            } else if (appointment.status === 'Confirmed') {
                scheduledAppointmentsList.appendChild(row);
            }
        });
    }

    function confirmAppointment(appointmentId) {
        fetch(`${API_BASE_URL}/appointments/${appointmentId}/status?status=Confirmed`, {
            method: 'PUT'
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error updating appointment status:', response);
                alert('Failed to confirm appointment.');
                return;
            }
            // Reload all appointments to update both sections
            fetchAllAppointmentsForDoctorDashboard();
        })
        .catch(error => {
            console.error('Error confirming appointment:', error);
            alert('Failed to confirm appointment.');
        });
    }

    function fetchAllAppointmentsForDoctorDashboard() {
        fetch(`${API_BASE_URL}/appointments/all`)
            .then(response => response.json())
            .then(data => displayAppointmentsForDoctorDashboard(data))
            .catch(error => console.error('Error fetching all appointments:', error));
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchAllAppointmentsForDoctorDashboard();
    });
}


// *** Patient Dashboard (patient_dashboard.html) JavaScript ***
if (document.body.id === 'patient-dashboard-page') {
    function displayAppointmentsForPatientDashboard(appointments) {
        const appointmentsList = document.getElementById('patient-appointments-list');
        appointmentsList.innerHTML = '';

        appointments.forEach(appointment => {
            const row = appointmentsList.insertRow();
            row.insertCell().textContent = appointment.patientName;
            row.insertCell().textContent = appointment.doctorId;
            row.insertCell().textContent = appointment.appointmentDateTime;
            row.insertCell().textContent = appointment.status;
        });

        if (appointmentsList.rows.length === 0) {
            appointmentsList.insertRow().insertCell().textContent = "No appointments found.";
        }
    }

    function fetchAllAppointmentsForPatientDashboard() {
        fetch(`${API_BASE_URL}/appointments/all`)
            .then(response => response.json())
            .then(data => displayAppointmentsForPatientDashboard(data))
            .catch(error => console.error('Error fetching all appointments:', error));
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchAllAppointmentsForPatientDashboard();
    });
}

// *** Patient Appointment Form (patient_appointment_form.html) JavaScript ***
if (document.body.id === 'patient-appointment-form-page') {
    console.log("--- Patient Appointment Form JavaScript Block Entered ---");
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Patient Appointment Form page loaded. Now fetching doctors..."); // ADDED: Confirmation log

        const doctorSelect = document.getElementById('doctor'); // Assuming your select dropdown has the ID 'doctor'
        const appointmentForm = document.querySelector('#patient-appointment-form'); // Get the form element

        if (!doctorSelect) {
            console.error("Error: 'doctor' select element not found in patient_appointment_form.html"); // ADDED: Check if the select element exists
            return; // Stop further execution if the element is not found
        }

        fetch(`${API_BASE_URL}/doctors/all`) // Assuming your API endpoint to get all doctors is '/api/doctors/all'
            .then(response => {
                console.log("Response from /api/doctors/all:", response); // ADDED: Log the raw response
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(doctors => {
                console.log("Doctors data received:", doctors); // ADDED: Log the parsed JSON data

                if (doctors && Array.isArray(doctors) && doctors.length > 0) {
                    doctors.forEach(doctor => {
                        const option = document.createElement('option');
                        option.value = doctor.id; // Assuming your Doctor object has an 'id' field (adjust if different)
                        option.textContent = `${doctor.name} (${doctor.specialization})`;
                        doctorSelect.appendChild(option);
                    });
                } else {
                    console.log("No doctors found or invalid doctors data received."); // ADDED: Log if no doctors are available
                    const option = document.createElement('option');
                    option.textContent = 'No doctors available';
                    option.value = '';
                    doctorSelect.appendChild(option);
                    doctorSelect.disabled = true; // Disable the dropdown if no doctors
                }
            })
            .catch(error => {
                console.error('Error fetching doctors:', error); // ADDED: Log any errors during the fetch
                const option = document.createElement('option');
                option.textContent = 'Failed to load doctors';
                option.value = '';
                doctorSelect.appendChild(option);
                doctorSelect.disabled = true; // Disable the dropdown if loading fails
            });

        // *** Handling form submission to request appointment and send data to API ***
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
                 const patientName = document.getElementById("patientName").value;
                 const patientPhone = document.getElementById("patientPhone").value;
                 const patientEmail = document.getElementById("patientEmail").value;
                const doctorId = document.getElementById('doctor').value;
                const appointmentDateTime = document.getElementById('appointmentDateTime').value; // Assuming you have an input with this ID


                const appointmentData = {
                    patientName: patientName,
                    patientPhone: patientPhone,
                    patientEmail: patientEmail,
                    doctorId: doctorId,
                    appointmentDateTime: appointmentDateTime,
                    status: "Pending" // Initially it is Pending by default
                    // Add other relevant fields if you have them in your form
                };

                console.log("Appointment Data to be sent:", appointmentData); // Log the data being sent

                fetch(`${API_BASE_URL}/appointments/create`, { // Assuming your API endpoint for creating appointments is '/api/appointments/create'
                    method: 'POST', // Usually you use POST to create new resources
                    headers: {
                        'Content-Type': 'application/json' // Indicate you are sending JSON data
                    },
                    body: JSON.stringify(appointmentData) // Convert the JavaScript object to a JSON string
                })
                .then(response => {
                    console.log("Response from /api/appointments/create:", response); // Log the response
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); // Or response.text() if your backend doesn't return JSON
                })
                .then(data => {
                    console.log("Appointment created successfully:", data);
                    alert("Appointment created successfully!"); // You can replace this with a better UI notification
                    appointmentForm.reset(); // Clear the form
                    // Optionally, redirect the user or update the UI
                })
                .catch(error => {
                    console.error('Error creating appointment:', error);
                    alert("Failed to create appointment. Please try again."); // Inform the user about the error
                });
            });
        } else {
            console.error("Error: 'patient-appointment-form' element not found.");
        }
        console.log("Logic to fetch doctors and handle form submission for patient appointment form added."); // ADDED: Confirmation log
    });
}