import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({});
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const phoneNumberInputRef = useRef(null);

  // Räknar ut det totala priset på köpet
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Om swish är klickat
  const handleSwishClick = (event) => {
    event.preventDefault();
    // Sätter payment method till swish
    setPaymentMethod("swish");
    // Tömmer input rutor för kreditkort
    setCreditCardError("");
    setCvvError("");
    setExpiryDateError("");
  };
  // Om kreditkort är klickat
  const handleCreditCardClick = (event) => {
    event.preventDefault();
    // Sätter payment method till kreditkort
    setPaymentMethod("creditCard");
    // Tömmer input fält för telefon nummer(swish)
    setPhoneNumberError("");
  };

  // Kollar ändringar i input fält for foromuläret
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validerar telefon nummret för swish betalning, TODO; får inte input fältet att bli tomt om nummret är skrivet fel.
    if (name === "phoneNumber" && paymentMethod === "swish") {
      const isValidPhoneNumber =
        /^(07)[0-9]{8}$/.test(value) && value.length === 10;
      if (!isValidPhoneNumber) {
        setFormData((prevData) => ({
          ...prevData,
          phoneNumber: value.replace(/[^\d]/g, "").slice(0, 10),
        }));
      }
    }
  };

  // Funktion för submit av formuläret, checkar av en massa innan formulär godkänns
  const handleSubmit = (event) => {
    event.preventDefault();

    // Olika errors beroende på vilken input ruta som lämnats blank
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.street) errors.street = "Street is required";
    if (!formData.houseNumber) errors.houseNumber = "House Number is required";

    // Kollar om betalmetoden är swish
    if (paymentMethod === "swish") {
      const phoneNumber = formData.phoneNumber;
      // Regex check, kollar om nummret börjar med 07(svenskt telefon-nummer) och har 10 siffror i sig, räknat med 07
      const isValidPhoneNumber =
        /^(07)[0-9]{8}$/.test(phoneNumber) && phoneNumber.length === 10;
      // Om telefon-nummer är ogiltligt, visa error meddelande
      if (!isValidPhoneNumber) {
        errors.phoneNumber = "Invalid Phone Number";
        phoneNumberInputRef.current.focus();
      }
      // Kolla om betalmetoden är kreditkort
    } else if (paymentMethod === "creditCard") {
      const creditCardNumber = formData.cardNumber;
      const cvv = formData.cvv;
      const expiryDate = formData.expiryDate;
      // Regex check på varje input, kortnummer måste ha 16 siffror
      const isCreditCardValid = /^[0-9]{16}$/.test(creditCardNumber);
      // CVV måste innehålla siffror och måste vara 3 nummer
      const isCvvValid = /^[0-9]{3}$/.test(cvv);
      // Expiry date måste vara i MM/YY format och endast innehålla siffror
      const isExpiryDateValid = /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate);
      // Om någon inte stämmer, sätt error till respektive input typ
      if (!isCreditCardValid) errors.cardNumber = "Invalid Credit Card Number";
      if (!isCvvValid) errors.cvv = "Invalid CVV";
      if (!isExpiryDateValid) errors.expiryDate = "Invalid Expiry Date";
    } else {
      // Är ingen betalmetod vald vid submit, visa error meddelande att betalmetod måste väljas
      errors.paymentMethod = "Payment method is required";
    }

    setFormErrors(errors);

    // Om inga error, kolla så att alla inputs har något i sig iallafall, sedan skicka formulär
    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        ...formData,
        paymentMethod: paymentMethod,
      };
      // Navigera vidare till confirmation fönsret, skickar med totalpris och formuläret för att kunna displaya lite info
      navigate("/confirmation", {
        state: {
          total: calculateTotalPrice(),
          formData: updatedFormData,
        },
      });
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          {formErrors.city && <p style={{ color: "red" }}>{formErrors.city}</p>}
        </div>
        <div>
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={handleChange}
          />
          {formErrors.street && (
            <p style={{ color: "red" }}>{formErrors.street}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            onChange={handleChange}
          />
          {formErrors.houseNumber && (
            <p style={{ color: "red" }}>{formErrors.houseNumber}</p>
          )}
        </div>
        <div>
          <button onClick={handleSwishClick}>Swish</button>
          <button onClick={handleCreditCardClick}>Credit Card</button>
        </div>
        {paymentMethod === "swish" && (
          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              ref={phoneNumberInputRef}
            />
            {formErrors.phoneNumber && (
              <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
            )}
          </div>
        )}
        {paymentMethod === "creditCard" && (
          <div>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              onChange={handleChange}
            />
            {formErrors.cardNumber && (
              <p style={{ color: "red" }}>{formErrors.cardNumber}</p>
            )}
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
            />
            {formErrors.cvv && <p style={{ color: "red" }}>{formErrors.cvv}</p>}
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              onChange={handleChange}
            />
            {formErrors.expiryDate && (
              <p style={{ color: "red" }}>{formErrors.expiryDate}</p>
            )}
          </div>
        )}
        {formErrors.paymentMethod && (
          <p style={{ color: "red" }}>{formErrors.paymentMethod}</p>
        )}
        <button type="submit">Submit</button>
      </form>
      <p>Total Price: ${calculateTotalPrice()}</p>
    </div>
  );
}

export default Payment;
