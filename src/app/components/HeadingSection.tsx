'use client'; // Marking this as a client component

import { useState, useEffect } from 'react';

const HeadingSection = () => {
  const [heading, setHeading] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeading = async () => {
      const response = await fetch('/api/wp-heading');
      const data = await response.json();
      setHeading(data.heading); // Assuming the response contains the heading
    };

    fetchHeading(); // Call the function to fetch the heading
  }, []); // Runs once on mount

  return (
    <section>
        <h1 className="font-bold">{heading}</h1>
    </section>
  );
};

export default HeadingSection;
