import React from 'react';
import { Link } from 'react-router-dom';
import AiImage from '../images/th.jpg'
import DogImage from '../images/aavas.jpg'
import RepImage from '../images/rep.jpeg';

function Home() {
  const articles = [
    {
      id: 1,
      title: "Learn About AI",
      image: AiImage,
      content: "Learn the fundamentals of Artificial Intelligence.",
      link: "/ai",
    },
    {
      id: 2,
      title: "Dog Breed Information",
      image: DogImage,
      content: "Discover information about various dog breeds.",
      link: "/dog-breed",
    },
    {
      id: 3,
      title: "Send Report",
      image: RepImage,
      content: "Submit a report and help us improve.",
      link: "/report",
    },
  ];

  return (
    <div className="main">
    <div className="articles-list">
      {articles.map((article) => (
        <div key={article.id} className="article-card">
          {/* Make the image clickable */}
          <Link to={article.link}>
            <img src={article.image} alt={article.title} className="article-image" />
          </Link>
          <h2 className="article-title">{article.title}</h2>
          <p className="article-content">{article.content}</p>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Home;
