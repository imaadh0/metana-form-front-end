import { useState } from "react";
import "./index.css";

const questions = [
  {
    type: "text",
    label: "What is your first name?",
    name: "firstName",
    placeholder: "Jane",
  },
  {
    type: "text",
    label: "What is your last name?",
    name: "lastName",
    placeholder: "Smith",
  },
  {
    type: "text",
    label: "What is your email address?",
    name: "email",
    placeholder: "name@example.com",
  },
  {
    type: "text",
    label: "Which country you are from?",
    name: "country",
    placeholder: "Enter your country",
  },
  {
    type: "text",
    label: "What is your phone number?",
    name: "phone",
    placeholder: "Enter your phone number",
  },
  {
    type: "checkbox",
    label: "What languages and frameworks are you familiar with?",
    name: "languages",
    options: [
      "Solidity",
      "Rust",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "C",
      "C++",
      "C#",
      "SQL",
      "Python",
      "Assembly Language",
      "Haskell",
      "R",
      ".Net",
      "Other",
    ],
  },
  {
    type: "radio",
    label: "How would you describe your current level of coding experience?",
    name: "experience",
    options: [
      "No experience (I have never programmed before.)",
      "Beginner (I have played with some introductory coding lessons and tutorials.)",
      "Intermediate (I have completed some coding classes or tutorials.)",
      "Advanced (I can build applications.)",
      "Professional (I am an experienced software engineer.)",
    ],
  },
  {
    type: "radio",
    label: "What is your current annual compensation? (Optional)",
    name: "compensation",
    options: [
      "<$30,000",
      "$30,000 - $50,000",
      "$50,000 - $80,000",
      "$80,000 - $120,000",
      "$120,000 - $250,000",
      "$250,000 or more",
    ],
  },
  {
    type: "radio",
    label: "Certifying Statement*",
    name: "certify",
    options: ["I accept", "I don’t accept"],
  },
  {
    type: "text",
    label: "LinkedIn URL (optional)",
    name: "linkedIn",
    placeholder: "Enter your LinkedIn URL",
  },
  {
    type: "message",
    label:
      "Thank you for applying! An admissions team member will contact you shortly.",
  },
];

function App() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      console.log("Form submitted", formData);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "text":
        return (
          <div key={question.name}>
            <label>{question.label}</label>
            <input
              type="text"
              placeholder={question.placeholder}
              value={formData[question.name] || ""}
              onChange={(e) => handleChange(question.name, e.target.value)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={question.name}>
            <label>{question.label}</label>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  name={option}
                  checked={formData[question.name]?.[option] || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleChange(question.name, {
                      ...formData[question.name],
                      [option]: checked,
                    });
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div key={question.name}>
            <label>{question.label}</label>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={question.name}
                  value={option}
                  checked={formData[question.name] === option}
                  onChange={(e) => handleChange(question.name, e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "message":
        return (
          <div key={question.name}>
            <p>{question.label}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {step === 0 ? (
        <div className="intro">
          <h1>Launch your Data Career in Weeks, not Years</h1>
          <p>What to expect:</p>
          <ul>
            <li>Short-answer questions & No cover letter</li>
            <li>Takes 4 mins on average</li>
          </ul>
          <button onClick={() => setStep(1)}>Start Your Journey</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {renderQuestion(questions[step - 1])}
          {step < questions.length && <button type="submit">OK</button>}
        </form>
      )}
    </div>
  );
}

export default App;
