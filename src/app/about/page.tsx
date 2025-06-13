const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-orange-600">About SCMS</h1>
                <p>
                    Welcome to <strong>SCMS (Society Complaint Management System)</strong> — a platform built to make
                    residential societies smarter and more responsive. We help residents file complaints efficiently,
                    which are then handled by maintenance managers and assigned to the appropriate workers.
                </p>
                <p>
                    From issues like <span className="font-medium">electricity faults</span>, <span className="font-medium">plumbing</span>,
                    <span className="font-medium"> cleaning</span>, <span className="font-medium">damage repairs</span>, or even <span className="font-medium">theft reports</span>,
                    everything is tracked and streamlined.
                </p>
                <p>
                    Verification of complaint resolution is done using <strong>QR code scans</strong> by workers at the resident’s location,
                    ensuring authenticity and closure.
                </p>
                <p>
                    SCMS is designed to empower both residents and staff with clarity, responsibility, and accountability.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;