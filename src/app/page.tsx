'use client';
import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showContactForm, setShowContactForm] = useState(false);
  
  const questions = [
    {
      question: 'What type of project are you considering?',
      options: [
        'Kitchen renovation',
        'Home addition',
        'Full house remodel',
        'Structural changes',
        'Just exploring options'
      ]
    },
    {
      question: 'What is your approximate timeline?',
      options: [
        'Within 3 months',
        '3-6 months',
        '6-12 months',
        'More than 12 months',
        'Not sure yet'
      ]
    }
  ];

  const getRecommendation = () => {
    const projectType = answers[questions[0].question];
    
    if (projectType === 'Structural changes' || projectType === 'Home addition') {
      return {
        needsArchitect: true,
        message: 'Based on your project type, working with an architect is strongly recommended. Structural changes and additions require careful planning, permits, and expertise to ensure safety and compliance with building codes.',
        cta: 'Schedule a Full Consultation'
      };
    } else if (projectType === 'Full house remodel') {
      return {
        needsArchitect: true,
        message: 'For a full house remodel, an architect can help optimize your space, manage the complexity of the project, and ensure all systems work together harmoniously.',
        cta: 'Schedule a Full Consultation'
      };
    } else if (projectType === 'Kitchen renovation') {
      return {
        needsArchitect: false,
        message: 'For a kitchen renovation, you might not need a full-time architect. However, a design consultation could be valuable for optimizing layout and ensuring the best use of space.',
        cta: 'Schedule a Design Review'
      };
    } else {
      return {
        needsArchitect: false,
        message: 'Consider scheduling a consultation with an architect to discuss your ideas and get professional guidance on your next steps.',
        cta: 'Schedule an Initial Consultation'
      };
    }
  };

  const ContactForm = () => (
    <div className="mt-6 p-4 border rounded">
      <h3 className="font-bold mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input type="tel" className="w-full p-2 border rounded" />
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={() => alert('Thank you! We will contact you shortly.')}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const handleOptionSelect = (option: string) => {
    setAnswers({
      ...answers,
      [questions[step - 1].question]: option
    });
    setStep(step + 1);
  };

  const showResults = () => {
    const recommendation = getRecommendation();
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Assessment Complete</h2>
        
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h3 className="font-bold mb-2">Your Responses:</h3>
          {Object.entries(answers).map(([question, answer]) => (
            <div key={question} className="mb-2">
              <p className="font-semibold">{question}</p>
              <p className="text-gray-600">{answer}</p>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded mb-6 ${recommendation.needsArchitect ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <h3 className="font-bold mb-2">Recommendation:</h3>
          <p className="mb-4">{recommendation.message}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowContactForm(true)}
          >
            {recommendation.cta}
          </button>
        </div>

        {showContactForm && <ContactForm />}

        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => {
            setStep(0);
            setShowContactForm(false);
            setAnswers({});
          }}
        >
          Start Over
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      {step === 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Architectural Project Assessment
          </h1>
          <p className="mb-4">
            Find out if your project needs an architect.
          </p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(1)}
          >
            Start Assessment
          </button>
        </>
      ) : step <= questions.length ? (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {questions[step - 1].question}
          </h2>
          <div className="space-y-2">
            {questions[step - 1].options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-100"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {step > 1 && (
            <button
              className="mt-4 text-blue-500"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        showResults()
      )}
    </main>
  );
}