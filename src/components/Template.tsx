import React from 'react';
import { BookOpen, Code2, Timer, Lightbulb } from 'lucide-react';

interface Problem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetCodeUrl: string;
}

interface TemplateProps {
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  problems: Problem[];
  children?: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({
  title,
  description,
  timeComplexity,
  spaceComplexity,
  advantages,
  disadvantages,
  applications,
  problems,
  children
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Algorithm Visualization Section */}
      <div className="mb-12">
        {children}
      </div>

      {/* Algorithm Information Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            {title} - Algorithm Information
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Complexity Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Complexity Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Time Complexity</h4>
                <p className="text-purple-600">{timeComplexity}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Space Complexity</h4>
                <p className="text-purple-600">{spaceComplexity}</p>
              </div>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pros and Cons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Advantages</h4>
                <ul className="list-disc list-inside space-y-1">
                  {advantages.map((advantage, index) => (
                    <li key={index} className="text-gray-600">{advantage}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Disadvantages</h4>
                <ul className="list-disc list-inside space-y-1">
                  {disadvantages.map((disadvantage, index) => (
                    <li key={index} className="text-gray-600">{disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Real-world Applications
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {applications.map((application, index) => (
                <li key={index} className="text-gray-600">{application}</li>
              ))}
            </ul>
          </div>

          {/* Practice Problems */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Practice Problems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems.map((problem, index) => (
                <a
                  key={index}
                  href={problem.leetCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">{problem.title}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;