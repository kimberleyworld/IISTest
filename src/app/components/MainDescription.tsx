'use client'; // Marking this as a client component

import { useState, useEffect } from 'react';

const HeadingSection = () => {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
      const response = await fetch('/api/wp-description');
      const data = await response.json();
      setDescription(data.description); // Assuming the response contains the heading
    };

    fetchDescription(); // Call the function to fetch the heading
  }, []); // Runs once on mount

  return (
    <section>
        <p>{description}</p>
    </section>
  );
};

export default HeadingSection;
