import React from 'react';

const PrivacyPolicy = () => {
 return (
  <div className="privacy-container">
    <h1 className="privacy-title">QueueFlow - Privacy Policy</h1>
    <p className="privacy-date">Last updated: 23 December 2025</p>

    <p className="privacy-text">
      QueueFlow ("we", "our", "us") respects your privacy and is committed
      to protecting the personal information of users.
    </p>

    <section>
      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Login Information:</strong>  
          We collect the user’s email address and password only for authentication
          and account access purposes. This information is securely handled and
          is not shared with any third party.
        </li>

        <li>
          <strong>Account Creation Information:</strong>
          <ul>
            <li>
              <ul>
                <li>First name</li>
                <li>Last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Password and confirmation password</li>
                <li>Business name</li>
                <li>Business address</li>
                <li>Business registration number</li>
                <li>Business phone number</li>
                <li>Location Details</li>
                <li>User Address</li>
              </ul>
            </li>
            <li>
            During account creation, customers provide personal details, while merchants provide additional business information required to operate their accounts.
            </li>
          </ul>
        </li>

        <li>
          <strong>Email Verification:</strong>  
          When an email address is provided during account creation, a verification
          code is sent to the registered email address. The user must enter this
          code to complete the account verification process.
        </li>

        <li>
          <strong>Device Information:</strong>  
          We may collect device-related information to improve app performance
          and enhance security.
        </li>
      </ul>
    </section>

    <section>
      <h2>2. How We Use Information</h2>
      <ul>
        <li>Send notifications or SMS alerts</li>
        <li>Improve app functionality and user experience</li>
        <li>Maintain security and prevent misuse</li>
      </ul>
    </section>

    <section>
      <h2>3. Data Sharing</h2>
      <p>
        We do not sell, trade, or rent users’ personal information to third parties.
We may share limited data with trusted third-party services, such as Firebase, only for essential app functionality including push notifications, analytics, and app performance monitoring.
Such services process data in accordance with their own privacy policies and applicable data protection laws. for more informetion here is the link to firebase privacy policy:<a href='https://firebase.google.com/support/privacy'>Click Here</a> 
      </p>
    </section>

    <section>
      <h2>4. App Permissions</h2>
      <ul>
        <li>Location</li>
        <li>Camera</li>
        <li>Notification</li>
      </ul>
    </section>

    <section>
      <h2>5. Data Security</h2>
      <p>
        We implement reasonable security measures to protect user data from
        unauthorized access, loss, or misuse.
      </p>
    </section>

    <section>
      <h2>6. User Rights</h2>
      <p>
        Users may request to update or delete their personal data by contacting us.
      </p>
    </section>

    <section>
      <h2>7. Children’s Privacy</h2>
      <p>
        QueueFlow does not knowingly collect personal information from children
        under the age of 13.
      </p>
    </section>

    <section>
      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        reflected on this page.
      </p>
    </section>

    <section>
      <h2>9. Contact Us</h2>
      <p>
        <strong>Email:</strong> queueflow08@gmail.com
      </p>
      <p>
        <strong>Phone:</strong> +91 8200956950
      </p>
      <p>
        <strong>Address:</strong> Diamond world, A-607, Mini Bazar, Varachha, Surat, Gujarat 395006
      </p>
    </section>
  </div>
);

};

export default PrivacyPolicy;
