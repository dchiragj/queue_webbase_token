import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:8008';
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${backendUrl}/api/auth/contact-us`,
                {
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim() || "User",
                    email: formData.email.trim(),
                    phoneNumber: formData.phoneNumber.trim(),
                     message: formData.message.trim(),
                }
            );

            if (res.data?.status === "ok") {
                toast.success("Your request has been submitted 🎉");

                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    message: ""
                });
            } else {
                toast.error(res.data?.message || "Something went wrong ❗");
            }
        } catch (err) {
            toast.error("Server error — please try again later 😔");
        }

        setLoading(false);
    };



    return (
        <div className="contact-container">
            <h2>Contact Us</h2>

            {msg && <p className="message">{msg}</p>}

            <form onSubmit={handleSubmit} className="contact-form">
                <ul>
                    <li>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </li>

                    <li>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </li>

                    <li>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </li>

                    <li>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <label>Message</label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </li>


                    <li>
                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default ContactUs;
