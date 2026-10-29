import { useState, useEffect } from 'react';
import { 
  IoCloseOutline, 
  IoCalendarOutline, 
  IoMailOutline, 
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline
} from 'react-icons/io5';
import { BsArrowRight, BsGem } from 'react-icons/bs';
import './ConsultationModal.css';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'Bespoke High Jewellery',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.consultationType) {
      newErrors.consultationType = 'Please select a consultation type.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      consultationType: 'Bespoke High Jewellery',
      preferredDate: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div 
      className="jea-consult-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div 
        className="jea-consult-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Close Button */}
        <button
          type="button"
          className="jea-consult-close-btn"
          onClick={onClose}
          aria-label="Close consultation modal"
        >
          <IoCloseOutline />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="jea-consult-header">
              <div className="jea-consult-eyebrow">
                <BsGem className="jea-consult-gem-icon" />
                <span>PRIVATE SALON & ATELIER</span>
              </div>
              <h2 id="consultation-modal-title" className="jea-consult-title">
                Book Atelier Consultation
              </h2>
              <p className="jea-consult-subtitle">
                Reserve an exclusive session with our master gemologists for bespoke creations, high jewellery viewings, or bridal parures.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="jea-consult-form" noValidate>
              
              {/* Row 1: Name and Email */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="consult-name" className="jea-form-label">
                    Full Name <span className="jea-required">*</span>
                  </label>
                  <div className="jea-input-wrapper">
                    <IoPersonOutline className="jea-input-icon" />
                    <input
                      type="text"
                      id="consult-name"
                      name="name"
                      className={`jea-form-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="e.g. Lady Katherine Sterling"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <div className="jea-error-msg">{errors.name}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="consult-email" className="jea-form-label">
                    Email Address <span className="jea-required">*</span>
                  </label>
                  <div className="jea-input-wrapper">
                    <IoMailOutline className="jea-input-icon" />
                    <input
                      type="email"
                      id="consult-email"
                      name="email"
                      className={`jea-form-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="e.g. katherine@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <div className="jea-error-msg">{errors.email}</div>}
                </div>
              </div>

              {/* Row 2: Consultation Type and Date */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="consult-type" className="jea-form-label">
                    Consultation Type <span className="jea-required">*</span>
                  </label>
                  <select
                    id="consult-type"
                    name="consultationType"
                    className="jea-form-select"
                    value={formData.consultationType}
                    onChange={handleChange}
                  >
                    <option value="Bespoke High Jewellery">Bespoke High Jewellery Parure</option>
                    <option value="Diamond Engagement Ring">Diamond Engagement & Bridal Ring</option>
                    <option value="Fine Diamond Necklace">Fine Diamond Collier & Necklaces</option>
                    <option value="Diamond Earrings & Bracelets">Earrings & Tennis Bracelets</option>
                    <option value="Private Salon Viewing">Private Salon Viewing (Place Vendôme)</option>
                    <option value="Virtual Video Concierge">Virtual Concierge Video Session</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="consult-date" className="jea-form-label">
                    Preferred Date <span className="jea-required">*</span>
                  </label>
                  <div className="jea-input-wrapper">
                    <IoCalendarOutline className="jea-input-icon" />
                    <input
                      type="date"
                      id="consult-date"
                      name="preferredDate"
                      min={minDate}
                      className={`jea-form-input ${errors.preferredDate ? 'is-invalid' : ''}`}
                      value={formData.preferredDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.preferredDate && <div className="jea-error-msg">{errors.preferredDate}</div>}
                </div>
              </div>

              {/* Row 3: Message / Special Requests */}
              <div className="mb-3">
                <label htmlFor="consult-message" className="jea-form-label">
                  Special Requests or Desired Gemstones <span className="jea-optional">(Optional)</span>
                </label>
                <textarea
                  id="consult-message"
                  name="message"
                  rows="3"
                  className="jea-form-textarea"
                  placeholder="Tell us about your style preference, carat interests, or timeline..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* Demo Mode Notice */}
              <div className="jea-consult-demo-notice">
                <IoInformationCircleOutline className="jea-demo-notice-icon" />
                <span>
                  <strong>Preview Mode:</strong> This consultation booking is an interactive demonstration. Form data is validated locally and not permanently saved to an external database.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="jea-consult-actions">
                <button
                  type="submit"
                  className="jea-btn-primary w-100 justify-content-center"
                >
                  <span>Submit Consultation Request</span>
                  <BsArrowRight />
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Submission Confirmation View */
          <div className="jea-consult-success text-center">
            <div className="jea-success-icon-wrapper">
              <IoCheckmarkCircleOutline className="jea-success-icon" />
            </div>

            <div className="jea-consult-eyebrow">
              <BsGem className="jea-consult-gem-icon" />
              <span>REQUEST RECEIVED</span>
            </div>

            <h2 className="jea-consult-title mt-2">
              Thank You, {submittedData.name}
            </h2>

            <p className="jea-success-message">
              We have received your request for a <strong>{submittedData.consultationType}</strong> consultation on <strong>{submittedData.preferredDate}</strong>.
            </p>

            <div className="jea-success-details-card">
              <div className="jea-success-detail-row">
                <span className="jea-detail-label">Client:</span>
                <span className="jea-detail-value">{submittedData.name}</span>
              </div>
              <div className="jea-success-detail-row">
                <span className="jea-detail-label">Email:</span>
                <span className="jea-detail-value">{submittedData.email}</span>
              </div>
              <div className="jea-success-detail-row">
                <span className="jea-detail-label">Type:</span>
                <span className="jea-detail-value">{submittedData.consultationType}</span>
              </div>
              <div className="jea-success-detail-row">
                <span className="jea-detail-label">Date:</span>
                <span className="jea-detail-value">{submittedData.preferredDate}</span>
              </div>
              {submittedData.message && (
                <div className="jea-success-detail-row">
                  <span className="jea-detail-label">Notes:</span>
                  <span className="jea-detail-value">{submittedData.message}</span>
                </div>
              )}
            </div>

            {/* Clear, honest demo disclaimer */}
            <div className="jea-consult-demo-notice mt-3 mb-4 text-start">
              <IoInformationCircleOutline className="jea-demo-notice-icon" />
              <span>
                <strong>Demonstration Confirmation:</strong> This website operates in presentation mode. No real appointment has been recorded or permanently booked on a production server.
              </span>
            </div>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="jea-btn-secondary"
                onClick={handleReset}
              >
                <span>Book Another Request</span>
              </button>
              <button
                type="button"
                className="jea-btn-primary"
                onClick={onClose}
              >
                <span>Return to Boutique</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
