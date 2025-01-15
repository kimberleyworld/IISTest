import Link from 'next/link'; // Correct import for Link component

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, excerpt }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Use Link component to wrap the content you want to be clickable */}
      <Link href={`/articles/${id}`}>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-gray-600 text-sm mt-2" dangerouslySetInnerHTML={{ __html: excerpt }} />
          <div className="mt-4">
            {/* You can add any additional content here, like a "Read More" button if needed */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
